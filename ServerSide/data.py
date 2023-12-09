import pandas as pd

from datetime import datetime
from datetime import timedelta


df = pd.read_excel('dataFile.xlsx')

def getDayOfWeek(date):
    date_str = str(date)
    dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
    return dt.strftime("%A")

def getCount():
    return {"day": "Monday", "count": 200}

def getMiles():

# Load excel file
    load_dict = {
    "Sunday": [],
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [], 
    "Thursday": [],
    "Friday": [],
    "Saturday": []
}
    
    for index, row in df.iterrows():
        day = getDayOfWeek(row[14])
        billMiles = row[7]
        loadedMiles = row[8]
        emptyMiles = row[9]

        load = {"billMiles": billMiles, "LoadedMiles": loadedMiles, "emptyMiles": emptyMiles}
        load_dict[day].append(load)

    for day, loads in load_dict.items():
        total_bill_miles = 0
        total_loaded_miles = 0
        total_empty_miles = 0
        total_count = 0

        for load in loads:
            total_bill_miles += load["billMiles"] 
            total_loaded_miles += load["LoadedMiles"]
            total_empty_miles += load["emptyMiles"]
            total_count += 1

        load_dict[day].append({
            "Total Bill Miles": total_bill_miles,
            "Total Loaded Miles": total_loaded_miles,
            "Total Empty Miles": total_empty_miles,
            "Total Count": total_count
        })

    totals_dict = {}

    for day, loads in load_dict.items():
    
        # Get last item which is totals dict
        totals = loads[-1]  
    
        totals_dict[day] = {
            "Total Bill Miles": totals["Total Bill Miles"],
            "Total Loaded Miles": totals["Total Loaded Miles"],
            "Total Empty Miles": totals["Total Empty Miles"], 
            "Total Count": totals["Total Count"]
        }

    return totals_dict





   




# View columns 
print(df.columns)

getCount()

