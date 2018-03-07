import { StyleSheet } from '@core'
import theme from '@core/styles'
const { width, height, ratioWidth, ratioHeight } = theme.screen

const widthButton = 238 * ratioWidth
const heightButton = 49 * ratioHeight

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
    alignItems: 'center'
  },
  background: {
    width,
    height: width * 333 / 375
  },
  layer: {
    width: 247 * ratioWidth,
    height: 126 * ratioHeight,
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  viewForm: {
    position: 'absolute',
    width,
    height,
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  signup: {
    width: widthButton,
    height: heightButton,
    borderRadius: heightButton / 2,
    borderColor: '#58AB3F',
    borderWidth: 1,
    marginTop: 475 * ratioHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSignup: {
    fontSize: 15,
    color: '#8BCC3F',
    textAlign: 'center'
  },
  signinFB: {
    width: widthButton,
    height: heightButton,
    borderRadius: heightButton / 2,
    backgroundColor: '#58AB3F',
    marginTop: 20 * ratioHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSigninFB: {
    fontSize: 13,
    color: '#EFEFEF',
    textAlign: 'center'
  },
  viewTextBottom: {
    flexDirection: 'row',
    marginTop: 10 * ratioHeight
  },
  textAccount: {
    fontSize: 13,
    color: '#B0B0B0'
  },
  textLogin: {
    fontSize: 13,
    color: '#99C49B',
    marginLeft: 3
  }
})

export default rootStyles
