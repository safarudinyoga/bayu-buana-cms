import axios from 'axios';
const instance = axios.create({
  baseURL: 'bbstg.monstercode.net/api/v1/master',
});
export default instance;
