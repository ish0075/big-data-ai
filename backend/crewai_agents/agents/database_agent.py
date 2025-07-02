from crewai import Agent
import pandas as pd
from backend.tools.mysql_tool import insert_many


def _ingest_csv(params):
    file_path = params.get("file")
    if not file_path:
        print("No file provided")
        return 0
    df = pd.read_csv(file_path)
    query = (
        "INSERT INTO properties(address, price, size_sf, units, acres, asset_type, status) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s)"
    )
    rows = [
        (
            row.get("address"),
            row.get("price"),
            row.get("size_sf"),
            row.get("units"),
            row.get("acres"),
            row.get("asset_type"),
            row.get("status", "active"),
        )
        for _, row in df.iterrows()
    ]
    insert_many(query, rows)
    return len(rows)


database_agent = Agent(
    name="database_agent",
    run=_ingest_csv,
)
