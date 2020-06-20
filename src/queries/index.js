import gql from "graphql-tag";

export const CUSTOMER_SIGN_IN = gql`
  mutation customerSignIn($email: String!, $password: String!) {
    customerSignin(email: {email: $email, password: $password}) {
      id
      email
      firstName
      lastName
      image
      mobileNumber
      zipCode
      cardDetail
      authToken
      tasks{
        startLocationAddress
        endLocationAddress
        taskCompleted
        tasker{
          email
          firstName
          lastName
          image
          mobileNumber
          zipCode
          hourlyRate
          introduction
        }
      }
      todos{
        id
        todoDescription
        service {
          name
        }
      }
    }
  }`;

export const TASKER_SIGN_IN = gql`
  mutation taskerSignIn($email: String!, $password: String!) {
    customerSignin(email: {email: $email, password: $password}) {
      id
      email
      firstName
      lastName
      mobileNumber
      zipCode
      hourlyRate
      introduction
      tasks{
        startLocationAddress
        endLocationAddress
        taskCompleted
        customer{
          id
          email
          firstName
          lastName
          image
          mobileNumber
          zipCode
          cardDetail
        }
      }
    }
  }`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($first_name: String!, $last_name: String!, $mobile_number: String!, $email: String!, $password: String!) {
      createCustomer(firstName: $first_name, lastName: $last_name, mobileNumber: $mobile_number,
                    authProvider:{ email: { email: $email, password: $password } }){
      response
      statusCode
  }
}`;

export const CREATE_TASKER = gql`
  mutation createTasker($first_name: String!, $last_name: String!, $mobile_number: String!, $zip_code: String!, $email: String!, $password: String!) {
    createTasker(firstName: $first_name, lastName: $last_name, mobileNumber: $mobile_number, zipCode: $zip_code,
                authProvider: {email: {email: $email, password: $password}}) {
      response
      statusCode
    }
  }`;

export const CREATE_TODO = gql `
  mutation createTodo($id: Int!, $todo_description: String!){
    createTodo(customerId: $id, todoDescription: $todo_description){
      id
      todoDescription
      service {
        name
      }
    }  
  }`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!){
    forgotPassword(email: $email){
    statusCode
      response
    }
  }`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($id: Int!, $old_password: String!, $new_password: String!, $confirm_password: String!){
    updatePassword(id: $id, oldPassword: $old_password, newPassword: $new_password, confirmPassword: $confirm_password, customer: true){
      response
    }
  }`;

export const SUBSCRIPTION_ADD_MESSAGE_TO_CONVERSATION = gql`
  subscription messageAddedToConversation($conversation_id: Int!) {
    messageAddedToConversation(conversationId: $conversation_id) {
      id
      text
      conversationId
    }
  }`;

export const CONVERSATION_MESSAGES = gql`
  query conversationMessages($conversation_id: Int!) {
    conversationMessages(conversationId: $conversation_id) {
      id
      text
      conversationId
    }
  }`;

export const ALL_REVIEWS = gql`
  {
    allReviews {
      id
      rating
      comment
      customer {
        firstName
        lastName
      }
      tasker {
        firstName
        lastName
      }
    }
  }`;

  export const ALL_SERVICES = gql`
    {
      allServices {
        id
        name
        image
        price
      }
    }`;

export const CONVERSATION_LIST = gql`
  query conversationList($user_id: Int!, $is_customer: Boolean!) {
    conversationList(userId: $user_id, isCustomer: $is_customer) {
      id
      customer {
        firstName
        lastName
      }
      tasker {
        firstName
        lastName
      }
    }
}`;

export const LINKS = gql`
  query {
    links {
      id
      url
      description
    }
  }
`;

export const NEW_LINKS = gql`
  subscription {
    newLink {
      id
      url
      description
    }
  }`;