import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./prisma/client";
import { Pool } from "pg";
import { databaseUrl } from "../config";

const pool = new Pool({ connectionString: databaseUrl });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;
