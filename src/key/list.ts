import { ENDPOINTS, Message, Response } from "../config";

export interface List {
  accountId: string;
  authToken: string;
  namespaceId: string;
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
  const query: string[] = [];

  if (cursor) query.push(`cursor=${cursor}`);
  if (limit) query.push(`limit=${limit}`);
  if (prefix) query.push(`prefix=${prefix}`);

  const queryString = query.length === 0 ? "" : "?" + query.join("&");

  const url =
    ENDPOINTS.KEY.LIST.replace("{account_id}", accountId).replace(
      "{namespace_id}",
      namespaceId
    ) + queryString;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: ListResponse = await response.json();

  return { status, statusText, data };
};
