import { ENDPOINTS, Message, Response } from "../../config";
import { loadVariables } from "../../util";

export interface WriteKVPair {
  base64?: boolean;
  expiration?: number;
  expiration_ttl?: number;
  key: string;
  value: string;
  metadata?: Record<string, string>;
}

export interface Write {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
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
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const url = ENDPOINTS.KV_PAIR.MULTI.WRITE.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: WriteResponse = await response.json();

  return { status, statusText, data };
};
