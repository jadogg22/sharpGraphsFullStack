import pandas as pd

from datetime import datetime
from datetime import timedelta

df = pd.read_excel('dataFile.xlsx')

def getDayOfWeek(date):
    date_str = str(date)
    dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
    return dt.strftime("%A")

#example data structure out[
# {"day": "Monday", "count": 300},
# {"day": "Tuesday", count": 300}]

data = [
        {"day": "Sunday", "count": 0},
        {"day": "Monday", "count": 0},
        {"day": "Tuesday", "count": 0},
        {"day": "Wednesday", "count": 0},
        {"day": "Thursday", "count": 0},
        {"day": "Friday", "count": 0},
        {"day": "Saturday", "count": 0},
        ]

def getCountWeek():
    for index, row in df.iterrows():
        day = getDayOfWeek(row[14])

        for entry in data:
            if entry["day"] == day:
                entry["count"] += 1
                break
    return data



