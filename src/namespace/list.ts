import { ENDPOINTS, Message, Response } from "../config";

export interface List {
  accountId: string;
  authToken: string;
  direction?: "asc" | "desc";
  order?: "id" | "title";
  page?: number;
  perPage?: number;
}

export interface ListResponse {
  errors: Message[];
  messages: Message[];
  success: boolean;
  result_info: {
    count: number;
    page: number;
    per_page: number;
    total_count: number;
  };
  result: {
    id: string;
    supports_url_encoding: boolean;
    title: string;
  }[];
}

export default async ({
  accountId,
  authToken,
  direction,
  order,
  page,
  perPage,
}: List): Promise<Response<ListResponse>> => {
  const query: string[] = [];

  if (direction) query.push(`direction=${direction}`);
  if (order) query.push(`order=${order}`);
  if (page) query.push(`page=${page}`);
  if (perPage) query.push(`per_page=${perPage}`);

  const queryString = query.length === 0 ? "" : "?" + query;

  const url =
    ENDPOINTS.NAMESPACE.LIST.replace("{account_id}", accountId) + queryString;

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
