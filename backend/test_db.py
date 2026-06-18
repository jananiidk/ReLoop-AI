from database.db import get_connection

conn = get_connection()

print("Connected Successfully!")

conn.close()