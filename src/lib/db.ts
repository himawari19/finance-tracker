import { kv } from "@vercel/kv";

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
  await kv.set(`transaction:${id}`, data);
  await kv.lpush(`transactions:${transaction.userId}`, id);
  return data;
}

export async function getTransactions(userId: string) {
  const ids = await kv.lrange(`transactions:${userId}`, 0, -1);
  const transactions = await Promise.all(
    ids.map((id) => kv.get(`transaction:${id}`))
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
  await kv.set(`asset:${id}`, data);
  await kv.lpush(`assets:${asset.userId}`, id);
  return data;
}

export async function getAssets(userId: string) {
  const ids = await kv.lrange(`assets:${userId}`, 0, -1);
  const assets = await Promise.all(
    ids.map((id) => kv.get(`asset:${id}`))
  );
  return assets.filter(Boolean) as Asset[];
}

export async function deleteAsset(assetId: string, userId: string) {
  await kv.del(`asset:${assetId}`);
  await kv.lrem(`assets:${userId}`, 0, assetId);
}
