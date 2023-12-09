import sqlite3

# Connect to SQLite database (creates a new database if it doesn't exist)
conn = sqlite3.connect("test.db")

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Define SQL query to create a table
create_table_query = """
CREATE TABLE IF NOT EXISTS Orders (
    ORDER_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    RevenueCode TEXT,
    OrderNumber INTEGER,
    OrderType TEXT,
    Freight REAL,
    FuelSurcharge REAL,
    RemainingCharges REAL,
    TotalRevenue REAL,
    BillMiles INTEGER,
    LoadedMiles INTEGER,
    EmptyMiles INTEGER,
    TotalMiles INTEGER,
    EmptyPercentage REAL,
    RevLoadedMile REAL,
    RevTotalMile REAL,
    DeliveryDate TEXT,
    Origin TEXT,
    Destination TEXT,
    Customer TEXT,
    CustomerCategory TEXT,
    OperationsUser TEXT,
    Billed TEXT,
    ControllingParty TEXT,
    Commodity TEXT,
    TrailerType TEXT,
    OriginState TEXT,
    DestinationState TEXT,
    Week TEXT,
    Month TEXT,
    Quarter TEXT,
    Brokered TEXT
);
"""

# Execute the query
cursor.execute(create_table_query)

# Commit changes and close the connection
conn.commit()
conn.close()
