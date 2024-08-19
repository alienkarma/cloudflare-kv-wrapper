import { ENDPOINTS, Message, Response } from "../config";

export interface Write {
  accountId: string;
  authToken: string;
  namespaceId: string;
  keyName: string;
  metadata: Record<string, string>;
  value: string;
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
  keyName,
  metadata,
  value,
}: Write): Promise<Response<WriteResponse>> => {
  const url = ENDPOINTS.KV_PAIR.WRITE.replace("{account_id}", accountId)
    .replace("{namespace_id}", namespaceId)
    .replace("{key_name}", keyName);

  const body = new FormData();
  body.append("metadata", JSON.stringify(metadata));
  body.append("value", value);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body,
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: WriteResponse = await response.json();

  return { status, statusText, data };
};
