interface Message {
    code: number;
    message: string;
}
interface Response<T> {
    status: number;
    statusText: string;
    data?: T;
}

interface Read {
    accountId: string;
    authToken: string;
    namespaceId: string;
    keyName: string;
}
declare const _default$b: ({ accountId, authToken, namespaceId, keyName, }: Read) => Promise<Response<any>>;

interface Write$1 {
    accountId: string;
    authToken: string;
    namespaceId: string;
    keyName: string;
    metadata: Record<string, string>;
    value: string;
}
interface WriteResponse$1 {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: {};
}
declare const _default$a: ({ accountId, authToken, namespaceId, keyName, metadata, value, }: Write$1) => Promise<Response<WriteResponse$1>>;

interface Delete$1 {
    accountId: string;
    authToken: string;
    namespaceId: string;
    keyName: string;
}
interface DeleteResponse$1 {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: {};
}
declare const _default$9: ({ accountId, authToken, namespaceId, keyName, }: Delete$1) => Promise<Response<DeleteResponse$1>>;

interface List$1 {
    accountId: string;
    authToken: string;
    namespaceId: string;
    cursor?: string;
    limit?: number;
    prefix?: string;
}
interface ListResponse$1 {
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
declare const _default$8: ({ accountId, authToken, namespaceId, cursor, limit, prefix, }: List$1) => Promise<Response<ListResponse$1>>;

interface Metadata {
    accountId: string;
    authToken: string;
    namespaceId: string;
    keyName: string;
}
interface MetadataResponse {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: Record<string, string>;
}
declare const _default$7: ({ accountId, authToken, namespaceId, keyName, }: Metadata) => Promise<Response<MetadataResponse>>;

declare namespace index$2 {
  export { _default$8 as list, _default$7 as metadata, _default$b as read, _default$9 as remove, _default$a as write };
}

interface WriteKVPair {
    base64?: boolean;
    expiration?: number;
    expiration_ttl?: number;
    key: string;
    value: string;
    metadata?: Record<string, string>;
}
interface Write {
    accountId: string;
    authToken: string;
    namespaceId: string;
    body: WriteKVPair[];
}
interface WriteResponse {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: {};
}
declare const _default$6: ({ accountId, authToken, namespaceId, body, }: Write) => Promise<Response<WriteResponse>>;

interface Delete {
    accountId: string;
    authToken: string;
    namespaceId: string;
    body: string[];
}
interface DeleteResponse {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: {};
}
declare const _default$5: ({ accountId, authToken, namespaceId, body, }: Delete) => Promise<Response<DeleteResponse>>;

declare namespace index$1 {
  export { _default$5 as remove, _default$6 as write };
}

interface Create {
    accountId: string;
    authToken: string;
    title: string;
}
interface CreateResponse {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: {
        id: string;
        supports_url_encoding: boolean;
        title: string;
    };
}
declare const _default$4: ({ accountId, authToken, title, }: Create) => Promise<Response<CreateResponse>>;

interface Get {
    accountId: string;
    authToken: string;
    namespaceId: string;
}
interface GetResponse {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: {
        id: string;
        supports_url_encoding: boolean;
        title: string;
    };
}
declare const _default$3: ({ accountId, authToken, namespaceId, }: Get) => Promise<Response<GetResponse>>;

interface List {
    accountId: string;
    authToken: string;
    direction?: "asc" | "desc";
    order?: "id" | "title";
    page?: number;
    perPage?: number;
}
interface ListResponse {
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
declare const _default$2: ({ accountId, authToken, direction, order, page, perPage, }: List) => Promise<Response<ListResponse>>;

interface Remove {
    accountId: string;
    authToken: string;
    namespaceId: string;
}
interface RemoveResponse {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: {};
}
declare const _default$1: ({ accountId, authToken, namespaceId, }: Remove) => Promise<Response<RemoveResponse>>;

interface Rename {
    accountId: string;
    authToken: string;
    namespaceId: string;
    title: string;
}
interface RenameResponse {
    errors: Message[];
    messages: Message[];
    success: boolean;
    result: {};
}
declare const _default: ({ accountId, authToken, namespaceId, title, }: Rename) => Promise<Response<RenameResponse>>;

declare namespace index {
  export { _default$4 as create, _default$3 as get, _default$2 as list, _default$1 as remove, _default as rename };
}

type types$2_Metadata = Metadata;
type types$2_MetadataResponse = MetadataResponse;
type types$2_Read = Read;
declare namespace types$2 {
  export type { List$1 as List, ListResponse$1 as ListResponse, types$2_Metadata as Metadata, types$2_MetadataResponse as MetadataResponse, types$2_Read as Read, Delete$1 as Remove, DeleteResponse$1 as RemoveResponse, Write$1 as Write, WriteResponse$1 as WriteResponse };
}

type types$1_Write = Write;
type types$1_WriteKVPair = WriteKVPair;
type types$1_WriteResponse = WriteResponse;
declare namespace types$1 {
  export type { Delete as Remove, DeleteResponse as RemoveResponse, types$1_Write as Write, types$1_WriteKVPair as WriteKVPair, types$1_WriteResponse as WriteResponse };
}

type types_Create = Create;
type types_CreateResponse = CreateResponse;
type types_Get = Get;
type types_GetResponse = GetResponse;
type types_List = List;
type types_ListResponse = ListResponse;
type types_Remove = Remove;
type types_RemoveResponse = RemoveResponse;
type types_Rename = Rename;
type types_RenameResponse = RenameResponse;
declare namespace types {
  export type { types_Create as Create, types_CreateResponse as CreateResponse, types_Get as Get, types_GetResponse as GetResponse, types_List as List, types_ListResponse as ListResponse, types_Remove as Remove, types_RemoveResponse as RemoveResponse, types_Rename as Rename, types_RenameResponse as RenameResponse };
}

export { types$1 as KVMTypes, types$2 as KVTypes, types as NSTypes, index$2 as kv, index$1 as kvm, index as ns };
