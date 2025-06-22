import pandas as pd
import os
import requests
import re

# === CONFIGURATION ===
EXCEL_FILE = "newData.xlsx"
IMAGE_FOLDER_ROOT = "BikesImagesNew"  # Ensure this exists
API_URL = "https://snehasish001.pythonanywhere.com/api/post-bike/"  # Update if necessary
API_KEY = "9f695216ee90ffc4067b0834cc66c52540f24bb6f2666884ad424edebec34f8b"  # Replace with your actual API key
headers = {
    "Authorization": f"ApiKey {API_KEY}"  # Adjust to match the format expected by your backend
}
# === HELPER FUNCTIONS ===

def normalize_text(text):
    """Normalize text by lowercasing and stripping spaces."""
    return str(text).strip().lower()

# === MODEL FIELD DEFINITIONS ===

char_fields = [
    'name', 'brand', 'max_power', 'max_torque', 'cooling_system',
    'transmission', 'gear_shifting_pattern', 'braking_system',
    'front_brake_type', 'tyre_type', 'rear_brake_type', 'wheel_type',
    'display_system', 'about', 'category', 'suspension'
]

int_fields = [
    'displacement', 'cylinders', 'top_speed', 'weight', 'year'
]

float_fields = [
    'price', 'fuel_tank_capacity', 'mileage_owner_reported'
]

# === LOAD DATA ===
df = pd.read_excel(EXCEL_FILE)

# Normalize column names for easier matching
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

# === PREPROCESS FOLDER NAMES ===
folders = {
    normalize_text(folder): os.path.join(IMAGE_FOLDER_ROOT, folder)
    for folder in os.listdir(IMAGE_FOLDER_ROOT)
    if os.path.isdir(os.path.join(IMAGE_FOLDER_ROOT, folder))
}

# === ITERATE OVER EACH BIKE ===
for index, row in df.iterrows():
    bike_name = str(row.get('name', ''))
    match_key = normalize_text(bike_name)

    if match_key not in folders:
        print(f"[{index}] Skipping {bike_name} — No matching folder found.")
        continue

    image_folder = folders[match_key]

    image_files = sorted([
        os.path.join(image_folder, f)
        for f in os.listdir(image_folder)
        if f.lower().endswith(('.png', '.jpg', '.jpeg'))
    ])[:4]  # Only pick 4 images because your model has image1 to image4

    files = {}
    for i, img_path in enumerate(image_files):
        files[f'image{i+1}'] = open(img_path, 'rb')

    # === CONSTRUCT POST DATA ===
    data = {}

    # Add char fields
    for field in char_fields:
        val = row.get(field, "")
        data[field] = str(val).strip() if pd.notna(val) else ""

    # Add int fields
    for field in int_fields:
        val = row.get(field)
        if field in ['displacement', 'weight', 'top_speed']:
            try:
                match = re.search(r'\d+', str(val))
                data[field] = int(match.group()) if match else 0
            except:
                data[field] = 0
        elif field == 'year':
            try:
                match = re.search(r'\d{4}', str(val).strip())
                data[field] = int(match.group()) if match else 0
            except:
                data[field] = 0
        else:
            try:
                data[field] = int(val) if pd.notna(val) else 0
            except ValueError:
                data[field] = 0

    # Add float fields
    for field in float_fields:
        val = row.get(field)
        try:
            data[field] = float(val) if pd.notna(val) else 0.0
        except ValueError:
            data[field] = 0.0

    # === POST TO API ===
    try:
        print(f"[{index}] Sending bike: {bike_name}", end=" ")
        response = requests.post(API_URL, data=data, files=files, headers=headers)
        print(f"→ Status: {response.status_code}")
        if response.status_code != 201:
            print("Error:", response.text)
    except Exception as e:
        print(f"[{index}] Failed to post {bike_name}: {e}")
    finally:
        for f in files.values():
            f.close()
