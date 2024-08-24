import { ENDPOINTS, Message, Response } from "../config";
import { loadVariables } from "../util";

export interface Metadata {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
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
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const url = ENDPOINTS.KV_PAIR.METADATA.replace("{account_id}", vars.accountId)
    .replace("{namespace_id}", vars.namespaceId)
    .replace("{key_name}", keyName);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: MetadataResponse = await response.json();

  return { status, statusText, data };
};
