import { z } from "zod";

const CreateUserRequest = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  phone_number: z.string(),
})

export default CreateUserRequest;