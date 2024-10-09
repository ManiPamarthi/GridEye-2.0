import api from './apis';
import Keys from './mutation.keys';
import { useMutation } from '@tanstack/react-query';
//import { IUserLoginData } from './types';
const addVulnerabilities = () => {
    return useMutation(Keys.addVulnerabilities(),(data:any) => api.addVulnerabilities(data))
};
export default {
    addVulnerabilities
}