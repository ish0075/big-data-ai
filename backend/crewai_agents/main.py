from crewai import Crew, Task
import os
import sys

CURRENT_DIR = os.path.dirname(__file__)
sys.path.append(os.path.abspath(os.path.join(CURRENT_DIR, '..')))

from agents.database_agent import database_agent


def main():
    tasks = [
        Task(
            description="Ingest CSV files and update the database",
            expected_output="Number of records inserted",
            agent=database_agent,
        )
    ]
    Crew(name="data_import", tasks=tasks).kickoff()


if __name__ == "__main__":
    main()
