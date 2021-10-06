import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://bbstg.monstercode.net/api/v1/master',
});
export default instance;
