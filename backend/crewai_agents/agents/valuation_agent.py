from crewai import Agent
from backend.tools.mysql_tool import execute_query


def _evaluate(_: dict):
    rows = execute_query(
        "SELECT id, address, price, size_sf, units, acres FROM properties",
        fetch=True,
    )
    evaluations = []
    for row in rows:
        id_, address, price, size_sf, units, acres = row
        ppsf = float(price) / float(size_sf) if size_sf else None
        ppu = float(price) / float(units) if units else None
        ppa = float(price) / float(acres) if acres else None
        eval_data = {
            "id": id_,
            "address": address,
            "price_per_sf": ppsf,
            "price_per_unit": ppu,
            "price_per_acre": ppa,
        }
        if ppsf and ppsf < 100:
            eval_data["underpriced"] = True
        evaluations.append(eval_data)
    return evaluations


valuation_agent = Agent(name="valuation_agent", run=_evaluate)
