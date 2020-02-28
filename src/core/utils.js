export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const mobileNumberValidator = mobile_number => {
  const re = /^(09|\+639)\d{9}$/;

  if (!mobile_number || mobile_number.length <= 0) return 'Mobile Number cannot be empty.';
  if (!re.test(mobile_number)) return 'Ooops! We need a valid mobile number.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const firstNameValidator = first_name => {
  if (!first_name || first_name.length <= 0) return 'Firstname cannot be empty.';

  return '';
};

export const lastNameValidator = last_name => {
  if (!last_name || last_name.length <= 0) return 'Lastname cannot be empty.';

  return '';
};

