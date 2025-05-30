import os
import pandas as pd

# === CONFIGURATION ===
EXCEL_FILE = "dataset.xlsx"
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

folder_names.sort()
j = 1
for i in folder_names:
    print(f"{j} {i}")
    j += 1
# Normalize folder names
folder_names_normalized = [f.strip().lower() for f in folder_names]

# === CHECK EACH FOLDER ===
total_folders = len(folder_names)
matched = 0


for folder, folder_normalized in zip(folder_names, folder_names_normalized):
    if folder_normalized in bike_names:
        matched += 1
    else:
        print(f"[Missing] Folder: {folder} — No matching bike name in dataset")


# === SUMMARY ===
print("\n=== SUMMARY ===")
print(f"Total folders: {total_folders}")
print(f"Matched folders: {matched}")
print(f"Missing folders: {total_folders - matched}")
