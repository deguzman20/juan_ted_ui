export const fnameValidator = fname => {
  if (!fname || fname.length <= 0) return 'Firstname cannot be empty.';

  return '';
};

export const lnameValidator = lname => {
  if (!lname || lname.length <= 0) return 'Lastname cannot be empty.';

  return '';
};

export const addressLineOneValidator = addlineone => {
  if (!addlineone || addlineone.length <= 0) return 'Address Line 1 cannot be empty.';

  return '';
};

export const addressLineTwoValidator = addlinetwo => {
  if (!addlinetwo || addlinetwo.length <= 0) return 'Address Line 2 cannot be empty.';

  return '';
};

export const cityValidator = city => {
  if (!city || city.length <= 0) return 'City Code cannot be empty.';

  return '';
};

export const postalValidator = postal => {
  if (!postal || postal.length <= 0) return 'Postal Code cannot be empty.';

  return '';
};

export const stateValidator = state => {
  if (!state || state.length <= 0) return 'State cannot be empty.';

  return '';
};

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

export const oldPasswordValidator = old_password => {
  if (!old_password || old_password.length <= 0) return 'Old Password cannot be empty.';

  return '';
};

export const newPasswordValidator = new_password => {
  if (!new_password || new_password.length <= 0) return 'New Password cannot be empty.';

  return '';
};

export const confirmPasswordValidator = confirm_password => {
  if (!confirm_password || confirm_password.length <= 0) return 'Confirm Password cannot be empty.';

  return '';
};

export const todoDescriptionValidator = todo_description => {
  if (!todo_description || todo_description.length <= 0) return '   Todo Description cannot be empty.';

  return '';
};

export const introductionValidator = introduction => {
  if (!introduction || introduction.length <= 0) return 'Introduction cannot be empty.';

  return '';
};

export const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};
