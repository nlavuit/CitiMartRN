import React from 'react';
import { Text, View, TouchableOpacity } from '@core'
import { BaseComponent } from '@components'
import { connect, bindActionCreators } from '@store'
import { actions as navigatorActions } from '@duck/navigator'
import styles from './styles'

class Home extends BaseComponent {

  _backToNative = () => {
    this._onBackPress()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.highScoresTitle}>React Native Screen</Text>
        <TouchableOpacity onPress={this._backToNative}>
          <Text style={styles.scores}>Back To Native</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  navigatorActions: bindActionCreators(navigatorActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Home)