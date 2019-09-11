import axios from 'axios';
import {apiServer} from '../common/constants';

const endPoint = '/api/v1/items';
const server = apiServer + endPoint;

export default {
    item: {
        add: (item) =>
            axios.post(server, item, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
        delete: (id) =>
            axios.delete(server + '/' + id, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),

        update: (item) =>
            axios.put(server + '/' + item.id, item, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),

    }
}
