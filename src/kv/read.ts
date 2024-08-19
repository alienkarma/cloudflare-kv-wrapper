import { ENDPOINTS, Response } from "../config";

export interface Read {
  accountId: string;
  authToken: string;
  namespaceId: string;
  keyName: string;
}

export default async ({
  accountId,
  authToken,
  namespaceId,
  keyName,
}: Read): Promise<Response<any>> => {
  const url = ENDPOINTS.KV_PAIR.READ.replace("{account_id}", accountId)
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
  const data = await response.text();

  return { status, statusText, data };
};
