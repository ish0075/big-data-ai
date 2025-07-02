import mysql.connector


def execute_query(query: str, params=None):
    conn = mysql.connector.connect(
        host="localhost",
        user="user",
        password="password",
        database="real_estate_ai",
    )
    cursor = conn.cursor()
    cursor.execute(query, params or ())
    results = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()
    return results
