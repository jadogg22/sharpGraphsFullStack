from flask import Flask, jsonify, render_template, send_from_directory
from flask_cors import CORS
from sqlalchemy import create_engine
import sqlite3

from data import getCount
from getCount import getCountWeek
from datetime import datetime
import getFromDB

app = Flask(__name__)
CORS(app) 

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/assets/index-dPeNwl7T.js')
# def indexjs():
#     return render_template('/assets/index-dPeNwl7T.js')

# @app.route('/assets/index-RykgJ-UG.css')
# def indexcss():
#     return render_template('/assets/index-RykgJ-UG.css')

@app.route('/assets/<path:filename>')
def serve_static(filename):
    if filename.endswith('.js'):
        mimetype = 'application/javascript'
    else:
        mimetype = None
    return send_from_directory("templates/assets/", filename, mimetype=mimetype)




def parse_week_string(week_str):
    year, week = map(int, week_str.split(' W'))
    return year, week

def weeks_difference(week_str1, week_str2):
    year1, week1 = parse_week_string(week_str1)
    year2, week2 = parse_week_string(week_str2)

    date1 = datetime.strptime(f"{year1}-W{week1}-1", "%Y-W%W-%w")
    date2 = datetime.strptime(f"{year2}-W{week2}-1", "%Y-W%W-%w")

    return abs((date2 - date1).days) // 7

def within_twelve_weeks(week_str1, week_str2):
    difference = weeks_difference(week_str1, week_str2)
    return difference <= 12

def week_to_month(week_str):
    year, week_num = map(int, week_str.split(' W'))

    # Calculate the first day of the week
    first_day_of_week = datetime.strptime(f"{year}-W{week_num}-1", "%Y-W%W-%w")

    # Format the date as "Year MMonth" (e.g., "2023 M10")
    month_format = first_day_of_week.strftime("%Y M%m")

    return month_format




@app.route('/getData/<start_date>/<end_date>', methods=['GET'])
def get_data(start_date, end_date):
    # You can now use start_date and end_date in your logic to fetch data
    # For simplicity, this example returns a subset of the dummy data
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    if within_twelve_weeks(start_date, end_date):
        # get Data in the weekly format
        result = getFromDB.milesReportByWeek(cursor, start_date, end_date)
        return jsonify(result)
    else:
        #get Data in the Monthy format
        #return the whole month to get a way from wierd data
        start = week_to_month(start_date)
        end = week_to_month(end_date)
        result = getFromDB.milesReportByMonth(cursor, start, end)
        return jsonify(result)

@app.route('/getRevenue/<start_date>/<end_date>', methods=['GET'])
def get_Revenue(start_date, end_date):
    # You can now use start_date and end_date in your logic to fetch data
    # For simplicity, this example returns a subset of the dummy data
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()

    dbData = getFromDB.getRevenueByDates(cursor, start_date, end_date)
    return jsonify(dbData)

    if within_twelve_weeks(start_date, end_date):
        # get Data in the weekly format
        result = getFromDB.milesReportByWeek(cursor, start_date, end_date)
        return jsonify(result)
    else:
        #get Data in the Monthy format
        #return the whole month to get a way from wierd data
        start = week_to_month(start_date)
        end = week_to_month(end_date)
        result = getFromDB.milesReportByMonth(cursor, start, end)
        return jsonify(result)
    
    # @app.route('/data')
# def index():
#     return jsonify(getCount())

# @app.route('/WeekDayCount')
# def weekdayCount():
#     data = getCountWeek()
#     return jsonify(data)


# @app.route('/getMonthlyRevenue')
# def getWeeklyRevenueFromMonth():
#     conn = sqlite3.connect("test.db")
#     cursor = conn.cursor()
#     data = getFromDB.getWeeklyRevenueFromMonth(cursor, "2023 M10")
#     conn.close()
#     return jsonify(data)

# @app.route("/getMonthlyMiles")
# def getMonthlyMiles():
#     conn = sqlite3.connect("test.db")
#     cursor = conn.cursor()
#     data = getFromDB.monthlyMilesReport(cursor, "2023 M10")
#     conn.close()
#     return jsonify(data)

# @app.route("/getDestinations")
# def getMonthlyDestinations():
#     conn = sqlite3.connect("test.db")
#     cursor = conn.cursor()
#     data = getFromDB.getDestinationCountsFromUtahByMonth(cursor, "2023 M10")
#     conn.close()
#     return jsonify(data)

# @app.route("/getYearlyRevenue")
# def getYearlyRevenueByMonth():
#     conn = sqlite3.connect("test.db")
#     cursor = conn.cursor()
#     data = getFromDB.getYearlyRevenueByMonth(cursor)
#     conn.close()
#     return jsonify(data)

# @app.route("/getMonthlyRevByUser")
# def getMonthlyRevByUser():
#     conn = sqlite3.connect("test.db")
#     cursor = conn.cursor()
#     data = getFromDB.getMonthlyRevenueByManager(cursor)
#     conn.close()
#     return jsonify(data)

# @app.route("/getRevByCode")
# def getRevByCode():
#     conn = sqlite3.connect("test.db")
#     cursor = conn.cursor()
#     data = getFromDB.getRevByCode(cursor)
#     conn.close()
#     return jsonify(data)
    



if __name__ == '__main__':
    app.run(debug=True)