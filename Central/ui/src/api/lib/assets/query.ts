import {useQuery} from '@tanstack/react-query';
import Keys from './query.keys';
import api from './apis';
const getAssets = () => useQuery<any, Error>(Keys.getAssets(), () => api.getAssets().then(({data}) => data));
const getTopology = () => useQuery<any, Error>(Keys.getTopology(), () => api.getTopology().then(({data}) => data));

export {
    Keys as AssetsQueryKeys
};
export default {
    getAssets,
    getTopology
}