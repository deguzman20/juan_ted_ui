import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    position: "absolute",
    top: -70,
    left: 0,
    height: 641,
    width: '100%'
  },
  placeholder: {
    top: 98,
    left: 42,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 54,
    width: 291
  },
  mapViewStack: {
    width: '100%',
    height: '90%',
    top:60,
  },
  rect: {
    width: '100%',
    height: 171,
    backgroundColor: "white"
  },
  totalCost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginTop: 43,
    marginLeft: 42
  },
  cost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20,
    marginLeft: '65%',
    marginTop: -30,
  },
  next_button_background_color: {
    backgroundColor: '#009C3C',
    width: '92%',
    left: '20%',
    height: 40,
    marginTop: 25,
    color:'white',
    paddingLeft:10,
    paddingRight:10
  },
  amount_wrapper: {
    marginLeft: '5%',
    width: '45%',
    alignItems: 'flex-start'
  },
  amount_value_wrapper: {
    marginLeft: '5%',
    width: '40%',
    alignItems: 'flex-end'
  },
  total_amount_txt: {
    marginTop: 10,
    fontSize: 25
  },
  total_amount_value_txt: {
    marginTop: 10,
    fontSize: 25
  },
  divider: {
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%'
  }
});