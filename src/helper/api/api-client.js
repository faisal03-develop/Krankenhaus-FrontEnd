import axios from "axios";
import {getLocalStorageItem, 
        removeLocalStorageItem,
        setSessionStorageItem,
    } from "../../utils/local-storage"


    // ...existing code...

const apiClient = () => {
    const defaultOptions = {
        baseURL: import.meta.env.REACT_APP_BASE_URL,
        headers: {  // Fixed typo: "header" -> "headers"
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true,  // Added to send cookies
    };

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => errorHandler(error)
    );

    instance.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
    );

    return instance;  // Added return statement to export the instance
};

// ...existing code...

// const apiClient = () => {
//     const defaultOptions = {
//         baseURL: import.meta.env.REACT_APP_BASE_URL,
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         withCredentials:true,
//     };

//     let instance = axios.create(defaultOptions);

//     instance.interceptors.request.use(
//         (request) => requestHandler(request),
//         (error) => errorHandler(error)
//     )

//     instance.interceptors.response.use(
//         (response) => responseHandler(response),
//         (error) => errorHandler(error),
//     )
// };

const requestHandler = (request) => {
  let storedToken = getLocalStorageItem("auth-token");
  request.headers.Authorization = storedToken ? `Bearer ${storedToken}` : "";
  request.headers['ngrok-skip-browser-warning'] = 'ngrok-skip-browser-warning';
  return request;
};

const responseHandler = (response) => {
    return response;
}


const errorHandler = (error) => {
  console.log(error);
  if (
    error?.response?.data?.message === "jwt expired" ||
    error?.response?.data?.message === "Token is expired or invalid." ||
    error?.response?.message === "jwt expired"
  ) {
    removeLocalStorageItem("userData");
    setSessionStorageItem(
      "tempRoute",
      JSON.stringify(window.location?.pathname)
    );
    window.location.assign("/login?tokenRevoked");
  }
  return Promise.reject(error);
};

export default apiClient;