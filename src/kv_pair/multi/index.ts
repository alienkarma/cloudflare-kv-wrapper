import write from "./write";
import remove from "./delete";

import type { WriteKVPair, Write, WriteResponse } from "./write";
import type {
  Delete as Remove,
  DeleteResponse as RemoveResponse,
} from "./delete";

export default {
  write,
  remove,
};

export type { WriteKVPair, Write, WriteResponse, Remove, RemoveResponse };
