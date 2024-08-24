import { INIT_STATE } from "./config";
import { Variables } from "./util";

export * as kv from "./kv";
export * as kvm from "./kv/multi";
export * as ns from "./namespace";

export * as KVTypes from "./kv/types";
export * as KVMTypes from "./kv/multi/types";
export * as NSTypes from "./namespace/types";

export const init = ({ accountId, authToken, namespaceId }: Variables) => {
  INIT_STATE.accountId = accountId;
  INIT_STATE.authToken = authToken;
  INIT_STATE.namespaceId = namespaceId || "";
};
