import { StyleSheet } from '@core'
import theme from '@core/styles'

const { width, height, ratioWidth, ratioHeight } = theme.screen

const widthLogo = 183 * ratioWidth
const heightLogo = widthLogo * 121 / 183
const marginTopLogo = 180 * ratioHeight

const marginBottomLine = 103 * ratioHeight

const rootStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    width: widthLogo,
    height: heightLogo,
    marginTop: marginTopLogo
  },
  line: {
    marginBottom: marginBottomLine
  }
})

export default rootStyles
