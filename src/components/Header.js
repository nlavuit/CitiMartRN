import React from 'react'
import {
  Image,
  PropTypes,
  StatusBar,
  StyleSheet,
  PureComponent,
  TouchableOpacity,
  View,
  Platform,
} from '@core'

import IconButton from './IconButton'
import Text from './Text'
import theme from '@core/styles'

const ImageButton = ({ onPress, style, iconColor, source }) => (
  <TouchableOpacity onPress={onPress} style={styles.imageContainer}>
    <Image
      source={source}
      style={[style, { tintColor: iconColor }]}
      resizeMode="center"
    />
  </TouchableOpacity>
)

const BackButton = ({ onPress, style, iconColor }) => (
  <ImageButton
    onPress={onPress}
    style={[style, { marginLeft: -8 }]}
    iconColor={iconColor}
    source={require('@resources/images/icons/ic-back.png')}
  />
)

const CloseButton = ({ onPress, style, iconColor }) => (
  <ImageButton
    onPress={onPress}
    style={[style, { marginLeft: -4 }]}
    iconColor={iconColor}
    source={require('@resources/images/icons/ic_close.png')}
  />
)

// const MenuButton = ({ onPress, style, iconColor }) => (
//   <ImageButton
//     onPress={onPress}
//     style={style}
//     iconColor={iconColor}
//     source={require('@resources/images/icons/menu.png')}
//   />
// )

const ImageIcon = ({ onPress, color, iconName }) => {
  return (
    <IconButton onPress={onPress}>
      <Icon size={32} color={color} name={iconName} />
    </IconButton>
  )
}

const LeftHeaderButton = ({
  theme,
  style,
  iconName,
  iconColor,
  light,
  onPress,
}) => {
  switch (iconName) {
    case 'back':
      return (
        <BackButton onPress={onPress} style={style} iconColor={iconColor} />
      )
    case 'close':
      return (
        <CloseButton onPress={onPress} style={style} iconColor={iconColor} />
      )
    // case 'menu':
    //   return (
    //     <MenuButton onPress={onPress} style={style} iconColor={iconColor} />
    //   )
    default: {
      // const color = light
      //   ? theme.textColor.primary.backgroundLight
      //   : theme.textColor.primary.primary
      // return <IconButton onPress={onPress} color={color} iconName={iconName} />
      return null
    }
  }
}

class Header extends PureComponent {
  static propTypes = {
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
    light: PropTypes.bool,
    transparent: PropTypes.bool,
    left: PropTypes.node,
    right: PropTypes.node,
    title: PropTypes.string,
    onNavigationPress: PropTypes.func,
  }

  static defaultProps = {
    iconColor: '#ffffff',
    iconName: '',
    light: false,
    transparent: false,
    title: '',
    left: null,
    right: null,
    body: null,
  }

  render() {
    const {
      light,
      left,
      right,
      body,
      title,
      transparent,
      iconName,
      iconColor,
      onNavigationPress,
    } = this.props

    // <StatusBar
    //       backgroundColor={theme.statusBar.statusBarColor}
    //       barStyle={light ? 'dark-content' : 'light-content'}
    //     />

    return (
      <View>

        <View
          style={[
            styles.header,
            light && styles.headerLight,
            transparent && styles.headerTransparent,
          ]}
        >
          <View style={styles.left}>
            {left ? (
              left
            ) : (
                <LeftHeaderButton
                  theme={theme}
                  style={styles.image}
                  iconName={iconName}
                  iconColor={iconColor}
                  light={light}
                  onPress={onNavigationPress}
                />
              )}
          </View>
          {body ? (
            body
          ) : (
              <View style={styles.body}>
                <Text
                  bold
                  style={[
                    styles.title,
                    (light || transparent) && styles.titleLight,
                  ]}
                >
                  {title}
                </Text>
              </View>
            )}
          <View style={styles.right}>{right}</View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: theme.palette.background.primary,
    height: theme.statusBar.minHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: theme.statusBar.paddingHorizontal,
    paddingTop: theme.statusBar.paddingTop,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    elevation: 1
  },
  headerLight: {
    backgroundColor: theme.palette.background.light,
  },
  headerTransparent: {
    backgroundColor: theme.palette.background.transparent,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageContainer: { width: 40, height: 40, justifyContent: 'center' },
  image: { width: 24, height: 24 },
  left: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  right: {
    minWidth: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    color: theme.palette.text.primary,
    fontSize: 32,
  },
  iconLight: {
    color: theme.palette.text.light,
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 20,
  },
  titleLight: {
    color: theme.palette.text.light,
  },
})

export default Header
