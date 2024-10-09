import HttpInstance from '../axios';
//import { IUserLoginData } from './types';
export default {
    getAssets(){
        return HttpInstance.get('/assets');
    },
    addAssets(data:any) {
        return HttpInstance.post('/assets', data);
    },
    updateAssets(data:any) {
        return HttpInstance.patch('/assets', data);
    },
    getTopology() {
        return HttpInstance.get('/topology');
    } 
}   

 
