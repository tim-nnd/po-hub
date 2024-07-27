import { z } from "zod";

const GetUserProductRequest = z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  state: z.enum(["AVAILABLE", "CLOSED_ORDER", "CANCELLED", "DELIVERED", "COMPLETED"]),
  closed_at: z.string(),
  available_at: z.string(),
  min_order: z.number(),
  max_order: z.number(),
  seller: z.object({
    id: z.string(),
    name: z.string()
  }),
  order_count: z.number()
}))

export default GetUserProductRequest;