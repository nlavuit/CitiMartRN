import React from 'react'
import { connect, bindActionCreators } from '@store'
import { actions as navigatorActions } from '@duck/navigator'
import { BaseComponent } from '@components'
import { View, Image, TouchableOpacity, Text } from '@core'
//import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'


class Landing extends BaseComponent {

  _signUpPress = () => {
    this.props.navigatorActions.toSignUp()
  }

  _logInPress = () => {
    this.props.navigatorActions.toLogin()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={require('@resources/images/background/landing.png')}
        />
        <Image
          style={styles.layer}
          source={require('@resources/images/background/opacityLayer.png')}
        />
        <View style={styles.viewButton}>
          <TouchableOpacity onPress={this._signUpPress} style={styles.signup}>
            <Text bold style={styles.textSignup}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signinFB}>
            <Text style={styles.textSigninFB}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._logInPress} style={styles.viewTextBottom}>
            <Text style={styles.textAccount}>Already have an account?</Text>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  navigatorActions: bindActionCreators(navigatorActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Landing)
