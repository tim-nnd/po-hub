import { z } from "zod";

const GetProductFeedRequest = z.object({
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
  }),
})

export default GetProductFeedRequest;