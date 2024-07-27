import { z } from "zod";

const UpdateUserRequest = z.object({
  username: z.string(),
  phone_number: z.string(),
})

export default UpdateUserRequest;