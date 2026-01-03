import IORedis from "ioredis";

export const connection = new IORedis("redis://default:XhQX2hlqnPPDzXLKAkED7PqRqwcSVdGh@redis-17655.c44.us-east-1-2.ec2.cloud.redislabs.com:17655", {
  maxRetriesPerRequest: null, 
  enableReadyCheck: false,    
});


export default connection