import { ENDPOINTS, Message, Response } from "../config";
import { loadVariables } from "../util";

export interface Rename {
  accountId?: string;
  authToken?: string;
  namespaceId?: string;
  title: string;
}

export interface RenameResponse {
  errors: Message[];
  messages: Message[];
  success: boolean;
  result: {};
}

export default async ({
  accountId,
  authToken,
  namespaceId,
  title,
}: Rename): Promise<Response<RenameResponse>> => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId,
  });

  const url = ENDPOINTS.NAMESPACE.RENAME.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: RenameResponse = await response.json();

  return { status, statusText, data };
};
