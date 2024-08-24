import { INIT_STATE } from "./config";

export interface Variables {
  accountId: string;
  authToken: string;
  namespaceId?: string;
}

export const loadVariables = ({
  accountId,
  authToken,
  namespaceId,
}: Variables): {
  accountId: string;
  authToken: string;
  namespaceId: string;
} => {
  const state = {
    accountId: "",
    authToken: "",
    namespaceId: "",
  };

  state.accountId = accountId || INIT_STATE.accountId;
  state.authToken = authToken || INIT_STATE.authToken;
  state.namespaceId = namespaceId || INIT_STATE.namespaceId;

  return state;
};
