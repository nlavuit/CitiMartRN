import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native'
import PropTypes from './PropTypes'

export default class CheckBox extends Component {
  static propTypes = {
    ...(ViewPropTypes || View.PropTypes),
    leftText: PropTypes.string,
    leftTextView: PropTypes.element,
    rightText: PropTypes.string,
    leftTextStyle: PropTypes.object,
    rightTextView: PropTypes.element,
    rightTextStyle: PropTypes.object,
    checkedImage: PropTypes.element,
    unCheckedImage: PropTypes.element,
    onChange: PropTypes.func,
    isChecked: PropTypes.bool.isRequired,
    isIndeterminate: PropTypes.bool.isRequired,
    checkBoxColor: PropTypes.string,
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    isChecked: false,
    isIndeterminate: false,
    leftTextStyle: {},
    rightTextStyle: {},
  }

  _renderLeft() {
    if (this.props.leftTextView) return this.props.leftTextView
    if (!this.props.leftText) return null
    return (
      <Text style={[styles.leftText, this.props.leftTextStyle]}>
        {this.props.leftText}
      </Text>
    )
  }
  _renderRight() {
    if (this.props.rightTextView) return this.props.rightTextView
    if (!this.props.rightText) return null
    return (
      <Text style={[styles.rightText, this.props.rightTextStyle]}>
        {this.props.rightText}
      </Text>
    )
  }

  _renderImage() {
    if (this.props.isIndeterminate) {
      return this.props.indeterminateImage
        ? this.props.indeterminateImage
        : this.genCheckedImage()
    }
    if (this.props.isChecked) {
      return this.props.checkedImage
        ? this.props.checkedImage
        : this.genCheckedImage()
    } else {
      return this.props.unCheckedImage
        ? this.props.unCheckedImage
        : this.genCheckedImage()
    }
  }

  genCheckedImage() {
    var source
    if (this.props.isIndeterminate) {
      source = require('@resources/images/boc/ic-create-checked.png')
    } else {
      source = this.props.isChecked
        ? require('@resources/images/boc/ic-create-checked.png')
        : require('@resources/images/boc/ic-create-uncheck.png')
    }

    return (
      <Image source={source} style={{ tintColor: this.props.checkBoxColor }} />
    )
  }

  _onClick = () => {
    this.props = {
      ...this.props,
      isChecked: !this.props.isChecked,
    }
    if (this.props.onChange) {
      this.props.onChange(this.props.isChecked)
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={this.props.style}
        onPress={this._onClick}
        underlayColor="transparent"
        disabled={this.props.disabled}
      >
        <View style={styles.container}>
          {this._renderLeft()}
          {this._renderImage()}
          {this._renderRight()}
        </View>
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    flex: 1,
  },
  rightText: {
    flex: 1,
    marginLeft: 10,
  },
})
