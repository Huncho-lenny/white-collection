#!/usr/bin/env node
/**
 * Applies supabase/migrations/20250630173000_fix_bookings_rls.sql to the remote DB.
 *
 * Usage (pick one):
 *   SUPABASE_DB_URL="postgresql://postgres:PASSWORD@db.tytscdansburphlhyhds.supabase.co:5432/postgres" npm run db:fix-rls
 *   SUPABASE_DB_PASSWORD="your-db-password" npm run db:fix-rls
 *
 * Get the password from Supabase Dashboard → Project Settings → Database.
 */

import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import pg from "pg"

const PROJECT_REF = "tytscdansburphlhyhds"
const MIGRATION = "20250630173000_fix_bookings_rls.sql"

function connectionString() {
  if (process.env.SUPABASE_DB_URL) return process.env.SUPABASE_DB_URL

  const password = process.env.SUPABASE_DB_PASSWORD
  if (!password) {
    console.error(
      "Missing database credentials.\n\n" +
        "Add one of these to your environment, then re-run:\n" +
        "  SUPABASE_DB_PASSWORD=... npm run db:fix-rls\n" +
        "  SUPABASE_DB_URL=postgresql://postgres:...@db." +
        PROJECT_REF +
        ".supabase.co:5432/postgres npm run db:fix-rls\n\n" +
        "Or paste the SQL from supabase/migrations/" +
        MIGRATION +
        " into Supabase Dashboard → SQL Editor."
    )
    process.exit(1)
  }

  const host = process.env.SUPABASE_DB_HOST ?? `db.${PROJECT_REF}.supabase.co`
  const user = process.env.SUPABASE_DB_USER ?? "postgres"
  const port = process.env.SUPABASE_DB_PORT ?? "5432"
  const database = process.env.SUPABASE_DB_NAME ?? "postgres"

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`
}

async function main() {
  const root = dirname(dirname(fileURLToPath(import.meta.url)))
  const sql = readFileSync(join(root, "supabase/migrations", MIGRATION), "utf8")

  const client = new pg.Client({
    connectionString: connectionString(),
    ssl: { rejectUnauthorized: false },
  })

  console.log("Connecting to Supabase Postgres…")
  await client.connect()
  console.log("Applying bookings RLS migration…")
  await client.query(sql)
  await client.end()
  console.log("Done — anon inserts and admin select/update policies are in place.")
}

main().catch((err) => {
  console.error("Failed:", err.message)
  process.exit(1)
})
