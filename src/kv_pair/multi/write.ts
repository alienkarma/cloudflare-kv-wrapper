import { ENDPOINTS, Message, Response } from "../../config";

export interface WriteKVPair {
  base64?: boolean;
  expiration?: number;
  expiration_ttl?: number;
  key: string;
  value: string;
  metadata?: Record<string, string>;
}

export interface Write {
  accountId: string;
  authToken: string;
  namespaceId: string;
  body: WriteKVPair[];
}

export interface WriteResponse {
  errors: Message[];
  messages: Message[];
  success: boolean;
  result: {};
}

export default async ({
  accountId,
  authToken,
  namespaceId,
  body,
}: Write): Promise<Response<WriteResponse>> => {
  const url = ENDPOINTS.KV_PAIR.MULTI.WRITE.replace(
    "{account_id}",
    accountId
  ).replace("{namespace_id}", namespaceId);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: WriteResponse = await response.json();

  return { status, statusText, data };
};
