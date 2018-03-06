import { PureComponent } from '@core'
import { actions as navigatorActions } from '@duck/navigator'
import { bindActionCreators, connect } from '@store'

class BaseComponent extends PureComponent {

  _onBackPress = () => {
    this.props.navigatorActions.goBack()
    return true
  }
}

export default BaseComponent
