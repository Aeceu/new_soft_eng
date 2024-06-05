import { z } from "zod";
import { adminLogin, adminSignup } from "../../schema/adminSchema";

export type TAdminLogin = z.infer<typeof adminLogin>;
export type TAdminSignup = z.infer<typeof adminSignup>;
