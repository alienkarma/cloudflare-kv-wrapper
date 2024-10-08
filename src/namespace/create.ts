import { ENDPOINTS, Message, Response } from "../config";
import { loadVariables } from "../util";

export interface Create {
  accountId?: string;
  authToken?: string;
  title: string;
}

export interface CreateResponse {
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
  title,
}: Create): Promise<Response<CreateResponse>> => {
  const vars = loadVariables({
    accountId,
    authToken,
  });

  const url = ENDPOINTS.NAMESPACE.CREATE.replace(
    "{account_id}",
    vars.accountId
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  const status = response.status;
  const statusText = response.statusText;
  const data: CreateResponse = await response.json();

  return { status, statusText, data };
};
