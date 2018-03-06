import React from 'react'
import { connect, bindActionCreators } from '@store'
import { actions as navigatorActions } from '@duck/navigator'
import { BaseComponent } from '@components'
import { View, Image } from '@core'
// import { sessionActions } from '@duck/session'
// import { settingActions } from '@duck/settings'
import styles from './styles'
// import moment from 'moment'
// import 'moment/locale/vi'
// import 'moment/locale/en-gb'

class Launch extends BaseComponent {
  componentDidMount() {
    //this.props.sessionActions.checkAuthenticate()
    // let that = this
    // setTimeout(() => {
    //   this.props.navigatorActions.toLanding()
    // }, 2000)
  }
  // componentWillReceiveProps(newProps) {
  //   if (
  //     newProps.rehydrationComplete &&
  //     this.props.rehydrationComplete === undefined
  //   ) {
  //     moment.locale(this.props.__locale__ === 'vi' ? 'vi' : 'en-gb')
  //     this.props.settingActions.getAppSetting()
  //     const that = this
  //     setTimeout(() => {
  //       that.props.sessionActions.checkAuthenticate()
  //     }, 1000)
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('@resources/images/logo.png')}
        />
        <Image
          style={styles.line}
          source={require('@resources/images/line.png')}
        />
      </View>
    )
  }
}

// const mapStateToProps = ({ session, rehyrate }) => ({
//   isLoading: session && session.isLoading,
//   rehydrationComplete: rehyrate.rehydrationComplete,
// })

const mapDispatchToProps = dispatch => ({
  navigatorActions: bindActionCreators(navigatorActions, dispatch),
  // sessionActions: bindActionCreators(
  //   {
  //     checkAuthenticate: sessionActions.checkAuthenticate,
  //   },
  //   dispatch
  // ),
  // settingActions: bindActionCreators(
  //   {
  //     getAppSetting: settingActions.getAppSetting,
  //   },
  //   dispatch
  // ),
})

export default connect(null, mapDispatchToProps)(Launch)
