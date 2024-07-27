import { z } from "zod";

const Variation = z.object({
    variation_id: z.string(),
    amount: z.coerce.number(),
})

const CreateOrderRequest = z.object({
  product_id: z.string(),
  variations: z.array(Variation),
})

export default CreateOrderRequest;