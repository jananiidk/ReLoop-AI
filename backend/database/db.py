import psycopg2

DB_CONFIG = {
    "host": "localhost",
    "database": "reloop_ai",
    "user": "postgres",
    "password": "postgres123",
    "port": "5432"
}


def get_connection():
    return psycopg2.connect(**DB_CONFIG)