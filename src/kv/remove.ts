import { ENDPOINTS, Message, Response } from "../config";
import { loadVariables } from "../util";

export interface Remove {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
  keyName: string;
}

export interface RemoveResponse {
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
}: Remove): Promise<Response<RemoveResponse>> => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const url = ENDPOINTS.KV_PAIR.REMOVE.replace("{account_id}", vars.accountId)
    .replace("{namespace_id}", vars.namespaceId)
    .replace("{key_name}", keyName);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();

  return { status, statusText, data };
};
