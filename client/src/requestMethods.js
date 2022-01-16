import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWRhOTg1OTNlZmVhMjhjMGZhMGYyMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjM1NTY0NywiZXhwIjoxNjQyNjE0ODQ3fQ.lBukctS-J-uMDUrEdvV7bLnKuvJEhZ8iPiWeNjrJWnE';

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {token: `Bearer ${TOKEN}`},
});
