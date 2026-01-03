import { prisma } from "./prisma";

export interface Transaction {
  id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  bank: string;
  category: string;
  description?: string;
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

export async function addTransaction(
  transaction: Omit<Transaction, "id" | "createdAt">
) {
  const created = await prisma.transaction.create({
    data: {
      userId: transaction.userId,
      type: transaction.type,
      amount: transaction.amount,
      bank: transaction.bank,
      category: transaction.category,
      description: transaction.description,
      date: new Date(transaction.date),
    },
  });

  return {
    id: created.id,
    userId: created.userId,
    type: created.type,
    amount: created.amount,
    bank: created.bank,
    category: created.category,
    description: created.description || "",
    date: created.date.toISOString(),
    createdAt: created.createdAt.toISOString(),
  };
}

export async function getTransactions(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  return transactions.map((t: any) => ({
    id: t.id,
    userId: t.userId,
    type: t.type,
    amount: t.amount,
    bank: t.bank,
    category: t.category,
    description: t.description || "",
    date: t.date.toISOString(),
    createdAt: t.createdAt.toISOString(),
  }));
}

export async function addAsset(asset: Omit<Asset, "id" | "createdAt">) {
  const created = await prisma.asset.create({
    data: {
      userId: asset.userId,
      name: asset.name,
      bank: asset.bank,
      amount: asset.amount,
    },
  });

  return {
    id: created.id,
    userId: created.userId,
    name: created.name,
    bank: created.bank,
    amount: created.amount,
    createdAt: created.createdAt.toISOString(),
  };
}

export async function getAssets(userId: string) {
  const assets = await prisma.asset.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return assets.map((a: any) => ({
    id: a.id,
    userId: a.userId,
    name: a.name,
    bank: a.bank,
    amount: a.amount,
    createdAt: a.createdAt.toISOString(),
  }));
}

export async function deleteAsset(assetId: string, userId: string) {
  await prisma.asset.deleteMany({
    where: {
      id: assetId,
      userId,
    },
  });
}
