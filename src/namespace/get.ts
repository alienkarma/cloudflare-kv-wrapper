import { ENDPOINTS, Message, Response } from "../config";
import { loadVariables } from "../util";

export interface Get {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
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
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const url = ENDPOINTS.NAMESPACE.GET.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: GetResponse = await response.json();

  return { status, statusText, data };
};
