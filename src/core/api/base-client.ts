import axios from "axios";

const api = 'http://localhost:5000/'

export const baseClient = axios.create({
    baseURL: api,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
});