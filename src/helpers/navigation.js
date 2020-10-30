import { useNetInfo } from "@react-native-community/netinfo";

export const _onNavigateToServiceTypePress = (navigation, id) => {
  const netInfo = useNetInfo()
  
  if(netInfo.isConnected){
    if(id === 1){
      navigation.navigate('BarberScreen', 
      { 
        service_type_id: id,
        tasker_id: ""
      })
    }
    else if(id === 2){
      navigation.navigate('HairSalonScreen', 
      { 
        service_type_id: id,
        tasker_id: ""
      })
    }
  } 
}