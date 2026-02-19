import os
import time
import shutil

def run_daemon():
	folder = "tmp"
	number_of_days = 30
	delete_counter = 0
	current_total_files = 0
	day_in_seconds = 86400
	current_directory = os.getcwd()
	os.chdir(folder)
	list_of_files = os.listdir()
	current_time = time.time()

	for i in list_of_files:
		current_total_files += 1
		file_location = os.path.join(os.getcwd(), i)
		file_time = os.stat(file_location).st_mtime

        # remove files that are older than number_of_days
		if(file_time < current_time - day_in_seconds * number_of_days):
			delete_counter += 1
			if os.path.isfile(file_location):
				os.remove(file_location)

	os.chdir('../')
	print("Current total files: " + str(current_total_files))
	print("Total deleted files: " + str(delete_counter))

if __name__ == '__main__':
    run_daemon()
