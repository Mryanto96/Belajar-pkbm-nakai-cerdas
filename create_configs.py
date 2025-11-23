import json
import os

def create_config_files():
    """Buat file konfigurasi untuk Vercel"""
    
    # 1. Buat vercel.json
    vercel_config = {
        "version": 2,
        "builds": [
            {
                "src": "*.html",
                "use": "@vercel/static"
            },
            {
                "src": "gallery/*.html",
                "use": "@vercel/static"
            }
        ],
        "routes": [
            {
                "src": "/(.*)", 
                "dest": "/$1"
            }
        ]
    }
    
    with open('vercel.json', 'w') as f:
        json.dump(vercel_config, f, indent=2)
    print("✅ vercel.json created!")
    
    # 2. Buat package.json 
    package_config = {
        "name": "my-static-site",
        "version": "1.0.0", 
        "description": "Static HTML site",
        "scripts": {
            "build": "echo 'No build process needed'"
        }
    }
    
    with open('package.json', 'w') as f:
        json.dump(package_config, f, indent=2)
    print("✅ package.json created!")
    
    print("\n🎯 File konfigurasi telah dibuat!")
    print("📤 Sekarang commit dan push ke GitHub, lalu redeploy di Vercel")

# Jalankan script
if __name__ == "__main__":
    create_config_files()