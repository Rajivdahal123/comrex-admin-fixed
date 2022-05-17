import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Wrong email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^[A-Za-z0-9_. ]+$/,
      'No special characters are allowed'
    )
    .max(30, 'Maximum length is 30 characters'),
  firstName: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^[A-Za-z0-9_. ]+$/,
      'No special characters are allowed'
    )
    .max(30, 'Maximum length is 30 characters')
    .required('First Name is required'),
  lastName: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^[A-Za-z0-9_. ]+$/,
      'No special characters are allowed'
    )
    .max(30, 'Maximum length is 30 characters')
    .required('First Name is required'),
  email: Yup.string()
    .email('Check the format of the email you entered')
    .max(80, 'Maximum length is 80 characters')
    .required('Email is required'),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('User Name is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Wrong email format').required('Email is required'),
  password: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*?[A-Z|a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{6,}$/,
      'Passwords must include at least six numbers, letters, and special characters (like ! and &)'
    )
    .required('Password is required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'The passwords do not match')
    .required('Confirm Password is required'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Check the format of the email you entered')
    .required('Email is required'),
});

export const ModeratorSchema = Yup.object().shape({
  userName: Yup.string().matches(
    // eslint-disable-next-line no-useless-escape
    /^[A-Za-z0-9_. ]+$/,
    'No special characters are allowed'
  )
  .max(30, 'Maximum length is 30 characters')
  .required('The user name is required.'),
  firstName: Yup.string().matches(
    // eslint-disable-next-line no-useless-escape
    /^[A-Za-z0-9_. ]+$/,
    'No special characters are allowed'
  )
  .max(30, 'Maximum length is 30 characters')
  .required('The first name is required.'),
  lastName: Yup.string().matches(
    // eslint-disable-next-line no-useless-escape
    /^[A-Za-z0-9_. ]+$/,
    'No special characters are allowed'
  ).max(30, 'Maximum length is 30 characters')
  .required('The last name is required.'),
  email: Yup.string()
  .email('Please enter a valid email address')
  .max(80, 'Maximum length is 80 characters')
  .required('Email is required.')
});

export const PasswordSchema = Yup.object({
  old: Yup.string()
    .required('Old Password is required.'),
  password: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*?[A-Z|a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{6,}$/,
      'Passwords must include at least six numbers, letters, and special characters (like ! and &)'
    )
    .required('Password is required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'The passwords do not match')
    .required('Confirm Password is required'),
});

export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*?[A-Z|a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{6,}$/,
      'Passwords must include at least six numbers, letters, and special characters (like ! and &)'
    )
    .required('Password is required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'The passwords do not match')
    .required('Confirm Password is required'),
});

export const CodeSchema = Yup.object({
  codec_name: Yup.string()
  .required("Codec Name is required"),
  codec_ip: Yup.string().matches(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::\d{0,4})?\b$/,
    "Invalid IP Address"
  )
  .max(21)
  .required(`Codec's IP Address is required.`)
})
