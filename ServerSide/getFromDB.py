import sqlite3
from datetime import datetime, timedelta
import math

def monthToSring(monthStr):
    year, month = map(str, monthStr.split(' M'))
    full_month = datetime.strptime(f"{year}-{month}-01", "%Y-%m-%d").strftime("%B")
    return f"{year} {full_month}"

def calculate_empty_miles_percentage(loaded_miles, empty_miles):
    if loaded_miles + empty_miles == 0:
        return 0
    else:
        empty_miles_percentage = (empty_miles / (loaded_miles + empty_miles)) * 100
        return round(empty_miles_percentage, 2)



def getOrdersByDateRange(startDate, endDate):
    cursor.execute('SELECT * FROM Orders WHERE DeliveryDate BETWEEN ? AND ?', (startDate, endDate))
    return cursor.fetchall()

def getOrdersByDate(date):
    cursor.execute('SELECT * FROM Orders WHERE DeliveryDate = ?', (date,))
    return cursor.fetchall()

def getOrdersByWeek(week):
    # week is a string in the format of "2023 W40"
    cursor.execute('SELECT * FROM Orders WHERE Week = ?', (week,))
    return cursor.fetchall()

def getOrdersByMonth(month):
    # month is a string in the format of "2023 M10"
    cursor.execute('SELECT * FROM Orders WHERE Month = ?', (month,))
    return cursor.fetchall()

def getOrdersByQuarter(quarter):
    # quarter is a string in the format of "2023 Q04"
    cursor.execute('SELECT * FROM Orders WHERE Quarter = ?', (quarter,))
    return cursor.fetchall()

def getAvailableWeeks():
    cursor.execute('SELECT DISTINCT Week FROM Orders')
    return cursor.fetchall()

def getAvailableMonths():
    cursor.execute('SELECT DISTINCT Month FROM Orders')
    return cursor.fetchall()

def getAvailableQuarters():
    cursor.execute('SELECT DISTINCT Quarter FROM Orders')
    return cursor.fetchall()

def getAvailableWeeksFromMonth(month):
    query = '''
        SELECT DISTINCT Week FROM Orders
        WHERE Month = ?
    '''
    tuples_list = cursor.execute(query, (month,))
    tuples_list = cursor.fetchall()

    return [t[0] for t in tuples_list]

def getMilesForWeek(cursor, week):
    query = '''
        SELECT 
            SUM(LoadedMiles) as TotalLoadedMiles,
            SUM(EmptyMiles) as TotalEmptyMiles,
            SUM(TotalMiles) as TotalTotalMiles,
            COUNT(*) as TotalOrders
        FROM Orders
        WHERE Week = ?
    '''
    cursor.execute(query, (week,))
    columns = [desc[0] for desc in cursor.description]
    result = cursor.fetchone()

    if result:
        return dict(zip(columns, result))
    else:
        return None


def weekToDateRange(str):
    # weeks is a list of tuples
    #dBWeeks = getAvailableWeeks()

    year, week_number = map(int, str.split(" W"))
    # Assuming the week starts on Sunday
    start_date = datetime.strptime(f"{year}-W{week_number}-0", "%Y-W%W-%w")
    # Assuming the week ends on Saturday
    end_date = start_date + timedelta(days=6)
    return start_date.strftime("%m/%d/%y"), end_date.strftime("%m/%d/%y")

def dateRangeToWeeK(startDate, endDate):
    # weeks is a list of tuples
    #dBWeeks = getAvailableWeeks()

    start_date = datetime.strptime(startDate, "%m/%d/%y")
    end_date = datetime.strptime(endDate, "%m/%d/%y")
    # Assuming the week starts on Sunday
    week_number = start_date.strftime("%W")
    year = start_date.strftime("%Y")
    return f"{year} W{week_number}"

