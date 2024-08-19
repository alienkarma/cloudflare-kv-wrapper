import * as dotenv from "dotenv";
import { describe, test, expect } from "@jest/globals";
import namespace from "./namespace";
import kv_pair from "./kv_pair";
import kv_pair_multi from "./kv_pair/multi";
import key from "./key";

dotenv.config();

const ACCOUNT_ID = process.env.ACCOUNT_ID ?? "";
const AUTH_TOKEN = process.env.AUTH_TOKEN ?? "";

const randomTitle1 = Math.random().toString(36).substring(8);
const randomTitle2 = Math.random().toString(36).substring(6);

let namespaceId: string = "";

describe("Testing CF KV APIs", () => {
  test("namespace: create", async () => {
    const response = await namespace.create({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      title: randomTitle1,
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.data?.result.title).toBe(randomTitle1);
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }

    namespaceId = response.data?.result.id ?? "";
  });
  test("namespace: get", async () => {
    const response = await namespace.get({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.data?.result.title).toBe(randomTitle1);
      expect(response.data?.result.id).toBe(namespaceId);
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("namespace: list", async () => {
    const response = await namespace.list({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("namespace: rename", async () => {
    const response = await namespace.rename({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
      title: randomTitle2,
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("kv_pairs/multi: write", async () => {
    const response = await kv_pair_multi.write({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
      body: [
        {
          key: "key1",
          value: "value1",
        },
        {
          key: "key2",
          value: "value2",
        },
      ],
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("kv_pairs/multi: remove", async () => {
    const response = await kv_pair_multi.remove({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
      body: ["key1", "key2"],
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("kv_pairs: write", async () => {
    const response = await kv_pair.write({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
      keyName: "key",
      metadata: {
        a: "b",
      },
      value: "value",
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("kv_pairs: read", async () => {
    const response = await kv_pair.read({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
      keyName: "key",
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.data).toBe("value");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("key: list", async () => {
    const response = await key.list({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.data?.result.map((kv) => kv.name)).toContain("key");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("key: metadata", async () => {
    const response = await key.metadata({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
      keyName: "key",
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.data?.result.a).toBe("b");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("kv_pairs: remove", async () => {
    const response = await kv_pair.remove({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
      keyName: "key",
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("namespace: remove", async () => {
    const response = await namespace.remove({
      accountId: ACCOUNT_ID,
      authToken: AUTH_TOKEN,
      namespaceId: namespaceId,
    });

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
});