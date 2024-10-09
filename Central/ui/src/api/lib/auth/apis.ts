import HttpInstance from '../axios';
import { IUserLoginData } from './types';
export default {
    login(data: IUserLoginData) {
        return HttpInstance.post('/login', data);
    },
    logout(){
        return HttpInstance.get('/logout');
    } 
}   

