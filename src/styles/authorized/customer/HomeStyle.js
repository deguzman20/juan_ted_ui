import { StyleSheet } from 'react-native';
import { ITEM_WIDTH } from './../../../actions/types';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  hi_txt: {
    left: 20, 
    marginTop: 70,
    color: 'white'
  },
  icon_profile: {
    left: '100%', 
    marginTop: 75,
    color: 'white'
  },
  wallet_wrapper: {
    flexDirection: 'row',
    flex: 0.2, 
    backgroundColor: '#009C3C', 
    width: '100%'
  },
  greeting_wrapper: {
    flexDirection: 'row', 
    width: '50%'
  },
  profile_wrapper: {
    flexDirection: 'row', 
    width: '50%'
  },
  wallet_ammount_txt: {
    marginTop: 40,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'verdana'
  },
  txt_services_txt: {
  left: 20, 
    marginTop: 20
  },
  image: {
    width: (ITEM_WIDTH / 2) - 60,
    height: 100
  },
  service_wrapper: {
    flex: 1, 
    width: '100%'
  },
  flatlist_style: {
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 20
  },
  out_of_location_service_txt: {
    textAlign: 'center',
    color: 'black'
  },
  out_of_location_service_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})