import * as yup from 'yup'

const email = yup.string().email().required();

const password = yup.string().required()

const confirmPassword = yup.string().required().when('password', {
  is: (val: string) => (val && val.length > 0 ? true : false),
  then: yup.string().oneOf([yup.ref('password')], 'Both password need to be the same'),
})

export const registerSchema = yup.object().shape({
  email,
  password,
  confirmPassword,
});

export const loginSchema = yup.object().shape({
  email,
  password
});