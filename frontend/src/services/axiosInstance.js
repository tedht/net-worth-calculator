import axios from 'axios';

const Axios = axios.create({ baseURL: 'http://localhost:5000', withCredentials: false });
export default Axios;