def milesReportByWeek(cursor, start="2023 W40", end="2023 W50"):
    # month is a string in the format of "2023 W40" and "2023 W50"

    #returns loaded miles, empty miles, total miles, and total orders for each week 
    #in the range of startWeek to endWeek

    #get orders for each week in the range
    query = '''
        SELECT
            Week,
            SUM(LoadedMiles) as TotalLoadedMiles,
            SUM(EmptyMiles) as TotalEmptyMiles,
            ROUND(SUM(TotalMiles), 2) as TotalTotalMiles,
            COUNT(*) as TotalOrders
        FROM Orders
        WHERE Week BETWEEN ? AND ?
        GROUP BY Week 
    '''
    cursor.execute(query, (start, end,))
    dbData = cursor.fetchall()


    myData = []
    for row in dbData:
       
        dict = {}
        dict['Name'] = row[0]
        dict['NameStr'] = weekToDateRange(row[0])
        dict["TotalLoadedMiles"] = math.ceil(row[1] / 1000)
        dict['TotalEmptyMiles'] = math.ceil(row[2] / 1000)
        dict['TotalTotalMiles'] = math.ceil(row[3] / 1000)
        dict['TotalActMiles'] = row[3]
        dict['perEmpty'] = calculate_empty_miles_percentage(row[1], row[2])
        dict['Total Orders'] = row[4] 
         
        myData.append(dict)

    return myData

def milesReportByMonth(cursor, start="2023 W40", end="2023 W50"):
    # month is a string in the format of "2023 W40" and "2023 W50"

    #returns loaded miles, empty miles, total miles, and total orders for each week 
    #in the range of startWeek to endWeek

    #get orders for each week in the range


    query = '''
        SELECT
            Month,
            SUM(LoadedMiles) as TotalLoadedMiles,
            SUM(EmptyMiles) as TotalEmptyMiles,
            ROUND(SUM(TotalMiles), 2) as TotalTotalMiles,
            COUNT(*) as TotalOrders
        FROM Orders
        WHERE Month BETWEEN ? AND ?
        GROUP BY Month 
    '''
    cursor.execute(query, (start, end,))
    dbData = cursor.fetchall()


    myData = []
    for row in dbData:
       
        dict = {}
        dict['Name'] = row[0]
        dict['NameStr'] = monthToSring(row[0])
        dict["TotalLoadedMiles"] = math.ceil(row[1] / 1000)
        dict['TotalEmptyMiles'] = math.ceil(row[2] / 1000)
        dict['TotalTotalMiles'] = math.ceil(row[3] / 1000)
        dict['perEmpty'] = calculate_empty_miles_percentage(row[1], row[2])
        dict['TotalActMiles'] = row[3]
        dict['Total Orders'] = row[4] 
         
        myData.append(dict)

    return myData
 

def getDestinationCountsFromUtahByMonth(cursor, month):
    # returns a list of dictionarys for each destination state
    #[{'Destination': 'AZ', 'DestinationCount': 1, 'avgRev': 5.0}]
    query = '''
        SELECT DestinationState, COUNT(*) as DestinationCount, 
            ROUND(AVG(RevTotalMile), 2) as AvgMiles
        FROM Orders
        WHERE OriginState = 'UT' AND Month = ?
        GROUP BY DestinationState 
    '''
    cursor.execute(query, (month,))
    dbData = cursor.fetchall()

    myData = []

    for row in dbData:
        dict = {}
        dict['Destination'] = row[0]
        dict['DestinationCount'] = row[1]
        dict['avgRev'] = row[2]
        myData.append(dict)

    sorted_data = sorted(myData, key=lambda x: x["DestinationCount"], reverse=True)

    # Take the top 5 destinations
    top_5_destinations = sorted_data[:5]

    # Sum the "DestinationCount" and "avgRev" for the remaining destinations
    mega_destination = {
        "Destination": "Mega Destination",
        "DestinationCount": sum(entry["DestinationCount"] for entry in sorted_data[5:]),
        "avgRev": sum(entry["avgRev"] for entry in sorted_data[5:]) / (len(sorted_data) - 5)
    }

    # Combine the top 5 destinations and the mega destination
    result = top_5_destinations + [mega_destination]

    return result

