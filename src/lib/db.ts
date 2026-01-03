import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.REDIS_REST_API_URL!,
  token: process.env.REDIS_REST_API_TOKEN!,
});

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

export async function addTransaction(transaction: Omit<Transaction, "id" | "createdAt">) {
  const id = Date.now().toString();
  const data: Transaction = {
    ...transaction,
    id,
    createdAt: new Date().toISOString(),
  };
  await redis.set(`transaction:${id}`, JSON.stringify(data));
  await redis.lpush(`transactions:${transaction.userId}`, id);
  return data;
}

export async function getTransactions(userId: string) {
  const ids = await redis.lrange(`transactions:${userId}`, 0, -1);
  const transactions = await Promise.all(
    ids.map(async (id) => {
      const data = await redis.get(`transaction:${id}`);
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
  await redis.set(`asset:${id}`, JSON.stringify(data));
  await redis.lpush(`assets:${asset.userId}`, id);
  return data;
}

export async function getAssets(userId: string) {
  const ids = await redis.lrange(`assets:${userId}`, 0, -1);
  const assets = await Promise.all(
    ids.map(async (id) => {
      const data = await redis.get(`asset:${id}`);
      return data ? JSON.parse(data as string) : null;
    })
  );
  return assets.filter(Boolean) as Asset[];
}

export async function deleteAsset(assetId: string, userId: string) {
  await redis.del(`asset:${assetId}`);
  await redis.lrem(`assets:${userId}`, 0, assetId);
}
