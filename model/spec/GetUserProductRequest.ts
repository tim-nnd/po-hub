import { z } from "zod";

const GetUserProductRequest = z.object({
  user_id: z.string(),
})

export default GetUserProductRequest;