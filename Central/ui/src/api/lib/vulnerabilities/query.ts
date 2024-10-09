import {useQuery} from '@tanstack/react-query';
import Keys from './query.keys';
import api from './apis';
const getVulnerabilities = (size:number, from:number) => useQuery<any, Error>(Keys.getVulnerabilities(size, from), () => api.getVulnerabilities(size,from).then((data:any) => data));
const getStats = () => useQuery<any, Error>(Keys.getStats(), () => api.getStats().then((data:any) => data.data));

export {
    Keys as VulnerabilitiesQueryKeys
};
export default {
    getVulnerabilities,
    getStats
}