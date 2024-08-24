import { ENDPOINTS, Message, Response } from "../../config";
import { loadVariables } from "../../util";

export interface Remove {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
  body: string[];
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
  body,
}: Remove): Promise<Response<RemoveResponse>> => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const url = ENDPOINTS.KV_PAIR.MULTI.REMOVE.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();

  return { status, statusText, data };
};
