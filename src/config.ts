const BASE_ENDPOINT = "https://api.cloudflare.com/client/v4";
const KV_ENDPOINT = `${BASE_ENDPOINT}/accounts/{account_id}/storage/kv/namespaces`;
const NAMESPACE_ENDPOINT = `${KV_ENDPOINT}/{namespace_id}`;
const KV_PAIRS_ENDPOINT = `${NAMESPACE_ENDPOINT}/values/{key_name}`;
const KV_PAIRS_BULK_ENDPOINT = `${NAMESPACE_ENDPOINT}/bulk`;

export const ENDPOINTS = {
  NAMESPACE: {
    LIST: `${KV_ENDPOINT}`,
    CREATE: `${KV_ENDPOINT}`,
    REMOVE: `${NAMESPACE_ENDPOINT}`,
    GET: `${NAMESPACE_ENDPOINT}`,
    RENAME: `${NAMESPACE_ENDPOINT}`,
  },
  KV_PAIR: {
    LIST: `${NAMESPACE_ENDPOINT}/keys`,
    METADATA: `${NAMESPACE_ENDPOINT}/metadata/{key_name}`,
    MULTI: {
      REMOVE: `${KV_PAIRS_BULK_ENDPOINT}`,
      WRITE: `${KV_PAIRS_BULK_ENDPOINT}`,
    },
    REMOVE: `${KV_PAIRS_ENDPOINT}`,
    READ: `${KV_PAIRS_ENDPOINT}`,
    WRITE: `${KV_PAIRS_ENDPOINT}`,
  },
};

export interface Message {
  code: number;
  message: string;
}

export interface Response<T> {
  status: number;
  statusText: string;
  data?: T;
}
