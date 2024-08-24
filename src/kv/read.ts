import { ENDPOINTS, Response } from "../config";
import { loadVariables } from "../util";

export interface Read {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
  keyName: string;
}

export default async ({
  accountId,
  authToken,
  namespaceId,
  keyName,
}: Read): Promise<Response<any>> => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const url = ENDPOINTS.KV_PAIR.READ.replace("{account_id}", vars.accountId)
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
  const data = await response.text();

  return { status, statusText, data };
};
