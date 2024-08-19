import read from "./read";
import write from "./write";
import remove from "./delete";

import type { Read } from "./read";
import type { Write, WriteResponse } from "./write";
import type {
  Delete as Remove,
  DeleteResponse as RemoveResponse,
} from "./delete";

export default {
  read,
  write,
  remove,
};

export type { Read, Write, WriteResponse, Remove, RemoveResponse };
