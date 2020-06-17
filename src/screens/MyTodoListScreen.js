import React, { memo, useState } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_TODO } from '../queries';
import { addTodo, deleteTodo } from '../actions';
import { StyleSheet, ScrollView } from 'react-native';
import { todoDescriptionValidator } from '../core/utils';
import { Card, Icon, Text, Button as TodoItemButton } from 'react-native-elements';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const MyTodoListScreen = ({ todos, customer_id, addTodo, deleteTodo }) => {
  const obj = Object.values(todos);
  const [createTodo] = useMutation(CREATE_TODO);
  const [todo_description, setTodoDescription] = useState({ value: '', error: '' });

  // if(todos.length === 0){
  //   return (
  //     <Text>Empty</Text>
  //   )
  // }

  const _onAddTodoPressed = () => {
    const todoDescriptionError = todoDescriptionValidator(todo_description.value);

    if (todoDescriptionError) {
      setTodoDescription({ ...todo_description, error: todoDescriptionError });
      return;
    }
    
    createTodo({ variables: { id: parseInt(customer_id), todo_description: todo_description.value} }).then((data) =>{
      addTodo(data)
    })
  };

  return(
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          label="Enter todo description"
          value={todo_description.value}
          onChangeText={text => setTodoDescription({ value: text, error: '' })}
          error={!!todo_description.error}
          errorText={todo_description.error}
          autoCapitalize="none"
          style={styles.todo_description_text}
        />


        <Button mode="contained" style={styles.add_todo_button} onPress={() => _onAddTodoPressed()}>
          Add todo
        </Button>
        {obj.map(todo => (
          <Card title={`${todo['todoDescription']}`} key={Math.random((1000))}>
            <TodoItemButton
              icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              color="white"
              title={'Book'}
              // todo['service']['name'] 
              onPress={() => _onAddTodoPressed()}
            />
            <TodoItemButton
              icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, top: 5}}
              color="white"
              backgroundColor="#f13a59"
              title='Remove'
              onPress={() => deleteTodo(todo['id'])} 
            />
          </Card>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  todo_description_text: {
    padding: 15
  },
  add_todo_button: {
    left:15,
    width:'93%'
  }
});

const mapStateToProps = ( { customerReducer } ) => {
  return {
    todos: customerReducer.todos,
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, { addTodo, deleteTodo })(MyTodoListScreen));