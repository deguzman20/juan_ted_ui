import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  reviewWrapper: {
    flex: 1,
    height: 30,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    width: '90%',
    height: '100%',
    marginLeft: '5%',
    alignContent: 'center'    
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: -8
  },
  ratingWrapper: {
    position: 'absolute', 
    top: 0
  },
  fullNameTxtOnList: {
    fontWeight: 'bold'
  }
});
