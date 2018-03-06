import { NavigationActions } from 'react-navigation'
import { AppNavigator } from 'native/AppNavigator'

const firstAction = AppNavigator.router.getActionForPathAndParams('Launch')
const initialNavState = AppNavigator.router.getStateForAction(firstAction)

export default (state = initialNavState, action) => {
  let nextState
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
  }

  return nextState || state
}
