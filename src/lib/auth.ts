import { Redis } from "@upstash/redis";

// Parse REDIS_URL format: redis://:token@host:port
const redis = Redis.fromEnv();

export const users = {
  wahyu: {
    id: "1",
    name: "Wahyu",
    email: "wahyu@example.com",
    password: "wahyu123",
  },
  nurma: {
    id: "2",
    name: "Nurma",
    email: "nurma@example.com",
    password: "nurma123",
  },
};

export async function authenticate(username: string, password: string) {
  const user = users[username as keyof typeof users];
  if (user && user.password === password) {
    return { id: user.id, name: user.name, email: user.email };
  }
  return null;
}

export async function createSession(userId: string) {
  const token = Math.random().toString(36).substring(2, 15);
  await redis.setex(`session:${token}`, 86400 * 7, userId);
  return token;
}

export async function getSession(token: string) {
  if (!token) return null;
  const userId = await redis.get(`session:${token}`);
  return userId ? { userId: userId as string } : null;
}
