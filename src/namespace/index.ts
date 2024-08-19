import create from "./create";
import get from "./get";
import list from "./list";
import remove from "./remove";
import rename from "./rename";

import type { Create, CreateResponse } from "./create";
import type { Get, GetResponse } from "./get";
import type { List, ListResponse } from "./list";
import type { Remove, RemoveResponse } from "./remove";
import type { Rename, RenameResponse } from "./rename";

export default { create, get, list, remove, rename };

export type {
  Create,
  CreateResponse,
  Get,
  GetResponse,
  List,
  ListResponse,
  Remove,
  RemoveResponse,
  Rename,
  RenameResponse,
};
