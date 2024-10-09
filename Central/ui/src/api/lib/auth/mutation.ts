import api from './apis';
import Keys from './mutation.keys';
import { useMutation } from '@tanstack/react-query';
import { IUserLoginData } from './types';
const login = () => {
    return useMutation(Keys.login(),(data:IUserLoginData) => api.login(data))
};
export default {
    login
}