import { METHOD } from "@/constants/api-method.constant";
import { base_url } from "../constants/api.constant";
import { refreshToken } from "@/services/auth.service";

export const apiService = async (
    url,
    method = METHOD.GET,
    body = null,
    headers = {},
) => {
    let token = localStorage.getItem("accessToken");
    const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        credentials: "include",
    };

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (body) {
        if (headers["Content-Type"] === "multipart/form-data") {
            // Do not stringify body for form-data
            options.body = body;
            delete options.headers["Content-Type"]; // Let browser set the boundary automatically
        } else {
            options.body = JSON.stringify(body);
        }
    }

    try {
        const response = await fetch(`${base_url}${url}`, options);

         if (response.status === 401) {
             // Token expired, attempt to refresh
             try {
                 const refreshResponse = await refreshToken(); // No need to pass refreshToken from client, it will be sent automatically
                 if (refreshResponse.accessToken) {
                     // Save new accessToken and retry the original request
                     token = refreshResponse.accessToken;
                     localStorage.setItem("accessToken", token);
                     options.headers.Authorization = `Bearer ${token}`;
                     return await fetch(`${base_url}${url}`, options).then(
                         (res) => res.json(),
                     );
                 }
             } catch (error) {
                 console.error("Refresh token failed:", error.message);
                 window.location.href = "/";
                 return Promise.reject("Session expired. Please log in again.");
             }
         }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "API request failed");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};
