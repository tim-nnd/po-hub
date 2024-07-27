import { z } from "zod";

const Variation = z.object({
    name: z.string(),
    price: z.coerce.number(),
    image_url: z.string(),
})

const CreateProductRequest = z.object({
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  closed_at: z.coerce.date(),
  available_at: z.coerce.date(),
  min_order: z.coerce.number().gt(0, {message: 'Please enter an amount greater than 0'}),
  max_order: z.coerce.number().gt(0, {message: 'Please enter an amount greater than 0'}),
  variations: z.array(Variation),
})

export default CreateProductRequest;