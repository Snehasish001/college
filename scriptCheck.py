import pandas as pd
import os

# === CONFIGURATION ===
EXCEL_FILE = "dataset.xlsx"  # your dataset
IMAGE_FOLDER_ROOT = "bike_image_folder"  # your image folders

# === REQUIRED CHAR FIELDS (must be non-empty) ===
required_char_fields = [
    'max_power', 'max_torque', 'cooling_system', 'transmission_type',
    'gear_shifting_pattern', 'braking_system', 'front_brake_type',
    'rear_brake_type', 'wheel_type', 'front_tyre_size', 'rear_tyre_size',
    'tyre_type', 'chassis_type'
]

# === LOAD DATA ===
df = pd.read_excel(EXCEL_FILE)

# Normalize column names
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

# === PREPROCESS FOLDER NAMES ===
# Map folder names to lower case
available_folders = {
    folder.lower(): os.path.join(IMAGE_FOLDER_ROOT, folder)
    for folder in os.listdir(IMAGE_FOLDER_ROOT)
    if os.path.isdir(os.path.join(IMAGE_FOLDER_ROOT, folder))
}

# === CHECK EACH BIKE ===
missing_folder = []
missing_fields = []

l = list()

for index, row in df.iterrows():
    bike_name = str(row.get('name', '')).strip()
    bike_folder_key = bike_name.lower()

    l.append(bike_name)

    # Check folder
    if bike_folder_key not in available_folders:
        missing_folder.append(bike_name)

    # Check required fields
    missing_in_row = [
        field for field in required_char_fields
        if pd.isna(row.get(field)) or str(row.get(field)).strip() == ""
    ]
    if missing_in_row:
        missing_fields.append((bike_name, missing_in_row))

# === REPORT ===
print("\n=== Missing Folders ===")
for bike in missing_folder:
    print("-", bike)

print(f"\nTotal bikes: {len(df)}")
print(f"Bikes with missing folders: {len(missing_folder)}")
print(f"Bikes with missing fields: {len(missing_fields)}")

l.sort()
j = 1
for i in l:
    print(f"{j} - {i}")
    j += 1

def find_duplicates(lst):
    seen = set()
    duplicates = set()
    for item in lst:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    return list(duplicates)

print(find_duplicates(l))
