import { atomWithStorage } from 'jotai/utils';
import * as Yup from 'yup';
export const LoginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });
export const isUserLoggedInAtom = atomWithStorage('userLoggedIn', false)
