export interface CustomerInfo {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  mobile_number: string;
  zip_code: string;
  card_detail: string;
  auth_token: string;
  tasks?: any;
  todos?: any;
  data?: any;
  payload:? any;
}