from crewai import Agent
import pandas as pd
from backend.tools.mysql_tool import execute_query


def _ingest_csv(params):
    file_path = params.get("file")
    if not file_path:
        print("No file provided")
        return 0
    df = pd.read_csv(file_path)
    inserted = 0
    for _, row in df.iterrows():
        query = (
            "INSERT INTO properties(address, price, size_sf, units, acres, asset_type, status) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s)"
        )
        values = (
            row.get("address"),
            row.get("price"),
            row.get("size_sf"),
            row.get("units"),
            row.get("acres"),
            row.get("asset_type"),
            row.get("status", "active"),
        )
        execute_query(query, values)
        inserted += 1
    return inserted


database_agent = Agent(
    name="database_agent",
    run=_ingest_csv,
)
