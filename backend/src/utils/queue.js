import { connection } from "./redisConnection.js";
import { Queue } from "bullmq";

const reviewQueue = new Queue("review-ml", {
  connection,
});

export default reviewQueue;
