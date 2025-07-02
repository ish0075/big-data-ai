from crewai import Crew, Task
import os
import sys

CURRENT_DIR = os.path.dirname(__file__)
sys.path.append(os.path.abspath(os.path.join(CURRENT_DIR, '..')))

from agents.database_agent import database_agent
from agents.valuation_agent import valuation_agent


def main(csv_file=None):
    tasks = [
        Task(
            description="Ingest CSV files and update the database",
            expected_output="Number of records inserted",
            agent=database_agent,
            params={"file": csv_file} if csv_file else {},
        ),
        Task(
            description="Calculate price per SF/unit/acre and flag underpriced listings.",
            expected_output="List of evaluations with metric breakdowns.",
            agent=valuation_agent,
        ),
    ]
    Crew(name="data_pipeline", tasks=tasks).kickoff()


if __name__ == "__main__":
    csv = sys.argv[1] if len(sys.argv) > 1 else None
    main(csv)
