import gql from "graphql-tag";

export const CUSTOMER_SIGN_IN = gql`
  mutation customerSignIn($email: String!, $password: String!) {
    customerSignin(email: {email: $email, password: $password}) {
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

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!){
    forgotPassword(email: $email){
    statusCode
      response
    }
  }`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($id: Int!, $new_password: String!, $confirm_password: String!, $customer: Boolean!){
    updatePassword(id: $id, newPassword: $new_password, confirmPassword: $confirm_password, customer: $customer){
      response
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