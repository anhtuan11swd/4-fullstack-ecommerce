import "dotenv/config";
import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("Đã kết nối Redis:", redis.options.host);
});

redis.on("error", (error) => {
  console.error("Lỗi kết nối Redis:", error.message);
});

export default redis;
