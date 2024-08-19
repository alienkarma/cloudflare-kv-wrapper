import { ENDPOINTS, Message, Response } from "../config";

export interface Remove {
  accountId: string;
  authToken: string;
  namespaceId: string;
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
}: Remove): Promise<Response<RemoveResponse>> => {
  const url = ENDPOINTS.NAMESPACE.REMOVE.replace(
    "{account_id}",
    accountId
  ).replace("{namespace_id}", namespaceId);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: RemoveResponse = await response.json();

  return { status, statusText, data };
};
