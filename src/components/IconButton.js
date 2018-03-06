import React from 'react'
import {
  Icon,
  PropTypes,
  StyleSheet,
  PureComponent,
  TouchableOpacity
} from '@core'
import theme from '@core/styles'

class IconButton extends PureComponent {

  static propTypes = {
    children: PropTypes.any,
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func
  }

  static defaultProps = {
    name: null,
    size: 24
  }

  render() {
    const { children, color, size, name, ...props } = this.props

    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.5}
        style={[rootStyles.button]}
      >
        {name ? (
          <Icon
            style={[rootStyles.icon, { fontSize: size, color }]}
            name={name}
          />
        ) : (
            children
          )}
      </TouchableOpacity>
    )
  }
}

const rootStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 36,
    minHeight: 36
  },
  icon: {
    color: theme.iconColor.active.backgroundLight
  }
})

export default IconButton
