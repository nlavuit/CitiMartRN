import React from 'react'
import { PropTypes, StyleSheet, Text as RNText, PureComponent } from '@core'
import theme from '@core/styles'

class Text extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    light: PropTypes.bool,
    medium: PropTypes.bool,
    bold: PropTypes.bool,
  }

  static defaultProps = {
    light: false,
    medium: false,
    bold: false,
  }

  render() {
    const { children, light, medium, bold, style, ...props } = this.props

    return (
      <RNText
        style={[
          rootStyles.text,
          light && rootStyles.light,
          medium && rootStyles.medium,
          bold && rootStyles.bold,
          style,
        ]}
        {...props}
      >
        {children}
      </RNText>
    )
  }
}

const rootStyles = StyleSheet.create({
  text: {
    fontSize: theme.fontSize.body,
    fontFamily: theme.fontFamily.regular,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  light: {
    //fontFamily: theme.fontFamily.light,
  },
  medium: {
    fontFamily: theme.fontFamily.medium,
  },
  bold: {
    fontFamily: theme.fontFamily.bold,
  },
})

export default Text
