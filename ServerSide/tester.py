import getFromDB
from connectionPool import ConnectionPool

def main():
    # print(getFromDB.getWeeks()) 

    pool = ConnectionPool(5, "test.db")

    with pool.connection() as connection:
        cursor = connection.cursor()
        #print(getFromDB.monthlyMilesReport(cursor, "2023 W10", "2023 W20"))
        #print(getFromDB.monthToSring("2023 M10"))
        #print(getFromDB.getRevenueByDates(cursor, "2022 W10", "2023 W14"))
        print(getFromDB.getYearlyRevenueByWeeks(cursor))
    
            

if __name__ == "__main__":
    main()