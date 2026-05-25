import os
import sys
from PIL import Image

def optimize_image(src_path, dest_path, quality=80):
    try:
        if not os.path.exists(src_path):
            print(f"Error: El archivo {src_path} no existe.")
            return False
        
        print(f"Abriendo {src_path} ({os.path.getsize(src_path) / 1024:.2f} KB)...")
        img = Image.open(src_path)
        
        # Guardar en WebP con calidad optimizada
        img.save(dest_path, "WEBP", quality=quality, method=6)
        print(f"Guardado en {dest_path} ({os.path.getsize(dest_path) / 1024:.2f} KB) con exito.")
        return True
    except Exception as e:
        print(f"Error al optimizar {src_path}: {e}")
        return False

def main():
    base_dir = r"c:\Users\della\OneDrive\Escritorio\seogrowthers\Nueva carpeta\Nueva carpeta\horizons-export-4ae51224-e377-439c-9315-7d2c7f7b11c2"
    images_dir = os.path.join(base_dir, "public", "images")
    
    images_to_optimize = [
        "edv-remolques-hero",
        "seo-platform-showcase",
        "aluvalle-showcase",
        "inmofuture-showcase"
    ]
    
    success_count = 0
    for img_name in images_to_optimize:
        src = os.path.join(images_dir, f"{img_name}.png")
        dest = os.path.join(images_dir, f"{img_name}.webp")
        if optimize_image(src, dest):
            success_count += 1
            
    print(f"\nProceso finalizado. Se optimizaron con exito {success_count}/{len(images_to_optimize)} imagenes.")

if __name__ == "__main__":
    main()
