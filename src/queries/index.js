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
      image
      mobileNumber
      # zipCode
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
          # zipCode
          # cardDetail
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

export const CREATE_REVIEW = gql `
  mutation createReview($rating: Int!, $comment: String!, $customer_id: Int!, $tasker_id: Int!, $service_type_id: Int!, $transaction_id: Int!){
    createReview(rating: $rating, comment: $comment, customerId: $customer_id, taskerId: $tasker_id, serviceTypeId: $service_type_id, transactionId: $transaction_id){
      response
      statusCode
    }
  }`;

export const SEND_MESSAGE = gql`
  mutation createMessage($customer_id: Int!, $tasker_id: Int!, $own_by_customer: Boolean!, $text: String!, $date_created: String!) {
    createMessage(customerId: $customer_id, taskerId: $tasker_id, ownByCustomer: $own_by_customer, text: $text, dateCreated: $date_created) {
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

export const UPDATE_TASKER_GEOLOCATION = gql`
  mutation updateTaskerGeolocation($tasker_id: Int!, $lng: String!, $lat: String!, $formatted_address: String!) {
    updateTaskerGeolocation(taskerId: $tasker_id, lng: $lng, lat: $lat, formattedAddress: $formatted_address) {
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
            createdDate
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

export const SERVICE_DETAILS = gql `
  query service($service_type_id: Int!) {
    service(serviceTypeId: $service_type_id) {
      id
      name
      image
      price
      whyThisServices {
        id
        reason
      }
      equipmentUses {
        id
        text
      }
      whatIsIncludeds {
        id
        text
      }
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

export const FAVORATE_TASKER_BY_GEOLOCATION = gql `
  query favorateTaskerByGeolocation($tasker_id: Int!, $lng: String!, $lat: String!, $service_type_id: Int!, $start_from: String!, $start_to: String!) {
    favorateTaskerByGeolocation(taskerId: $tasker_id, lng: $lng, lat: $lat, serviceTypeId: $service_type_id, startFrom: $start_from, startTo: $start_to) {
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

export const CUSTOMER_INFO = gql `
  query customer($customer_id: Int!) {
    customer(id: $customer_id) {
      id
      firstName
      lastName
      image
      email
      mobileNumber
      notificationCount
    }
  }`; 


export const TASKER_INFO = gql `
  query tasker($tasker_id: Int!) {
    tasker(id: $tasker_id) {
      id
      firstName
      lastName
      image
      email
      mobileNumber
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

export const TASKER_CURRENT_GEOLOCATION = gql `
  query tasker($tasker_id: Int!) {
    tasker(id: $tasker_id) {
      lng
      lat
      formattedAddress
    }
  }`;

export const PAST_TASKER_LIST = gql `
  query pastTaskerList($customer_id: Int!) {
    pastTaskerList(customerId: $customer_id) {
      id
      favorate
      tasker {
        id
        firstName
        lastName
        image
        reviews {
          id
          rating
        }
      }
    }
  }`;

export const ADD_TO_FAVORATE_TASKER = gql `
  mutation addToFavorateTasker($transaction_id: Int!) {
    addToFavorateTasker(transactionId: $transaction_id) {
      response
      statusCode
    }
  }`;

export const ADD_FEATURED_SKILL = gql `
  mutation createFeaturedSkill($tasker_id: Int!, $service_type_id: Int!) {
    createFeaturedSkill(taskerId: $tasker_id, serviceTypeId: $service_type_id) {
      response
      statusCode
    }
  }`;

export const REMOVE_TO_FAVORATE_TASKER = gql `
  mutation removeToFavorateTasker($transaction_id: Int!) {
    removeToFavorateTasker(transactionId: $transaction_id) {
      response
      statusCode
    }
}`;

export const REMOVE_TO_FEATURED_SKILL = gql `
  mutation removeFeaturedSkill($tasker_id: Int!, $service_type_id: Int!) {
    removeFeaturedSkill(taskerId: $tasker_id, serviceTypeId: $service_type_id) {
      response
      statusCode
    }
  }`;

export const UNSELECTED_SERVICE_TYPE_LIST = gql `
  query unselectedServiceType($tasker_id: Int!) {
    unselectedServiceType(taskerId: $tasker_id) {
      id
      name
      image
    }
  }`;

export const FAVORATE_TASKER_LIST = gql `
  query favorateTasker($customer_id: Int!) {
    favorateTaskerList(customerId: $customer_id) {
      tasker {
        id
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
      done
      from
      to
      tasker {
        id
        firstName
        lastName
      }
      customer {
        id
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
      done
      review
      customer {
        id
        firstName
        lastName
        image
        lat
        lng
      }
      tasker {
        id
        firstName
        lastName
        image
        lat
        lng
      }
      serviceType {
        id
        name
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

export const PENDING_TRANSACTION_LIST = gql `
  query pendingTransactionList($tasker_id: Int!) {
    pendingTransactionList(taskerId: $tasker_id) {
      id
      customer {
        id
        firstName
        lastName
        image
      }
      transactionServices {
        id
        service {
          id
          name
        }
      }
    }
  }`;

export const BILLING_ADDRESSES_LIST = gql `
  query billingAddressList($customer_id: Int!) {
    billingAddressList(customerId: $customer_id) {
      id
      firstName
      lastName
      addressLineOne
      addressLineTwo
      state
      postalCode
      email
      mobileNumber
    }
  }`;

export const PENDING_TRANSACTION_SERVICE_INFO = gql `
  query pendingTransactionServiceInfo($transaction_id: Int!) {
    pendingTransactionServiceInfo(transactionId: $transaction_id) {
      lat
      lng
      from
      to
      customer {
        id
        firstName
        lastName
        image
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
    }
  }`;

export const CUSTOMER_SERVICE_TYPE_LIST = gql `
  query taskerServiceTypeList($tasker_id: Int!) {
    taskerServiceTypeList(taskerId: $tasker_id) {
      id
      serviceType {
        id
        image
        name
      }
    }
  }`;

export const UPDATE_CUSTOMER_INFO = gql`
  mutation updateCustomerInfo($customer_id: Int!, $first_name: String!, $last_name: String!, $email: String, $mobile_number: String!) {
    updateCustomerInfo(customerId: $customer_id, firstName: $first_name, lastName: $last_name, email: $email, mobileNumber: $mobile_number) {
      response
      statusCode
    }
  }`;

export const UPDATE_TASKER_INFO = gql `
  mutation updateTaskerInfo($tasker_id: Int!, $first_name: String!, $last_name: String!, $email: String, $mobile_number: String!, $introduction: String!) {
      updateTaskerInfo(taskerId: $tasker_id, firstName: $first_name, lastName: $last_name, email: $email, mobileNumber: $mobile_number, introduction: $introduction) {
        response
        statusCode
      }
    }`;

export const UPDATE_TRANSACTION_STATUS = gql `
  mutation updateTransactionStatus($transaction_id: Int!) {
    updateTransactionStatus(transactionId: $transaction_id) {
      response
      statusCode
    }
  }`;

export const UPDATE_TRANSACTION_STATUS_TO_DONE = gql `
  mutation updateTransactionStatusToDone($transaction_id: Int!) {
    updateTransactionStatusToDone(transactionId: $transaction_id) {
      response
      statusCode
    }
  }`;

export const CUSTOMER_COMPLETED_TRANSACTION_LIST = gql `
  query customerCompletedTransactionList($customer_id: Int!) {
    customerCompletedTransactionList(customerId: $customer_id) {
      id
      from
      to
      lat
      to
      done
      tasker {
        id
        firstName
        lastName
        image
        reviews {
          id
          rating
        }
      }
      transactionServices {
        id
        quantity
        service {
          id
          name
          price
        }
      }
    }
  }`;

export const CUSTOMER_SCHEDULED_TRANSACTION_LIST = gql `
  query customerScheduledTransactionList($customer_id: Int!) {
    customerScheduledTransactionList(customerId: $customer_id) {
      id
      from
      to
      lat
      to
      done
      tasker {
        id
        firstName
        lastName
        image
        reviews {
          id
          rating
        }
      }
      transactionServices {
        id
        quantity
        service {
          id
          name
          price
        }
      }
    }
  }`;

export const MOST_HELPFUL_REVIEW = gql `
  query mostHelpfulReviews($service_id: Int!) {
    mostHelpfulReviews(serviceId: $service_id) {
      id
      rating
      comment
      customer {
        id
        firstName
        lastName
        image
      }
    }
  }`;

export const CUSTOMER_SHIPPING_ADDRESS = gql `
  query customerShippingAddressList($customer_id: Int!) {
    customerShippingAddressList(customerId: $customer_id) {
      id
      formattedAddress
    }
  }`;

export const CREATE_PAYMENT_TOKEN = gql `mutation createToken($number: String!, $exp_month: String! $exp_year: String!, $cvc: String!, $billing_address_id: Int!) {
  createToken(number: $number, expMonth: $exp_month, expYear: $exp_year, cvc: $cvc, billingAddressId: $billing_address_id){
    response
    statusCode
  }
}`;

export const PAY_VIA_DEBIT_CARD = gql `
  mutation payViaCard($token: String!, $amount: Int!, $customer_id: Int!, $tasker_id: Int!){
    payViaCard(token: $token, amount: $amount, customerId:$customer_id, taskerId: $tasker_id){
      response
      statusCode
    }
  }`;

export const CREATE_BILLING_ADDRESS = gql `
  mutation createBillingAddress($customer_id: Int!, $first_name: String!, $last_name: String!, $address_line_one: String!, $address_line_two: String!, $city: String!, $state: String!, $postal_code: String!, $country: String!, $email: String!, $mobile_number: String!) {
    createBillingAddress(customerId: $customer_id, firstName: $first_name, lastName: $last_name, addressLineOne: $address_line_one, addressLineTwo: $address_line_two, city: $city, state: $state, postalCode: $postal_code, country: $country, email: $email, mobileNumber: $mobile_number) {
      response
      statusCode
    }
  }`;

export const CREATE_NOTIFICATION = gql `
  mutation createNotification($customer_id: Int!, $tasker_id: Int!, $text: String!){
    createNotification(customerId: $customer_id, taskerId: $tasker_id, text: $text){
      response
    }
  }`;

export const CLEAR_NOTIFICATION = gql `
  mutation clearNotificationCount($customer_id: Int!){
    clearNotificationCount(customerId: $customer_id){
      response
    }
  }`;

export const GET_ALL_NOTIFICATION = gql `
  query ($customer_id: Int!){
    allNotificationsPerCustomer(customerId: $customer_id){
      id
      tasker {
        id
        firstName
        lastName
        image
      }
      text
    }
  }`;
  
  