def getWeeklyRevenueByDay(week):
    # returns the total revenue for the week by delivery date
    query = '''
        SELECT DeliveryDate, SUM(TotalRevenue) as TotalRevenue
        FROM Orders
        WHERE Week = ?
        GROUP BY DeliveryDate
    '''
    cursor.execute(query, (week,))
    dbData = cursor.fetchall()

    data = []
    for date in dbData:
        dict = {}
        dict['DeliveryDate'] = date[0]
        dict['TotalRevenue'] = date[1]
        data.append(dict)
    return data

def getWeeklyRevenue(week):
    #returns the sum of the revenue for the week
  
    query = '''
        SELECT ROUND(SUM(TotalRevenue), 2) as TotalRevenue
        FROM Orders
        WHERE Week = ?
    '''
    cursor.execute(query, (week,))
    return cursor.fetchone()[0]

def getWeeklyRevenueFromMonth(cursor, month):
    query ='''
        SELECT Week, ROUND(SUM(totalRevenue), 2) as TotalRevenue
        FROM Orders
        WHERE Month = ?
        GROUP BY Week
    '''
    cursor.execute(query, (month,))
    DBData = cursor.fetchall()
    data = []
    for week in DBData:
        dict = {}
        dict['Week'] = week[0]
        dict['WeekStr'] = weekToDateRange(week[0])
        dict['RevenueActual'] = math.ceil(week[1])
        dict['Revenue'] = math.ceil(week[1] / 1000)
        data.append(dict)   
    return data

def getYearlyRevenueByMonth(cursor, year="2023"):
    query = '''
        SELECT Month, SUM(totalRevenue) AS totalRevenue
        FROM Orders
        WHERE SUBSTRING(quarter, 1, 4) = ? 
        GROUP BY Month;

    '''
    cursor.execute(query, (year,))
    dBData = cursor.fetchall()
    data = []
    for month in dBData:
        dic = {}
        dic['Month'] = month[0]
        dic['RevenueActual'] = math.ceil(month[1])
        dic['Revenue'] = math.ceil(month[1] / 1000)
        data.append(dic)
    return data


def getRevByCode(cursor, month="2023 M10"):
    pass
    query = '''
    SELECT Month, ROUND(SUM(totalRevenue), 2) as TotalRevenue, RevenueCode, COUNT(*)
    FROM Orders 
    WHERE Month = ?
    GROUP BY RevenueCode
    '''

    cursor.execute(query, (month,))
    dbData = cursor.fetchall()
    data = []
    for code in dbData:
        dict = {}
        dict['month'] = code[0]
        dict['revenue'] = code[1]
        dict['code'] = code[2]
        dict['count'] = code[3]
        data.append(dict)
    return data

def getRevenueByDates(cursor, startDate, endDate):
    # returns the total revenue for the month
    query = '''
        SELECT
            Week,
            ROUND(SUM(TotalRevenue), 2) as TotalRevenue
        FROM Orders
        WHERE Week BETWEEN ? AND ?
        GROUP BY Week 
    '''

    cursor.execute(query, (startDate, endDate,))
    dbData =  cursor.fetchall()

    myData = []
    for row in dbData:
       
        dict = {}
        dict['Name'] = row[0]
        dict['NameStr'] = weekToDateRange(row[0])
        dict['Revenue'] = math.ceil(row[1]/1000)
        dict['RevenueAct'] = row[1]
        
         
        myData.append(dict)

    return myData

def getYearlyRevenueByWeeks(cursor):
    data = []

    years = ["2021", "2022", "2023"]

    for year in years:
        yearlyData = getRevenueByDates(cursor, f"{year} W01", f"{year} W52")

        for weekData in yearlyData:
            week = weekData['Name'][-3:]  # Extract the last three characters from the 'Name' field

            # Check if the week already exists in the result array
            existing_week = next((item for item in data if item['Name'] == week), None)

            if existing_week:
                # If the week already exists, update the data for the specific year
                existing_week[f"{year} Revenue"] = weekData['Revenue']
                existing_week[f"{year} RevenueAct"] = weekData['RevenueAct']
            else:
                # If the week doesn't exist, add a new entry for the week
                new_week_entry = {
                    'Name': week,
                    f"{year} Revenue": weekData['Revenue'],
                    f"{year} RevenueAct": weekData['RevenueAct'],
                }
                data.append(new_week_entry)

    return data









        



    







