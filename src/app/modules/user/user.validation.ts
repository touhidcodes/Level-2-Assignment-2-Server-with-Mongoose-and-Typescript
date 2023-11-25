import z from "zod";

// Zod schemas
const TFullNameValidation = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  lastName: z.string().min(1).max(20),
});

const TAddressValidation = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const TOrderValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const TUserValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: TFullNameValidation,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: TAddressValidation,
  orders: z.array(TOrderValidation).default([]),
});

export default TUserValidation;
