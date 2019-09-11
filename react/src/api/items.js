import axios from 'axios';
import {apiServer} from '../common/constants';

const endPoint = '/api/v1/items';
const server = apiServer + endPoint;

export default {
    items: {
        read: () => {
            console.log('Inside items api');
            return axios.get(server, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
        }
    }
}
