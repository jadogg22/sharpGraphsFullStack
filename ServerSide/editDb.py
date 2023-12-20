import sqlite3
conn = sqlite3.connect("test.db")
cursor = conn.cursor()
print("starting")
test1 = conn.execute('PRAGMA index_info(order_number_idx)') 
test2 = conn.execute('PRAGMA index_list(Orders)')
print(test1)

print(test2)
print("finished")
conn.commit()
conn.close()