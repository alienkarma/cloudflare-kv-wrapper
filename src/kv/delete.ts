import { ENDPOINTS, Message, Response } from "../config";

export interface Delete {
  accountId: string;
  authToken: string;
  namespaceId: string;
  keyName: string;
}

export interface DeleteResponse {
  errors: Message[];
  messages: Message[];
  success: boolean;
  result: {};
}

export default async ({
  accountId,
  authToken,
  namespaceId,
  keyName,
}: Delete): Promise<Response<DeleteResponse>> => {
  const url = ENDPOINTS.KV_PAIR.DELETE.replace("{account_id}", accountId)
    .replace("{namespace_id}", namespaceId)
    .replace("{key_name}", keyName);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();

  return { status, statusText, data };
};
