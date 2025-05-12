import os
import pandas as pd

# === CONFIGURATION ===
EXCEL_FILE = "bikes.xlsx"
IMAGE_FOLDER_ROOT = "bike_image_folder"  # folder where all bike folders are present

# === LOAD DATA ===
df = pd.read_excel(EXCEL_FILE)

# Normalize bike names
bike_names = df['name'].dropna().apply(lambda x: str(x).strip().lower()).tolist()

# === GET ALL FOLDERS ===
folder_names = [
    folder for folder in os.listdir(IMAGE_FOLDER_ROOT)
    if os.path.isdir(os.path.join(IMAGE_FOLDER_ROOT, folder))
]

# Normalize folder names
folder_names_normalized = [f.strip().lower() for f in folder_names]

# === CHECK EACH FOLDER ===
total_folders = len(folder_names)
matched = 0
not_matched_folders = []

for folder, folder_normalized in zip(folder_names, folder_names_normalized):
    if folder_normalized in bike_names:
        print(f"[Matched] Folder: {folder}")
        matched += 1
    else:
        print(f"[Missing] Folder: {folder} — No matching bike name in dataset")
        not_matched_folders.append(folder)

# === SUMMARY ===
print("\n=== SUMMARY ===")
print(f"Total folders: {total_folders}")
print(f"Matched folders: {matched}")
print(f"Missing folders: {len(not_matched_folders)}")
