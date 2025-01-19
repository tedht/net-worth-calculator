import axios from 'axios';
// backend
// const Axios = axios.create({ baseURL: 'http://localhost:3000', withCredentials: true });
// using json server
const Axios = axios.create({ baseURL: 'http://localhost:5000', withCredentials: false });
export default Axios;
