import { z } from "zod";

const StandardResponse = z.object({
  status: z.string(),
})

export default StandardResponse;