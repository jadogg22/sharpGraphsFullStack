import sqlite3
import pandas as pd
import sys

from datetime import datetime

import warnings

# Suppress openpyxl warning about default style
warnings.simplefilter("ignore", UserWarning)

def verifyPath(filePath):
    if filePath == None:
        print("No file path given")
        return False
    # check to see if file is an excel file
    if filePath[-4:] != "xlsx":
        print("File is not an excel file")
        return False
    # check to see if file exists
    try:
        file = open(filePath)
    except:
        print(f"File: {filePath} does not exist")
        return False
    return True


def addData(filePath):

    if not verifyPath(filePath):
        return

    df = pd.read_excel(filePath)
    conn = sqlite3.connect("test.db")
    cursor = conn.cursor()

    for index, row in df.iterrows():
        try:
            # Check if the order number already exists in the database
            order_number = row.iloc[1]
            cursor.execute('SELECT COUNT(*) FROM Orders WHERE OrderNumber = ?', (order_number,))
            existing_orders = cursor.fetchone()[0]
            if existing_orders > 0:
                print(f"Order {order_number} already exists in the database")
                continue

            delivery_date_str = None
            if not pd.isnull(
                row.iloc[14]
            ):  # Assuming 'Delivery date' is the 15th column (0-based index)
                delivery_date_str = row.iloc[14].strftime("%m/%d/%Y")

                # Create a dictionary manually from the row data
            row_data = {
                "RevenueCode": row.iloc[0],
                "Order": row.iloc[1],
                "OrderType": row.iloc[2],
                "Freight": row.iloc[3],
                "FuelSurcharge": row.iloc[4],
                "RemainingCharges": row.iloc[5],
                "TotalRevenue": row.iloc[6],
                "BillMiles": row.iloc[7],
                "LoadedMiles": row.iloc[8],
                "EmptyMiles": row.iloc[9],
                "TotalMiles": row.iloc[10],
                "EmptyPercentage": row.iloc[11],
                "RevLoadedMile": row.iloc[12],
                "RevTotalMile": row.iloc[13],
                "DeliveryDate": delivery_date_str,
                "Origin": row.iloc[15],
                "Destination": row.iloc[16],
                "Customer": row.iloc[17],
                "CustomerCategory": row.iloc[18],
                "OperationsUser": row.iloc[19],
                "Billed": row.iloc[20],
                "ControllingParty": row.iloc[21],
                "Commodity": row.iloc[22],
                "TrailerType": row.iloc[23],
                "OriginState": row.iloc[24],
                "DestinationState": row.iloc[25],
                "Week": row.iloc[26],
                "Month": row.iloc[27],
                "Quarter": row.iloc[28],
                "Brokered": row.iloc[29],
            }
            # Insert the row into the Orders table
            cursor.execute(
                "INSERT INTO Orders VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                list(row_data.values()),
            )

        except Exception as e:
            print(f"Error inserting row {index}: {e}")

    # Connect to the database again
    conn.commit()
    conn.close()


if __name__ == "__main__":
    # get file path from user as argument from cli

    # check if provided file path
    if len(sys.argv) == 1:
        print("No file path given")
        exit()
    
    if len(sys.argv) == 2:
        filePath = sys.argv[1]
        addData(filePath)

    # if multiple file paths given then add all of them
    if len(sys.argv) > 2:
        for filePath in sys.argv[1:]:
            addData(filePath)

