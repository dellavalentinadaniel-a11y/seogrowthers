import urllib.request
import json
import os

env_path = r"c:\Users\della\OneDrive\Escritorio\seogrowthers\Nueva carpeta\Nueva carpeta\horizons-export-4ae51224-e377-439c-9315-7d2c7f7b11c2\seogrowthers\.env"

supabase_url = None
supabase_key = None

with open(env_path, 'r') as f:
    for line in f:
        if "=" in line:
            key, val = line.strip().split('=', 1)
            if key == "VITE_SUPABASE_URL":
                supabase_url = val
            elif key == "VITE_SUPABASE_ANON_KEY":
                supabase_key = val

if not supabase_url or not supabase_key:
    print("No credentials")
    exit(1)

url = f"{supabase_url}/rest/v1/articles?select=title,slug,status&order=created_at.desc&limit=5"
headers = {
    "apikey": supabase_key,
    "Authorization": f"Bearer {supabase_key}"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print(json.dumps(data, indent=2))
except Exception as e:
    print(f"Error: {e}")
