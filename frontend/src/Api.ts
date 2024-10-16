/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface OrderDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date-time */
  deliveryDate?: string;
  /** @format int32 */
  totalAmount?: number;
  orderEntries?: OrderEntryDto[] | null;
  status?: OrderStatusDto;
  /** @format int32 */
  customerId?: number;
}

export interface CustomerDto {
    /** @format int32 */
    id?: number;
    name?: string | null;
    address?: string | null;
    email?: string | null;
    phone?: string | null;

}

export interface OrderEntryDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  orderId?: number;
  /** @format int32 */
  quantity?: number;
}

export interface OrderStatusDto {
  /** @format int32 */
  id?: number;
  status?: string | null;
}

export interface ProductDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  /** @format double */
  price?: number;
  description?: string | null;
  /** @format int32 */
  stock?: number;
  isDiscontinued?: boolean;
  properties?: string | null;
}

export interface ProductPropertiesDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title DMI
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Customers
     * @name CustomersOrdersDetail
     * @request GET:/api/Customers/{id}/orders
     */
    customersOrdersDetail: (id: number, params: RequestParams = {}) =>
      this.request<OrderDto[], any>({
        path: `/api/Customers/${id}/orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersList
     * @request GET:/api/Orders
     */
    ordersList: (params: RequestParams = {}) =>
      this.request<OrderDto[], any>({
        path: `/api/Orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersCreate
     * @request POST:/api/Orders
     */
    ordersCreate: (data: OrderDto, params: RequestParams = {}) =>
      this.request<OrderDto, any>({
        path: `/api/Orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersStatusUpdate
     * @request PUT:/api/Orders/{id}/status
     */
    ordersStatusUpdate: (id: number, data: OrderStatusDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Orders/${id}/status`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsList
     * @request GET:/api/Products
     */
    productsList: (
      query?: {
        search?: string;
        filter?: string;
        orderBy?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductDto[], any>({
        path: `/api/Products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsCreate
     * @request POST:/api/Products
     */
    productsCreate: (data: ProductDto, params: RequestParams = {}) =>
      this.request<ProductDto, any>({
        path: `/api/Products`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsDiscontinueUpdate
     * @request PUT:/api/Products/{id}/discontinue
     */
    productsDiscontinueUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Products/${id}/discontinue`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsRestockUpdate
     * @request PUT:/api/Products/{id}/restock
     */
    productsRestockUpdate: (id: number, data: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Products/${id}/restock`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsPropertiesCreate
     * @request POST:/api/Products/{id}/properties
     */
    productsPropertiesCreate: (id: number, data: ProductPropertiesDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Products/${id}/properties`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
