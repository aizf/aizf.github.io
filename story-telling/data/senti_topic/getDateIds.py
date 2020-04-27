import os
import json
files = os.listdir("./topic0")
dateIds = [file.replace("T", "").replace(".json", "") for file in files]
with open("./dateIds.json", "w") as f:
    json.dump(dateIds, f)
