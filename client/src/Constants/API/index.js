import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.100.6:7000/',
    headers: {
        'Content-type': 'application/json',
    },
});