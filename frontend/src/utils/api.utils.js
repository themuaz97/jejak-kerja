import { METHOD } from "@/constants/api-method.constant";

export const apiService = async (
    url,
    method = METHOD.GET,
    body = null,
    headers = {},
) => {
    const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
    };

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
        const response = await fetch(`${url}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API request failed");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};
