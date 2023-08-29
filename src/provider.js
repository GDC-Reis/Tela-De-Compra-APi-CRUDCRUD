import axios from "axios";

export const api = axios.create({
    baseURL: 'https://crudcrud.com/api/0ef9f3f9cb674b7492675818517f3557/cart',
    timeout: 10000,
});