import { ENDPOINTS, Message, Response } from "../config";

export interface Metadata {
  accountId: string;
  authToken: string;
  namespaceId: string;
  keyName: string;
}

export interface MetadataResponse {
  errors: Message[];
  messages: Message[];
  success: boolean;
  result: Record<string, string>;
}

export default async ({
  accountId,
  authToken,
  namespaceId,
  keyName,
}: Metadata): Promise<Response<MetadataResponse>> => {
  const url = ENDPOINTS.KV_PAIR.METADATA.replace("{account_id}", accountId)
    .replace("{namespace_id}", namespaceId)
    .replace("{key_name}", keyName);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: MetadataResponse = await response.json();

  return { status, statusText, data };
};
