var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  KVMTypes: () => types_exports2,
  KVTypes: () => types_exports,
  NSTypes: () => types_exports3,
  init: () => init,
  kv: () => kv_exports,
  kvm: () => multi_exports,
  ns: () => namespace_exports
});
module.exports = __toCommonJS(src_exports);

// src/config.ts
var BASE_ENDPOINT = "https://api.cloudflare.com/client/v4";
var KV_ENDPOINT = `${BASE_ENDPOINT}/accounts/{account_id}/storage/kv/namespaces`;
var NAMESPACE_ENDPOINT = `${KV_ENDPOINT}/{namespace_id}`;
var KV_PAIRS_ENDPOINT = `${NAMESPACE_ENDPOINT}/values/{key_name}`;
var KV_PAIRS_BULK_ENDPOINT = `${NAMESPACE_ENDPOINT}/bulk`;
var ENDPOINTS = {
  NAMESPACE: {
    LIST: `${KV_ENDPOINT}`,
    CREATE: `${KV_ENDPOINT}`,
    REMOVE: `${NAMESPACE_ENDPOINT}`,
    GET: `${NAMESPACE_ENDPOINT}`,
    RENAME: `${NAMESPACE_ENDPOINT}`
  },
  KV_PAIR: {
    LIST: `${NAMESPACE_ENDPOINT}/keys`,
    METADATA: `${NAMESPACE_ENDPOINT}/metadata/{key_name}`,
    MULTI: {
      REMOVE: `${KV_PAIRS_BULK_ENDPOINT}`,
      WRITE: `${KV_PAIRS_BULK_ENDPOINT}`
    },
    REMOVE: `${KV_PAIRS_ENDPOINT}`,
    READ: `${KV_PAIRS_ENDPOINT}`,
    WRITE: `${KV_PAIRS_ENDPOINT}`
  }
};
var INIT_STATE = {
  accountId: "",
  authToken: "",
  namespaceId: ""
};

// src/kv/index.ts
var kv_exports = {};
__export(kv_exports, {
  list: () => list_default,
  metadata: () => metadata_default,
  read: () => read_default,
  remove: () => remove_default,
  write: () => write_default
});

// src/util.ts
var loadVariables = ({
  accountId,
  authToken,
  namespaceId
}) => {
  const state = {
    accountId: "",
    authToken: "",
    namespaceId: ""
  };
  state.accountId = accountId || INIT_STATE.accountId;
  state.authToken = authToken || INIT_STATE.authToken;
  state.namespaceId = namespaceId || INIT_STATE.namespaceId;
  return state;
};

// src/kv/read.ts
var read_default = async ({
  accountId,
  authToken,
  namespaceId,
  keyName
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.KV_PAIR.READ.replace("{account_id}", vars.accountId).replace("{namespace_id}", vars.namespaceId).replace("{key_name}", keyName);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    }
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.text();
  return { status, statusText, data };
};

// src/kv/write.ts
var write_default = async ({
  accountId,
  authToken,
  namespaceId,
  keyName,
  metadata,
  value
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.KV_PAIR.WRITE.replace("{account_id}", vars.accountId).replace("{namespace_id}", vars.namespaceId).replace("{key_name}", keyName);
  const body = new FormData();
  body.append("metadata", JSON.stringify(metadata));
  body.append("value", value);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${vars.authToken}`
    },
    body
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/kv/remove.ts
var remove_default = async ({
  accountId,
  authToken,
  namespaceId,
  keyName
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.KV_PAIR.REMOVE.replace("{account_id}", vars.accountId).replace("{namespace_id}", vars.namespaceId).replace("{key_name}", keyName);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    }
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/kv/list.ts
var list_default = async ({
  accountId,
  authToken,
  namespaceId,
  cursor,
  limit,
  prefix
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const query = [];
  if (cursor) query.push(`cursor=${cursor}`);
  if (limit) query.push(`limit=${limit}`);
  if (prefix) query.push(`prefix=${prefix}`);
  const queryString = query.length === 0 ? "" : "?" + query.join("&");
  const url = ENDPOINTS.KV_PAIR.LIST.replace("{account_id}", vars.accountId).replace(
    "{namespace_id}",
    vars.namespaceId
  ) + queryString;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    }
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/kv/metadata.ts
var metadata_default = async ({
  accountId,
  authToken,
  namespaceId,
  keyName
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.KV_PAIR.METADATA.replace("{account_id}", vars.accountId).replace("{namespace_id}", vars.namespaceId).replace("{key_name}", keyName);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    }
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/kv/multi/index.ts
var multi_exports = {};
__export(multi_exports, {
  remove: () => remove_default2,
  write: () => write_default2
});

// src/kv/multi/write.ts
var write_default2 = async ({
  accountId,
  authToken,
  namespaceId,
  body
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.KV_PAIR.MULTI.WRITE.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/kv/multi/remove.ts
var remove_default2 = async ({
  accountId,
  authToken,
  namespaceId,
  body
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.KV_PAIR.MULTI.REMOVE.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/namespace/index.ts
var namespace_exports = {};
__export(namespace_exports, {
  create: () => create_default,
  get: () => get_default,
  list: () => list_default2,
  remove: () => remove_default3,
  rename: () => rename_default
});

// src/namespace/create.ts
var create_default = async ({
  accountId,
  authToken,
  title
}) => {
  const vars = loadVariables({
    accountId,
    authToken
  });
  const url = ENDPOINTS.NAMESPACE.CREATE.replace(
    "{account_id}",
    vars.accountId
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/namespace/get.ts
var get_default = async ({
  accountId,
  authToken,
  namespaceId
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.NAMESPACE.GET.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    }
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/namespace/list.ts
var list_default2 = async ({
  accountId,
  authToken,
  direction,
  order,
  page,
  perPage
}) => {
  const vars = loadVariables({
    accountId,
    authToken
  });
  const query = [];
  if (direction) query.push(`direction=${direction}`);
  if (order) query.push(`order=${order}`);
  if (page) query.push(`page=${page}`);
  if (perPage) query.push(`per_page=${perPage}`);
  const queryString = query.length === 0 ? "" : "?" + query;
  const url = ENDPOINTS.NAMESPACE.LIST.replace("{account_id}", vars.accountId) + queryString;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    }
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/namespace/remove.ts
var remove_default3 = async ({
  accountId,
  authToken,
  namespaceId
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.NAMESPACE.REMOVE.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    }
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/namespace/rename.ts
var rename_default = async ({
  accountId,
  authToken,
  namespaceId,
  title
}) => {
  const vars = loadVariables({
    accountId,
    authToken,
    namespaceId
  });
  const url = ENDPOINTS.NAMESPACE.RENAME.replace(
    "{account_id}",
    vars.accountId
  ).replace("{namespace_id}", vars.namespaceId);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${vars.authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });
  const status = response.status;
  const statusText = response.statusText;
  const data = await response.json();
  return { status, statusText, data };
};

// src/kv/types.ts
var types_exports = {};

// src/kv/multi/types.ts
var types_exports2 = {};

// src/namespace/types.ts
var types_exports3 = {};

// src/index.ts
var init = ({ accountId, authToken, namespaceId }) => {
  INIT_STATE.accountId = accountId;
  INIT_STATE.authToken = authToken;
  INIT_STATE.namespaceId = namespaceId || "";
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KVMTypes,
  KVTypes,
  NSTypes,
  init,
  kv,
  kvm,
  ns
});
//# sourceMappingURL=index.js.map