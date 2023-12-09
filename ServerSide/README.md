# Sharp Graphs
At my work we have a lot of data! The problem is we don't really have a great way to store/view it. On some of my first weeks there I noticed this and knew there is a much better way at doing this! I've come a long way before I started pushing my stuff to github but this is a start.

## The DataBase
So i'm really new to this whole database thing, I have worked on a couple django projects before and they all had simple DataBase structures with not that much data. They were all hosted locally in the same folder as the code. For now this seems **fine** but who knows if it really is. I have a feeling that this will be a problem in the future but for now it works.

## the code

I have a couple of different files in this project that i'm going to go over here.
1. CreateDB.py
2. addToDB.py
3. addFolderToDB.py
4. getFromDB.py

### CreateDB.py

This was my first step intThis was my first step into really creating a database. really its pretty simple, I just noted what data fields there were in the exel sheets and made and orders table for those values. Really nothing to fancy here. used pythons squlite3 library to do this. Basically just write sql commands in python, mostly just a build tool.

### addToDB.py

This code is probably what took me the longest to write. When it comes down to it, it is a cli application that takes in a filename and as a path and then adds all of the data from that file into the database. This was a lot harder than it sounds. I had to make sure that the data was in the correct format and that it was being added to the correct table. I also had to make sure that the data was being added to the correct row.

#### How to use

```bash
python3 addToDB.py <filename>
```
if any errors occur look at the following help realated to find the error.

I think it kind of looks bad ngl, but I've added many "failsafes" into the code that we will look at here. The first one is verifying the path. this code is fairly simple and it checks for 3 things. First it checks to see if the path is none, then it checks to see if the file is an excel file, and then it checks to see if the file exists. If any of these fail then the program will exit. It also gives feed  back to the user on what went wrong.
```python 
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
```


Another one of the failsafes that I added was checking if the order was already in the data base. this was done by doing a query to the database to see if the order number already exists. if it does then it will skip that order and move on to the next one. This was done by using the following code.

```python
cursor.execute('SELECT COUNT(*) FROM Orders WHERE OrderNumber = ?', (order_number,))
            existing_orders = cursor.fetchone()[0]
            if existing_orders > 0:
                print(f"Order {order_number} already exists in the database")
                continue

```

One of the last things I wanted to talk about was the way I entered the data into the database. After looking at many exel files and many headaches, I saw that many of the col headers were simimiar, but not the same. So instead of dealing with that I just used the row number to access the information. 
```python
"Week": row.iloc[26],
```

## addFolderToDB.py

This is a simple utility file that relies on addToDB.py. Basically it takes in a folder path and then it goes through all the files in that folder and adds them to the database. It uses a recursive call function that I got from chat gptto go through each folder and get back all the files, then for each file it finds it calls add data, I check if its an excel file there. Probably should fix that. 

## getFromDB.py

Now this is were It gets fun! we can use the data from the database to make graphs and other cool stuff. I'm still working on this part but I have a couple of cool things that I have done. I'm kinda waiting to go back to work inorder to come up with the functions but right now I have a few ways to get all the avaliable weeks. This is were most of the development will likley happen going forward.

### Miles Report

one of the first things that I know would be nice is to see a graph of loaded and empty miles as a double on the same line graph. And also have a tooltip that tells you how many orders there were for that spesific week.

Also I want it to be dynamic, so when too many weeks are selected.. it will switch to monthly bars instead of weekly

### Deleverys to

I want a pie chart where you can select a range and it will give you a pie chart of destinations the trucks went and maybe average revenue per load? 

## additional Graphs!

brainStorming some Ideas for the graphs and valueable data!

### Scatterplot - fuel Surcharge and Revenue

I'm going to need to figure this one out in recharts but a cool trend that I found is that Fuel surcharge and Total revenue are corialted and make a nice line

### line Chart - total Revenu and or average revenu

line charts are easy, and getting this data is simple as well. For each day, add all revenue together and for each day show sum

## More Ideas
1. scatterplot - Freight / total miles
2. Scatterplot - Revenue / total miles
3. barChart    - Destination / revenue and or averageRev
4. barChart    - Best customers, Customer / count of orders or miles or revenue

### Best Customers

While I'm thinking about this I only want one api call when I get the values and I want a switch between Number of orders, totalMiles, and total revenue. 

```python
dict = {
    orders: [{"customer": cust1, "value": 10}, {"customer": cust2, "value":1}],
    totalMiles: [{"customer": cust1, "value": 10}, {"customer": cust2, "value":1}],
    rev: [{"customer": cust1, "value": 10}, {"customer": cust2, "value":1}],
}

```

then we should be able to access the individual values in javascript

```javascript


function App(){
    const [data, setData] = useState()
    const [dataValue, setDataValue] = useState("orders")
    // valid options orders totalMiles rev

    //.... react stuffs ......

    data = data[dataValue]

    dataKey="value"
    dataKey="customer"


}


```









