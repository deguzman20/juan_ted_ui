import { StyleSheet } from 'react-native';
import { ITEM_WIDTH } from '../../../../actions/types';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  serviceWrapper: {
    position: 'absolute', 
    top: -10
  },
  serviceTypeWrapper: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  priceWrapper: {
    position: 'relative',
    top: 10
  },
  rect: {
    top: 0,
    left: 0,
    width: '100%',
    height: 181,
    position: "absolute",
    alignItems: 'stretch',
    backgroundColor: "#E6E6E6"
  },
  customerImage: {
    top: 90,
    left: '2%',
    position: "absolute"
  },
  reviewCustomerImage: {
    top: 20,
    left: '27%',
    position: "absolute"
  },
  fullNameTxt: {
    top: 198,
    left: '20%',
    position: "absolute",
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20
  },
  rectStack: {
    top: 0,
    left: 0,
    width: '210%',
    height: 281,
    position: "absolute"
  },
  rectStackStack: {
    width: 428,
    height: 281
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: -8
  },
  doneTotalCostWrapper: {
    width: '100%',
    height: 100,
    backgroundColor: "white",
    position: 'relative',
  },
  unDoneTotalCostWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: "white",
    position: 'relative'
  },
  totalCost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginLeft: 42,
    position: 'absolute',
    marginTop: "2%"
  },
  cost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginLeft: '65%',
    position: 'absolute',
    marginTop: '2%'
  },
  mapView: {
    position: "absolute",
    top: -70,
    left: 0,
    height: 641,
    width: '100%'
  },
  mapViewStack: {
    width: '100%',
    height: 400,
    position: 'relative',
    top:'15%'
  },
  buttonContainer: {
    width: ITEM_WIDTH,
    paddingLeft: '4%',
    paddingRight: '4s%',
    paddingTop: '1%'
  },
  back: {
    fontFamily: "verdana",
    color: "#121212",
    marginTop: 65,
    marginLeft: 35
  },
  reviewWrapper: {
    width: ITEM_WIDTH - 70, 
    flex: 0.5
  },
  reviewDivider: {
    marginTop: 10
  },
  reviewTxtWrapper: {
    flex: 0.2, 
    alignItems: 'center'
  },
  reviewImageWrapper: {
    flex: 1, 
    alignItems: 'center'
  },
  divider: {
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%'
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
  }
});
