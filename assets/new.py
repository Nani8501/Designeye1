import os

# Path where your files are located
folder_path = 'assets/projects/m/2'

# Get all files in the directory
files = os.listdir(folder_path)

# Sort files (optional, if you need a specific order)
files.sort()

# Loop through the files and rename them
for index, filename in enumerate(files, start=1):
    # Get file extension
    file_extension = os.path.splitext(filename)[1]
    
    # New filename format (e.g., 1.jpg, 2.jpg, etc.)
    new_name = f"{index}{file_extension}"
    
    # Full paths for the old and new file names
    old_file = os.path.join(folder_path, filename)
    new_file = os.path.join(folder_path, new_name)
    
    # Rename the file
    os.rename(old_file, new_file)

print("Files renamed successfully!")
