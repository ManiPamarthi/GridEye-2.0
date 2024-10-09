import {useQuery} from '@tanstack/react-query';
import Keys from './query.keys';
import api from './apis';
const logout = () => useQuery<any, Error>(Keys.logout(), () => api.logout().then((data:any) => data));
export {
    Keys as AuthQueryKeys
};
export default {
    logout
}