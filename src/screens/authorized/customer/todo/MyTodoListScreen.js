import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_TODO, DELETE_TODO  } from './../../../../queries';
import { addTodo, deleteTodo } from './../../../../actions';
import { StyleSheet, ScrollView } from 'react-native';
import { todoDescriptionValidator } from './../../../../core/utils';
import { Card, Icon, Button as TodoItemButton } from 'react-native-elements';
import TextInput from './../../../../components/atoms/text_input/TextInput';
import Button from './../../../../components/atoms/button/Button';

const MyTodoListScreen = ({ todos, customer_id, addTodo, deleteTodo }) => {
  const [createTodo] = useMutation(CREATE_TODO)
  const [removeTodo] = useMutation(DELETE_TODO)
  const [todo_description, setTodoDescription] = useState({ value: '', error: '' })

  const _onAddTodoPressed = () => {
    const todoDescriptionError = todoDescriptionValidator(todo_description.value)

    if (todoDescriptionError) {
      setTodoDescription({ ...todo_description, error: todoDescriptionError })
      return;
    }
    
    createTodo({ variables: { id: parseInt(customer_id), todo_description: todo_description.value} }).then((data) =>{
      addTodo(data)
    })
  }

  const _onDeleteTodoPressed = (todo_id) => {
    removeTodo({ variables: { todo_id } }).then((data) => {
      deleteTodo(todo_id)
    })
  }

  return(
    <React.Fragment>
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
        {Object.values(todos).map(todo => (
          <Card title={`${todo['todoDescription']}`} key={Math.random((1000))}>
            <TodoItemButton
              icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={styles.book_btn}
              color="white"
              title={'Book'}
              onPress={() => _onAddTodoPressed()}
            />
            <TodoItemButton
              icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={styles.remove_btn}
              color="white"
              backgroundColor="#f13a59"
              title='Remove'
              onPress={() => _onDeleteTodoPressed(parseInt(todo['id']))} 
            />
          </Card>
        ))}
      </ScrollView>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  todo_description_text: {
    padding: 15
  },
  add_todo_button: {
    left:15,
    width:'93%',
  },
  book_btn: {
    margin: 0,
    backgroundColor: "#009C3C"
  },
  remove_btn: {
    borderRadius: 0, 
    margin: 0,
    top: 5, 
    backgroundColor: "black"
  }
})

const mapStateToProps = ( { customerReducer } ) => {
  return {
    todos: customerReducer.todos,
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, { addTodo, deleteTodo })(MyTodoListScreen))