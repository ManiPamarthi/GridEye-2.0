import HttpInstance from '../axios';
//import { IUserLoginData } from './types';
export default {
    addVulnerabilities(data:any) {
        return HttpInstance.post('/vulnerabilities', data);
    },
    getVulnerabilities(size = 10, from = 0){
        return HttpInstance.get(`/vulnerabilities?size=${size}&${from}`);
    },
    getStats() {
        return HttpInstance.get('/vulnerabilities/stats');
    }
}   

 
