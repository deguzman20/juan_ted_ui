

export interface IFirstName {
  value: string;
  error: string;
}

export interface ILastName {
  value: string;
  error: string;
}

export interface IMoblieNumber {
  value: string;
  error: string;
}

export interface IEmail {
  value: string;
  error: string;
}

export interface IPassword {
  value: string;
  error: string;
}

export interface CustomerDetail {
  email: string;
  password: string;
}

export interface TaskerDetail {
  email: string;
  password: string;
}

export interface LoginProps {
  navigation: any;
  customerSignInAction: (value: any) => void;
  taskerSignInAction: (value: any) => void;
  customer_id: number;
  tasker_id: number;
}

export interface ForgotPasswordProps {
  navigation: any;
}