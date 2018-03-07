import React from 'react'
import { PropTypes, PureComponent, Utils, StatusBar, Platform, BackHandler } from '@core'
import {
  addNavigationHelpers,
  NavigationActions,
  StackNavigator,
} from 'react-navigation'
//import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import { Injector } from '@middlewares'
import {
  Launch,
  Landing,
  SignUp,
  Login,
  Home
} from '@containers'
import { connect, bindActionCreators } from '@store'
import { actions as navigatorActions } from '@duck/navigator'
//import Styles from 'tkn-core/styles'
//import { strings } from '@resources'

const ROUTERS = {
  Launch: {
    screen: Launch,
  },
  Landing: {
    screen: Landing,
  },
  SignUp: {
    screen: SignUp
  },
  Login: {
    screen: Login
  },
  Home: {
    screen: Home,
  },
}

const CARD_STYLE = {
  backgroundColor: 'transparent',
}

// const transitionConfig = () => ({
//   screenInterpolator: sceneProps => {
//     // Disable the transition animation when resetting to the landing screen.
//     if (
//       sceneProps.index === 0 &&
//       sceneProps.scene.route.routeName !== 'Home' &&
//       sceneProps.scenes.length > 2
//     ) {
//       return null
//     }

//     if (sceneProps) {
//       if (
//         sceneProps.scene.route.params &&
//         sceneProps.scene.route.params.isModal
//       ) {
//         return CardStackStyleInterpolator.forVertical(sceneProps)
//       }
//     }

//     // Otherwise, use the usual horizontal animation.
//     return CardStackStyleInterpolator.forHorizontal(sceneProps)
//   },
// })

const Stack = StackNavigator(ROUTERS, {
  initialRouteName: 'Launch',
  cardStyle: CARD_STYLE,
  headerMode: 'none'
})

class ScreenComponent extends PureComponent {
  state = {
    navigation: Stack.router.getStateForAction({
      type: NavigationActions.INIT,
    })
  }

  //strings = strings.resolve([this.props.__locale__])

  // componentWillUpdate() {
  //   //this.strings = strings.resolve([this.props.__locale__])
  // }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.locale != this.props.locale) {
  //     for (var i = 0; i < this.props.children.length; i++) {
  //       var child = this.props.children[i]
  //       child.forceUpdate()
  //     }
  //   }
  // }

  //componentWillMount() {
  // if (Platform.OS === 'android') {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     const { goBack, state } = this.refs.navigator.props.navigation
  //     const route = state.routes[state.routes.length - 1]
  //     const routeName = route.routeName
  //     const arrScreen = []
  //     if (arrScreen.indexOf(routeName) === -1 ||
  //       (arrScreen.indexOf(routeName) > -1 && route.params && route.params.hideBackButton === false)
  //     )
  //       goBack()
  //     return true
  //   })
  // }
  //}

  // componentWillUnmount() {
  //   //if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress')
  // }

  componentDidMount() {
    Injector.inject({ screenNavigator: this.refs.navigator.props.navigation })
  }

  componentDidUpdate() {
    Injector.inject({ screenNavigator: this.refs.navigator.props.navigation })
  }

  render() {
    //CARD_STYLE.backgroundColor = Styles.palette.background
    return (
      <Stack
        ref="navigator"
        navigation={addNavigationHelpers({
          dispatch: this._dispatch,
          state: this.state.navigation,
          addListener: () => { }
        })}
      />
    )
  }

  _dispatch = action => {
    const { navigation } = this.state
    const latestRoute = navigation.routes[navigation.index]
    if (action.type === NavigationActions.NAVIGATE) {
      if (action.routeName === latestRoute.routeName) {
        if (!Utils.deepEqual(action.params, latestRoute.params)) {
          navigation.index -= 1
          navigation.routes.splice(-1)
        } else {
          return
        }
      }
    }
    const nextNavigation = Stack.router.getStateForAction(action, navigation)
    this._verifyNavigationState(nextNavigation, this.props.isAuthenticated)
  }

  _setupStatusBar = routeName => {
    switch (routeName) {
      case 'Landing':
      case 'SignUp':
      case 'Login':
        StatusBar.setBarStyle('light-content')
        break
      default:
        StatusBar.setBarStyle('dark-content')
        break
    }
  }

  _verifyNavigationState = (
    navigation = this.state.navigation,
    isAuthenticated
  ) => {
    let latestRouteName = navigation.routes[navigation.index].routeName
    this._setupStatusBar(latestRouteName)
    if (
      !isAuthenticated &&
      ROUTERS[latestRouteName].requireAuthentication !== false
    ) {
      this.setState({
        navigation: Stack.router.getStateForAction({
          type: NavigationActions.NAVIGATE,
          routeName: 'Launch',
        }),
      })
    } else {
      this.setState({ navigation })
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: true,//state.session && state.session.isAuthenticated,
    //locale: null//state.setting && state.setting.locale,
  }
}

const mapDispatchToProps = dispatch => ({
  navigatorActions: bindActionCreators(navigatorActions, dispatch),
  dispatch
  // sessionActions: bindActionCreators(
  //   {
  //     checkAuthenticate: sessionActions.checkAuthenticate,
  //   },
  //   dispatch
  // ),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScreenComponent)
