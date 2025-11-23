import os
import shutil

def restore_backup_files():
    """Kembalikan semua file dari backup"""
    project_folder = os.getcwd()
    
    print("🔄 MENGEMBALIKAN FILE DARI BACKUP...")
    print("=" * 50)
    
    restored_count = 0
    
    for root, dirs, files in os.walk(project_folder):
        for file in files:
            if file.endswith('.backup'):
                backup_path = os.path.join(root, file)
                original_path = backup_path.replace('.backup', '')
                
                try:
                    # Kembalikan file original dari backup
                    shutil.copy2(backup_path, original_path)
                    print(f"✅ Dikembalikan: {original_path}")
                    restored_count += 1
                    
                except Exception as e:
                    print(f"❌ Gagal mengembalikan {original_path}: {e}")
    
    return restored_count

def move_contact_back_to_gallery():
    """Kembalikan contact.html ke folder gallery (jika ada di root)"""
    project_folder = os.getcwd()
    
    root_contact = os.path.join(project_folder, 'contact.html')
    gallery_contact = os.path.join(project_folder, 'gallery', 'contact.html')
    
    # Jika contact.html ada di root, pindahkan kembali ke gallery
    if os.path.exists(root_contact):
        try:
            shutil.move(root_contact, gallery_contact)
            print("✅ contact.html dikembalikan ke folder gallery")
            return True
        except Exception as e:
            print(f"❌ Gagal memindahkan contact.html: {e}")
            return False
    else:
        print("ℹ️  contact.html tidak ada di root")
        return True

def delete_all_backup_files():
    """Hapus semua file backup"""
    project_folder = os.getcwd()
    
    print("\n🗑️  MENGHAPUS FILE BACKUP...")
    
    deleted_count = 0
    for root, dirs, files in os.walk(project_folder):
        for file in files:
            if file.endswith('.backup'):
                backup_path = os.path.join(root, file)
                try:
                    os.remove(backup_path)
                    print(f"✅ Dihapus: {backup_path}")
                    deleted_count += 1
                except Exception as e:
                    print(f"❌ Gagal menghapus {backup_path}: {e}")
    
    return deleted_count

def show_current_structure():
    """Tampilkan struktur project saat ini"""
    project_folder = os.getcwd()
    
    print("\n📁 STRUKTUR PROJECT SAAT INI:")
    print("=" * 40)
    
    for item in os.listdir(project_folder):
        item_path = os.path.join(project_folder, item)
        if os.path.isdir(item_path):
            print(f"📁 {item}/")
            # Tampilkan file HTML dalam folder
            try:
                for sub_item in os.listdir(item_path):
                    if sub_item.endswith('.html'):
                        print(f"   📄 {sub_item}")
            except:
                print("   [tidak bisa akses]")
        elif item.endswith('.html'):
            print(f"📄 {item}")

def main_restore():
    """Fungsi utama untuk membatalkan semua perubahan"""
    print("🚨 MEMBATALKAN SEMUA PERUBAHAN...")
    print("=" * 50)
    
    # 1. Kembalikan file dari backup
    restored = restore_backup_files()
    
    # 2. Kembalikan contact.html ke gallery
    contact_moved = move_contact_back_to_gallery()
    
    # 3. Hapus file backup
    backups_deleted = delete_all_backup_files()
    
    # 4. Tampilkan struktur
    show_current_structure()
    
    print(f"\n🎯 LAPORAN AKHIR:")
    print(f"   ✅ {restored} file dikembalikan dari backup")
    print(f"   ✅ contact.html dikembalikan ke gallery: {contact_moved}")
    print(f"   ✅ {backups_deleted} file backup dihapus")
    print(f"\n🎉 SEMUA PERUBAHAN TELAH DIBATALKAN!")
    print("📍 Project kembali ke state semula")

# JALANKAN
if __name__ == "__main__":
    main_restore()