import { memo } from 'react';
// import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { CONVERSATION_LIST } from '../../queries';
// import ConversationItem from './ConversationItem';


const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }];


const ConversationList = ({ user_id }) => {
  console.log(user_id)
  // const { error, data, loading } = useQuery(CONVERSATION_LIST,{
  //   variables: {
  //     user_id: user_id,
  //     is_customer: true
  //   }, 
  //   pollInterval: 500,
  //   requestPolicy: 'cache-and-network',
  //   requestPolicy: 'network-only'
  // });
  
  // console.log("========")
  // console.log("sample ito")

  // if(error){
  //   console.log("error")
  // }

  // console.log("sample")
  return(
    <View>{
      list.map((l, i) =>  console.log(l))
    }
   </View>
  )
}
export default memo(ConversationList);