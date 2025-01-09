import { METHOD } from "@/constants/api-method.constant";
import { base_url, jsearch_url, rapidApiKey } from "@/constants/api.constant";
import { refreshToken } from "@/services/auth.service";

export const apiService = async (
    url,
    method = METHOD.GET,
    body = null,
    headers = {},
    params = null,
    retryCount = 0,
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
            options.body = body;
            delete options.headers["Content-Type"];
        } else {
            options.body = JSON.stringify(body);
        }
    }

    // Convert params to query string
    let fullUrl = `${base_url}${url}`;
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        fullUrl = `${fullUrl}?${queryString}`;
    }

    try {
        const response = await fetch(fullUrl, options);
        const data = await response.json();

        // If unauthorized and we haven't retried yet
        if (response.status === 401 && retryCount < 2) {
            try {
                // Attempt to refresh the token
                const refreshResponse = await refreshToken();

                if (refreshResponse && refreshResponse.data.resData.accessToken) {
                    // Update the access token
                    localStorage.setItem(
                        "accessToken",
                        refreshResponse.data.resData.accessToken,
                    );

                    // Retry the original request with the new token
                    return await apiService(
                        url,
                        method,
                        body,
                        headers,
                        params,
                        retryCount + 1,
                    );
                }
            } catch (error) {
                // If refresh fails, logout the user
                // await logout();
                return Promise.reject("Session expired. Please log in again.");
            }
        }

        return { data: { response, resData: data } };
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};

export const apiKeyService = async (
    url,
    method = METHOD.GET,
    body = null,
    headers = {},
    params = null,
    apiKey,
    apiKeyHeader = "x-rapidapi-key",
    apiHost = "jsearch.p.rapidapi.com",
) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            [apiKeyHeader]: apiKey, // Add the API key header
            "x-rapidapi-host": apiHost, // Add the API host header
            ...headers, // Merge additional headers
        },
    };

    if (body) {
        if (headers["Content-Type"] === "multipart/form-data") {
            options.body = body;
            delete options.headers["Content-Type"];
        } else {
            options.body = JSON.stringify(body);
        }
    }

    // Convert params to query string
    let fullUrl = `${jsearch_url}${url}`;

    if (params) {
        const queryString = new URLSearchParams(params).toString();
        fullUrl = `${fullUrl}?${queryString}`;
    }

    try {
        const response = await fetch(fullUrl, options)
        const data = await response.json();

        return { data: { response, resData: data } };
    } catch (error) {
        console.error("API Error:", error);
        return { error }
    }
};