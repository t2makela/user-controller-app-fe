import { z } from "zod";

const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
});

const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export const UserInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: AddressSchema.optional(),
  phone: z.string().min(5),
  website: z.string().url(),
  company: CompanySchema.optional(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;

export const ReducedUserInfoSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email("Please provide a valid email."),
  phone: z.string().min(5),
  website: z.string().url("Please provide a valid website url"),
});

export type ReducedUserInfo = z.infer<typeof ReducedUserInfoSchema>;
