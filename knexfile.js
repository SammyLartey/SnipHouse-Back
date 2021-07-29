// Update with your config settings.
require('dotenv').config();
module.exports = {
    development: {
        client: 'postgresql',
        connection: process.env.PG_URL,

        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './knex/migrations'
        },
        seeds: {
            directory: './knex/seeds'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
