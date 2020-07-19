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
  mutation taskerSignin($email: String!, $password: String!) {
    taskerSignin(email: {email: $email, password: $password}) {
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

export const SEND_MESSAGE = gql`
  mutation createMessage($customer_id: Int!, $tasker_id: Int!, $own_by_customer: Boolean!, $text: String!) {
    createMessage(customerId: $customer_id, taskerId: $tasker_id, ownByCustomer: $own_by_customer, text: $text) {
      message {
        id
      }
    }
  }`;

export const DELETE_TODO = gql `
  mutation deleteTodo($todo_id: Int!){
    deleteTodo(todoId: $todo_id) {
      id
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

export const UPDATE_CUSTOMER_GEOLOCATION = gql`
  mutation updateCustomerGeolocation($customer_id: Int!, $lng: String!, $lat: String!, $formatted_address: String!) {
    updateCustomerGeolocation(customerId: $customer_id, lng: $lng, lat: $lat, formattedAddress: $formatted_address) {
      response
    }
  }`;

export const CONVERSATION_MESSAGES = gql`
  query ($conversation_id: Int!){
    conversationMessages(conversationId: $conversation_id) {
      id
      text
      conversationId
      ownByCustomer
      createdAt
    }
  }`;

export const ALL_REVIEWS = gql`
  query {
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

export const ALL_SERVICE_TYPES = gql`
  query {
    allServiceType {
      id
      name
      image
    }
  }`;

export const CUSTOMER_CONVERSATION_LIST = gql`
  query conversationList($user_id: Int!) {
    conversationList(userId: $user_id, isCustomer: true) {
      customer {
        conversations {
          id
          tasker {
            id
            firstName
            lastName
            image
          }
          messages {
            id
            text
            createdAt
          }
        }
      }
    }
  }`;

export const TASKER_CONVERSATION_LIST = gql`
  query conversationList($user_id: Int!) {
    conversationList(userId: $user_id, isCustomer: false) {
      customer {
        conversations {
          id
          customer {
            id
            firstName
            lastName
            image
          }
          messages {
            id
            text
            createdAt
          }
        }
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

export const SERVICES = gql`
  query service($service_type_id: Int!){
    service(serviceTypeId: $service_type_id){
      id
      name
      description
      image
      price
    }
  }`;


export const SPECIFIC_TODO = gql `
  query todo($customer_id: Int!) {
    todo(customerId: $customer_id) {
      id
      service {
        id
        name
        description
      }
      todoDescription
    }
  }`;

export const TASKER_BY_GEOLOCATION = gql `
  query taskerByGeolocation($lng: String!, $lat: String!, $service_type_id: Int!, $start_from: String!, $start_to: String!) {
    taskerByGeolocation(lng: $lng, lat: $lat, serviceTypeId: $service_type_id, startFrom: $start_from, startTo: $start_to) {
      id
      firstName
      lastName
      email
      image
      reviews {
        id
        rating
      }
    }
  }`;

  export const TASKER_INFO = gql `
    query tasker($tasker_id: Int!) {
      tasker(id: $tasker_id) {
        id
        firstName
        lastName
        image
        introduction
        reviews {
          id
          rating
          comment
          customer {
            firstName
            lastName
            image
          }
        }
        featuredSkills {
          id
          serviceType {
            id
            name
          }
        }
        reviews {
          id
          rating
          serviceType {
            id
            name
          }
          customer {
            id
            firstName
            lastName
            image
          }
          comment
        }
      }
    }`; 

export const CUSTOMER_CURRENT_GEOLOCATION = gql `
  query customer($customer_id: Int!) {
    customer(id: $customer_id) {
      lng
      lat
      formattedAddress
    }
  }`;

export const PAST_TASKER_LIST = gql `
  query pastTaskerList($customer_id: Int!) {
    pastTaskerList(customerId: $customer_id) {
      tasker {
        firstName
        lastName
        image
      }
    }
  }`;

export const FAVORATE_TASKER_LIST = gql `
  query favorateTasker($customer_id: Int!) {
    favorateTaskerList(customerId: $customer_id) {
      tasker {
        firstName
        lastName
        image
        featuredSkills {
          id
          serviceType {
            id
            name
          }
        }
        reviews {
          rating
        }
      }
    }
  }`;

export const TASKER_APPOINTMENT_LIST = gql `
  query taskerAppointmentList($tasker_id: Int!) {
    taskerAppointmentList(taskerId: $tasker_id) {
      id
      from
      to
      tasker {
        firstName
        lastName
      }
      customer {
        firstName
        lastName
      }
    }
  }`;

  export const TRANSACTION_SERVICE = gql `
    query transactionService($transaction_id: Int!) {
      transactionService(transactionId: $transaction_id) {
        id
        from
        to
        lat
        lng
        customer {
          firstName
          lastName
          image
          lat
          lng
        }
        transactionServices {
          id
          quantity
          service {
            id
            name
            image
            price
          }
        }
        approved
        done
      }
    }`;