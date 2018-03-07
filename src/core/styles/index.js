import { Platform, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const widthDesign = 375
const heightDesign = 667
const ratioWidth = width / widthDesign
const ratioHeight = height / heightDesign

export default {
  screen: {
    width,
    height,
    ratioWidth,
    ratioHeight,
  },
  iconColor: {
    active: {
      backgroundLight: '#0000008A',
    }
  },
  fontSize: {
    body: 14,
  },
  fontFamily: {
    bold: 'OpenSans-Bold',
    light: 'OpenSans-Light',
    //medium: 'OpenSans',
    regular: 'OpenSans-Regular',
  },
  palette: {
    background: {
      primary: '#143ac3',
      light: '#fff',
      transparent: 'transparent'
    },
    text: {
      primary: '#fff',
      light: '#000000DE',
    }
  },
  statusBar: {
    minHeight: Platform.OS === 'ios' ? 64 : 56,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
    statusBarColor:
      Platform.OS === 'android' && Platform.Version < 23 ? 'black' : 'white',
    iosStatusbar: 'light-content',
  },
}
