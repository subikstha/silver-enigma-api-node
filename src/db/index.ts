import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from './schema.ts'
import { env, isProd } from '../../env.ts'
import { remember } from '@epic-web/remember'

const { Pool } = pg

const createPool = () => {
    return new Pool({
        connectionString: env.DATABASE_URL,
    })
}

let client: Pool;

if (isProd()) {
    client = createPool()
} else {
    client = remember('dbPool', () => createPool()) // This is to account for memory leaks during hot reloading, 
}

export const db = drizzle({ client, schema })

export default db


// Note This file initializes the Drizzle ORM with the postgres connection
//  import * as schema from './schema.ts' is used to import the schema from the schema.ts file as an object