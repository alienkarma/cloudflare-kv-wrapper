import { ENDPOINTS, Message, Response } from "../config";

export interface Get {
  accountId: string;
  authToken: string;
  namespaceId: string;
}

export interface GetResponse {
  errors: Message[];
  messages: Message[];
  success: boolean;
  result: {
    id: string;
    supports_url_encoding: boolean;
    title: string;
  };
}

export default async ({
  accountId,
  authToken,
  namespaceId,
}: Get): Promise<Response<GetResponse>> => {
  const url = ENDPOINTS.NAMESPACE.GET.replace(
    "{account_id}",
    accountId
  ).replace("{namespace_id}", namespaceId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: GetResponse = await response.json();

  return { status, statusText, data };
};
