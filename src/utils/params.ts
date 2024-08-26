import { z as zod } from "zod";

export const pageParam = zod.coerce.number().int().positive().catch(1);
export const limitParam = zod.coerce.number().int().positive().catch(10);
export const orderParam = zod.enum(["asc", "desc"]).catch("asc");
export const booleanParam = zod.enum(["true", "false"]).nullable().catch(null);
export const enumParam = (enums: [string, ...string[]]) =>
	zod.enum(enums).catch(enums[0]);
