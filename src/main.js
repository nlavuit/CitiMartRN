import React from 'react'
import { AppRegistry, PureComponent } from '@core'
import Store from '@store'
import { Screen as ScreenNavigator } from '@navigators'
//import { ActionSheetProvider } from '@components/ActionSheet'
//import codePush from "react-native-code-push"

class CitiMartRN extends PureComponent {
  render() {
    return (
      <Store>
        <ScreenNavigator />
      </Store>
    )
  }
}

// let codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//   installMode: codePush.InstallMode.ON_NEXT_RESUME
// }
// TKNReactNative = codePush(codePushOptions)(TKNReactNative)

// ========================================================
// Registtry Setup
// ========================================================
AppRegistry.registerComponent('CitiMartRN', () => CitiMartRN)
