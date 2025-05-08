import { AxiosRequestConfig } from "axios";
/**
 * Get response from REST API.
 * @param url - API URL
 * @param headers - Request headers
 * @returns API response data or null in case of an error
 */
export declare const getApiResponse: <T>(url: string, headers?: AxiosRequestConfig) => Promise<T | null>;
/**
 * Send response to REST API.
 * @param url - API URL
 * @param data - Data to send
 * @param headers - Request headers
 * @returns API response data or null in case of an error
 */
export declare const sendApiResponse: <T>(appLocalizer: Record<string, any>, url: string, data: any, headers?: AxiosRequestConfig) => Promise<T | null>;
/**
 * Generate API endpoint URL.
 * @param endpoint - API endpoint
 * @param namespace - API namespace (optional)
 * @param rootUrl - API root URL (optional)
 * @returns Complete API URL
 */
export declare const getApiLink: (appLocalizer: Record<string, any>, endpoint: string, namespace?: string, rootUrl?: string) => string;
