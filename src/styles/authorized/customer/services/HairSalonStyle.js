import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300
  },
  containerDetails: {
    flex: 3,
    height: 150,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerRows: {
    flexDirection: 'row',
    height: 150,
    justifyContent: 'space-between',
  },
  imageServiceItem: {
    flex: 2,
    alignSelf: 'baseline',
    width: 150, 
    height: 150,
  },
  quantityButton: {
    width:50,
  },
  quantityInput: {
    height: 35,
    width: 40, 
    textAlign:'center',
    alignItems: 'flex-end', 
    borderColor: 'gray', 
    borderWidth: 1
  },
  serviceItemName: {
    fontWeight: 'bold',
    fontSize: 17
  },
  serviceItemPrice: {
    fontWeight: 'bold',
    fontSize: 14
  },
  viewDetails: {
    top: -10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4a71e3'
  },
  chevron: {
    position: 'absolute',
    left: '60%',
    top: 50
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
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
    fontSize: 25,
    marginLeft: '60%',
    marginTop: -30,
  },
  next_button_background_color: {
    backgroundColor: '#009C3C',
    width: '100%',
    height: 41,
    marginTop: 45,
    color:'white',
    paddingLeft: 10,
    paddingRight: 10,
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