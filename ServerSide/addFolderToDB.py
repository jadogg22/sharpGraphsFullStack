import sys
import os
from addToDB import addData

def get_all_files_recursively(folder_path):
    all_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            # Create the relative path by joining the root path and file name
            relative_path = os.path.join(root, file)
            all_files.append(relative_path)
    return all_files

# cli application to get folder path from user and add all files in folder to database
if __name__ == "__main__":
    # get folder path from user as argument from cli

    # check if provided folder path
    if len(sys.argv) == 1:
        print("No folder path given")
        exit()

    # if multiple folder paths given then add all of them
    if len(sys.argv) > 2:
        print("Only one folder path allowed")
        exit()
    
    # retrieve all files from folder and add them to database
    if len(sys.argv) == 2:
        folderPath = sys.argv[1]
        relative_paths = get_all_files_recursively(folderPath)

        for file in relative_paths:
            print(f"Adding '{file}' file to DB\n")
            addData(file)