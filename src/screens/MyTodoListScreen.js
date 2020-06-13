import React, { memo } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';

const MyTodoListScreen = ({ navigation, todos }) => {
  const obj = Object.values(todos);
  if(todos.length >= 2){

  }
  else {
    return(
      <Card title={`${obj[0]['todoDescription']}`}>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          color="white"
          title={'Book '+ obj[0]['service']['name']} />
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, top: 5}}
          color="white"
          backgroundColor="#f13a59"
          title='Remove'
          onPress={() => console.log(obj[0]['id'])} />
      </Card>
    )
  }

}

const mapStateToProps = ( { customerReducer } ) => {
  return {
    todos: customerReducer.todos
  }
}

export default memo(connect(mapStateToProps, null)(MyTodoListScreen));