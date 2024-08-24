import { ENDPOINTS, Message, Response } from "../config";
import { loadVariables } from "../util";

export interface Write {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
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
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const url = ENDPOINTS.KV_PAIR.WRITE.replace("{account_id}", vars.accountId)
    .replace("{namespace_id}", vars.namespaceId)
    .replace("{key_name}", keyName);

  const body = new FormData();
  body.append("metadata", JSON.stringify(metadata));
  body.append("value", value);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
    },
    body,
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: WriteResponse = await response.json();

  return { status, statusText, data };
};
