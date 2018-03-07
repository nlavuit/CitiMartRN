import { NavigationActions } from 'react-navigation'

const navigate = (screenNavigator, routeName, params) => {
  screenNavigator.navigate(routeName, params)
}

export const goBack = () => (dispatch, { screenNavigator }) => {
  screenNavigator.dispatch(NavigationActions.back())
}

export const toLanding = () => (dispatch, { screenNavigator }) => {
  navigate(screenNavigator, 'Landing')
}

export const toSignUp = () => (dispatch, { screenNavigator }) => {
  navigate(screenNavigator, 'SignUp')
}

export const toLogin = () => (dispatch, { screenNavigator }) => {
  navigate(screenNavigator, 'Login')
}

const resetTo = (screenNavigator, route) => {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: route })],
  })
  screenNavigator.dispatch(actionToDispatch)
}

// export const backToLanding = () => (dispatch, { screenNavigator }) => {
//   const routes = screenNavigator.state.routes
//   for (var i = 0; i < routes.length - 1; i++) {
//     if (routes[i].routeName == 'Landing') {
//       screenNavigator.dispatch(
//         NavigationActions.back({ key: routes[i + 1].key })
//       )
//       break
//     }
//   }
// }

// export const toUserSetting = () => (dispatch, { screenNavigator }) => {
//   navigate(screenNavigator, 'UserSetting')
// }

