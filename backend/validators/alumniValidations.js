import {z} from "zod";
import { DEPARTMENTS } from "../constants/taxonomy.js";

export const upsertAlumniProfileSchema=z.object({
company: z.string().optional().default(""),
jobTitle: z.string().optional().default(""),
  jobArea: z.enum(DEPARTMENTS).optional().default("Other"),
  industry: z.string().optional().default(""),
  yearsOfExperience: z.number().int().min(0).optional().default(0),
  skills: z.array(z.string()).optional().default([]),
  socialMediaLinks: z
    .object({
      linkedIn: z.url().optional().or(z.literal("")).default(""),
      instagram: z.url().optional().or(z.literal("")).default(""),
      other: z.url().optional().or(z.literal("")).default(""),
    })
    .optional()
    .default({ linkedIn: "", instagram: "", other: "" }),
  currentAddress: z
    .object({
      pincode: z.string().optional().default(""),
      district: z.string().optional().default(""),
      state: z.string().optional().default(""),
    })
    .optional()
    .default({ pincode: "", district: "", state: "" }),
  availableForMentorship: z.boolean().optional().default(false),
});