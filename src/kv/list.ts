import { ENDPOINTS, Message, Response } from "../config";
import { loadVariables } from "../util";

export interface List {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
  cursor?: string;
  limit?: number;
  prefix?: string;
}

export interface ListResponse {
  errors: Message[];
  messages: Message[];
  success: boolean;
  result_info: {
    count: number;
    cursor?: string;
  };
  result: {
    name: string;
    metadata: Record<string, string>;
    expiration?: number;
  }[];
}

export default async ({
  accountId,
  authToken,
  namespaceId,
  cursor,
  limit,
  prefix,
}: List): Promise<Response<ListResponse>> => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const query: string[] = [];

  if (cursor) query.push(`cursor=${cursor}`);
  if (limit) query.push(`limit=${limit}`);
  if (prefix) query.push(`prefix=${prefix}`);

  const queryString = query.length === 0 ? "" : "?" + query.join("&");

  const url =
    ENDPOINTS.KV_PAIR.LIST.replace("{account_id}", vars.accountId).replace(
      "{namespace_id}",
      vars.namespaceId
    ) + queryString;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: ListResponse = await response.json();

  return { status, statusText, data };
};
