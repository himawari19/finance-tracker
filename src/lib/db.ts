import { Redis } from "@upstash/redis";

// Create Redis client only if REDIS_URL is available
let redis: Redis | null = null;

try {
  if (process.env.REDIS_URL) {
    redis = Redis.fromEnv();
  }
} catch (error) {
  console.warn("Redis initialization failed, using in-memory storage:", error);
  redis = null;
}

// In-memory storage for development
const dataStore = new Map<string, string>();

export interface Transaction {
  id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  bank: string;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  userId: string;
  name: string;
  bank: string;
  amount: number;
  createdAt: string;
}

async function redisSet(key: string, value: string) {
  if (redis) {
    try {
      await redis.set(key, value);
    } catch (error) {
      console.warn("Redis set failed, using in-memory storage:", error);
      dataStore.set(key, value);
    }
  } else {
    dataStore.set(key, value);
  }
}

async function redisGet(key: string) {
  if (redis) {
    try {
      return await redis.get(key);
    } catch (error) {
      console.warn("Redis get failed, checking in-memory storage:", error);
      return dataStore.get(key);
    }
  } else {
    return dataStore.get(key);
  }
}

async function redisDel(key: string) {
  if (redis) {
    try {
      await redis.del(key);
    } catch (error) {
      console.warn("Redis del failed, using in-memory storage:", error);
      dataStore.delete(key);
    }
  } else {
    dataStore.delete(key);
  }
}

async function redisLpush(key: string, value: string) {
  if (redis) {
    try {
      await redis.lpush(key, value);
    } catch (error) {
      console.warn("Redis lpush failed, using in-memory storage:", error);
      const list = dataStore.get(key);
      const arr = list ? JSON.parse(list) : [];
      arr.unshift(value);
      dataStore.set(key, JSON.stringify(arr));
    }
  } else {
    const list = dataStore.get(key);
    const arr = list ? JSON.parse(list) : [];
    arr.unshift(value);
    dataStore.set(key, JSON.stringify(arr));
  }
}

async function redisLrange(key: string, start: number, end: number) {
  if (redis) {
    try {
      return await redis.lrange(key, start, end);
    } catch (error) {
      console.warn("Redis lrange failed, checking in-memory storage:", error);
      const list = dataStore.get(key);
      const arr = list ? JSON.parse(list) : [];
      return arr.slice(start, end === -1 ? undefined : end + 1);
    }
  } else {
    const list = dataStore.get(key);
    const arr = list ? JSON.parse(list) : [];
    return arr.slice(start, end === -1 ? undefined : end + 1);
  }
}

async function redisLrem(key: string, count: number, value: string) {
  if (redis) {
    try {
      await redis.lrem(key, count, value);
    } catch (error) {
      console.warn("Redis lrem failed, using in-memory storage:", error);
      const list = dataStore.get(key);
      const arr = list ? JSON.parse(list) : [];
      const filtered = arr.filter((item: string) => item !== value);
      dataStore.set(key, JSON.stringify(filtered));
    }
  } else {
    const list = dataStore.get(key);
    const arr = list ? JSON.parse(list) : [];
    const filtered = arr.filter((item: string) => item !== value);
    dataStore.set(key, JSON.stringify(filtered));
  }
}

export async function addTransaction(transaction: Omit<Transaction, "id" | "createdAt">) {
  const id = Date.now().toString();
  const data: Transaction = {
    ...transaction,
    id,
    createdAt: new Date().toISOString(),
  };
  await redisSet(`transaction:${id}`, JSON.stringify(data));
  await redisLpush(`transactions:${transaction.userId}`, id);
  return data;
}

export async function getTransactions(userId: string) {
  const ids = (await redisLrange(`transactions:${userId}`, 0, -1)) as string[];
  const transactions = await Promise.all(
    ids.map(async (id) => {
      const data = await redisGet(`transaction:${id}`);
      return data ? JSON.parse(data as string) : null;
    })
  );
  return transactions.filter(Boolean) as Transaction[];
}

export async function addAsset(asset: Omit<Asset, "id" | "createdAt">) {
  const id = Date.now().toString();
  const data: Asset = {
    ...asset,
    id,
    createdAt: new Date().toISOString(),
  };
  await redisSet(`asset:${id}`, JSON.stringify(data));
  await redisLpush(`assets:${asset.userId}`, id);
  return data;
}

export async function getAssets(userId: string) {
  const ids = (await redisLrange(`assets:${userId}`, 0, -1)) as string[];
  const assets = await Promise.all(
    ids.map(async (id) => {
      const data = await redisGet(`asset:${id}`);
      return data ? JSON.parse(data as string) : null;
    })
  );
  return assets.filter(Boolean) as Asset[];
}

export async function deleteAsset(assetId: string, userId: string) {
  await redisDel(`asset:${assetId}`);
  await redisLrem(`assets:${userId}`, 0, assetId);
}
