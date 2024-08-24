import * as dotenv from "dotenv";
import { describe, test, expect } from "@jest/globals";
import { init, kv, kvm, ns } from "./index";

dotenv.config();

const ACCOUNT_ID = process.env.ACCOUNT_ID ?? "";
const AUTH_TOKEN = process.env.AUTH_TOKEN ?? "";

const randomTitle1 = Math.random().toString(36).substring(8);
const randomTitle2 = Math.random().toString(36).substring(6);

let namespaceId: string = "";

init({
  accountId: ACCOUNT_ID,
  authToken: AUTH_TOKEN,
});

describe("Testing CF KV APIs", () => {
  test("namespace: create", async () => {
    const response = await ns.create({
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
    const response = await ns.get({
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
    const response = await ns.list({});

    try {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
    } catch (error) {
      console.error(response.data?.errors);
      throw error;
    }
  });
  test("namespace: rename", async () => {
    const response = await ns.rename({
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
    const response = await kvm.write({
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
    const response = await kvm.remove({
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
    const response = await kv.write({
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
    const response = await kv.read({
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
  test("kv_pairs: list", async () => {
    const response = await kv.list({
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
  test("kv_pairs: metadata", async () => {
    const response = await kv.metadata({
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
    const response = await kv.remove({
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
    const response = await ns.remove({
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
