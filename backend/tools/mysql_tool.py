import mysql.connector
from typing import Iterable, List, Tuple, Optional


DB_CONFIG = {
    "host": "localhost",
    "user": "user",
    "password": "password",
    "database": "real_estate_ai",
}


def _get_conn():
    return mysql.connector.connect(**DB_CONFIG)


def execute_query(query: str, params: Optional[Iterable] = None, fetch: bool = False):
    conn = _get_conn()
    cursor = conn.cursor()
    cursor.execute(query, params or ())
    result = cursor.fetchall() if fetch else None
    conn.commit()
    cursor.close()
    conn.close()
    return result


def insert_many(query: str, rows: List[Tuple]):
    conn = _get_conn()
    cursor = conn.cursor()
    cursor.executemany(query, rows)
    conn.commit()
    cursor.close()
    conn.close()
