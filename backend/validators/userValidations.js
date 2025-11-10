import { z } from "zod";
import { DEPARTMENTS } from "../constants/taxonomy.js";

// Roles allowed for clients
export const clientRoleSchema = z.enum(["student", "alumni"]);

// Registration schema
export const registerSchema = z.object({
  userName: z
    .string()
    .min(2, "Username must be at least 2 characters long"),

  email: z
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),

  department: z.enum(DEPARTMENTS, {
    errorMap: () => ({ message: "Invalid department selected" }),
  }),

  // user can only choose 'student' or 'alumni'
  role: clientRoleSchema.optional().default("student"),
});

//  Update profile schema
export const updateProfileSchema = z.object({
  userName: z.string().min(2, "Username must be at least 2 characters").optional(),

  profileImg: z.url("Must be a valid URL").optional(),

  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional(),

  openToWork: z.boolean().optional(),

  interestArea: z
    .array(z.string())
    .max(5, "Maximum 5 interests allowed")
    .optional()
    .default([]),

  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        college: z.string().min(1, "College is required"),
      })
    )
    .optional()
    .default([]),

  department: z.enum(DEPARTMENTS).optional(),

  // still restrict role (only student/alumni)
  role: clientRoleSchema.optional(),
   address: z
    .object({
      pincode: z.string().optional().default(""),
      district: z.string().optional().default(""),
      state: z.string().optional().default(""),
    })
    .optional()
    .default({ pincode: "", district: "", state: "" }),
});
