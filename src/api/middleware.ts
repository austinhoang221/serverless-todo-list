import { toast } from "react-toastify";

export const fetchMiddleware = (originalFetch: any) => {
      return async (url: string, options: any) => {
        // Pre-request logic (e.g., add auth token)
        const modifiedOptions = { ...options, headers: { ...options.headers } };

        try {
          const response = await originalFetch(url, modifiedOptions);

          // Post-response logic (e.g., error handling, data transformation)
          if (!response.ok) {
            console.error('Fetch error:', response.status, response.statusText);
            // Throw an error or return a specific error object
          }

          return response;
        } catch (error) {
          // Error handling for network issues or thrown errors
          toast.error(error);
          console.error('Network or fetch error:', error);
          throw error;
        }
      };
    }