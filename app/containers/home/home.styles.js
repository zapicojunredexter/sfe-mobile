import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/color.theme';

const scaledWidth = Dimensions.get('window').width / 4;
const scaledMargin = Dimensions.get('window').width / 32;

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'row',
  },
  dateContainer: {
    padding: 6,
    flex: 1,
    height: 25,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'row',
  },
  imageSidebarBorder: {
    borderBottomWidth: 0.25,
    borderTopWidth: null,
    borderRightWidth: null,
    borderLeftWidth: 0.25,
  },
  imageSidebarButtonBorder: {
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  sidebarPosition: {
    right: 0,
    position: 'absolute',
  },
  dateText: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: '700',
  },
  imageMargin: {
    marginTop: scaledMargin,
    marginLeft: scaledMargin,
    marginBottom: scaledMargin / 2,
  },
  imageContainer: {
    borderWidth: 0.75,
    flex: 1,
    borderColor: colors.text,
    width: scaledWidth,
    height: scaledWidth * 1.5,
  },
  resizeSideBar: {
    height: '91.75 %',
    width: '70%',
    marginTop: '7.5%',
    borderRightWidth: 0.5,
  },
  cameraButtonPosition: {
    right: '0%',
  },
  noItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoListBodyStyle: {
    flex: 1,
  },
});

export default style;
