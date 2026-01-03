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

// In-memory session storage for development
const sessionStore = new Map<string, string>();

export async function authenticate(username: string, password: string) {
  const user = users[username as keyof typeof users];
  if (user && user.password === password) {
    return { id: user.id, name: user.name, email: user.email };
  }
  return null;
}

export async function createSession(userId: string) {
  const token = Math.random().toString(36).substring(2, 15);
  
  if (redis) {
    try {
      // Production: use Redis
      await redis.setex(`session:${token}`, 86400 * 7, userId);
    } catch (error) {
      console.warn("Redis setex failed, using in-memory storage:", error);
      sessionStore.set(`session:${token}`, userId);
      setTimeout(() => sessionStore.delete(`session:${token}`), 86400 * 7 * 1000);
    }
  } else {
    // Development: use in-memory storage
    sessionStore.set(`session:${token}`, userId);
    // Auto-expire after 7 days
    setTimeout(() => sessionStore.delete(`session:${token}`), 86400 * 7 * 1000);
  }
  
  return token;
}

export async function getSession(token: string) {
  if (!token) return null;
  
  let userId: string | null = null;
  
  if (redis) {
    try {
      // Production: use Redis
      userId = (await redis.get(`session:${token}`)) as string | null;
    } catch (error) {
      console.warn("Redis get failed, checking in-memory storage:", error);
      userId = sessionStore.get(`session:${token}`) || null;
    }
  } else {
    // Development: use in-memory storage
    userId = sessionStore.get(`session:${token}`) || null;
  }
  
  return userId ? { userId } : null;
}
