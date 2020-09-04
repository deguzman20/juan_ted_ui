import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  first_row_container: {
    flexDirection: 'row',
    height: 70,
  },
  customer_request_txt: {
    paddingLeft: 30,
    paddingTop: 20
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: 0
  },
  chipWrapper: {
    flex: 1,
    height: 30,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    width: '90%',
    marginLeft: '5%',
    alignContent: 'center'    
  },
  empty_request_txt: {
    textAlign: 'center',
    color: 'black'
  },
  empty_request_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});