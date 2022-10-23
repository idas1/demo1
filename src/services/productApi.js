import axios from "axios";
import history from "../history";
import store from "./../store/index"
import { showLoading, hideLoading } from "react-redux-loading-bar";

const url = {
    baseUrl: "http://localhost:8080/api",
    login: "/users/login",
    products: "/products",
  };

  const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use((request) => {
    const state = store.getState();
    if (state.auth.token) {
      request.headers.token = `${state.auth.token}`;
    }
    store.dispatch(showLoading());
    return request;
  });
  
  instance.interceptors.response.use(
    (response) => {
      setTimeout(() => store.dispatch(hideLoading()), 100);
      return response.data;
    },
    (error) => {
      setTimeout(() => store.dispatch(hideLoading()), 100);
      if (!error.response || error.response.status === 0) {
        history.replace("/network-error");
      } else {
        switch (error.response.status) {
          case 401:
            history.replace("/login");
            break;
          case 403:
            history.replace("/no-permission");
            break;
          default:
            break;
        }
      }
      return Promise.reject(error);
    }
  );

  const api = {
    url,
    instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    patch: instance.patch,
  }

export default api;