import api from './apis';
import Keys from './mutation.keys';
import { useMutation } from '@tanstack/react-query';
//import { IUserLoginData } from './types';
const addAssets = () => {
    return useMutation(Keys.addAssets(),(data:any) => api.addAssets(data))
};
const updateAssets = () => {
    return useMutation(Keys.updateAssets(),(data:any) => api.updateAssets(data))
};
export default {
    addAssets,
    updateAssets
}