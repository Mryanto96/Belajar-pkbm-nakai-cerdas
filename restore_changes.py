import os
import shutil

def find_problematic_files():
    """Temukan semua file dan folder yang bermasalah"""
    project_folder = os.getcwd()
    
    print("🔍 MENCARI FILE DAN FOLDER BERMASALAH...")
    print("=" * 60)
    
    problems = []
    
    # Cek folder Gallery
    gallery_paths = [
        os.path.join(project_folder, 'Gallery'),
        os.path.join(project_folder, 'gallery'),
        os.path.join(project_folder, 'Gellery'),  # Typo umum
        os.path.join(project_folder, 'galeri')
    ]
    
    actual_gallery_path = None
    for gallery_path in gallery_paths:
        if os.path.exists(gallery_path):
            actual_gallery_path = gallery_path
            print(f"✅ Folder ditemukan: {gallery_path}")
            break
    
    if not actual_gallery_path:
        problems.append("❌ Folder Gallery tidak ditemukan!")
        print("❌ Folder Gallery TIDAK DITEMUKAN di lokasi manapun")
    else:
        print(f"📍 Menggunakan folder: {actual_gallery_path}")
        
        # Cek file dalam Gallery
        try:
            gallery_files = os.listdir(actual_gallery_path)
            print(f"📁 File dalam {os.path.basename(actual_gallery_path)}: {gallery_files}")
            
            # Cek file kontak.html
            contact_variations = ['kontak.html', 'contact.html', 'Kontak.html', 'Contact.html']
            contact_found = None
            
            for contact_file in contact_variations:
                contact_path = os.path.join(actual_gallery_path, contact_file)
                if os.path.exists(contact_path):
                    contact_found = contact_path
                    print(f"✅ File kontak ditemukan: {contact_file}")
                    break
            
            if not contact_found:
                problems.append(f"❌ File kontak.html tidak ditemukan di {actual_gallery_path}")
            else:
                # Cek jika kontak.html ada di root (salah tempat)
                root_contact_paths = []
                for contact_file in contact_variations:
                    root_path = os.path.join(project_folder, contact_file)
                    if os.path.exists(root_path):
                        root_contact_paths.append(root_path)
                        problems.append(f"⚠️  File {contact_file} ada di root folder (seharusnya di Gallery)")
                
                if root_contact_paths:
                    print(f"❌ File kontak salah tempat: {root_contact_paths}")
                
        except Exception as e:
            problems.append(f"❌ Tidak bisa membaca folder Gallery: {e}")
    
    # Cek file backup
    backup_files = []
    for root, dirs, files in os.walk(project_folder):
        for file in files:
            if file.endswith('.backup'):
                backup_files.append(os.path.join(root, file))
    
    if backup_files:
        print(f"📦 File backup ditemukan: {len(backup_files)}")
        for backup in backup_files:
            print(f"   🔄 {backup}")
    else:
        print("ℹ️  Tidak ada file backup ditemukan")
    
    return problems, actual_gallery_path, backup_files

def restore_contact_to_correct_location(gallery_path):
    """Kembalikan kontak.html ke folder Gallery yang benar"""
    print(f"\n🔄 MENGEMBALIKAN KONTAK.HTML KE {gallery_path}...")
    
    project_folder = os.getcwd()
    contact_variations = ['kontak.html', 'contact.html', 'Kontak.html', 'Contact.html']
    
    restored = False
    
    # Cari file kontak di root dan pindahkan ke Gallery
    for contact_file in contact_variations:
        root_contact_path = os.path.join(project_folder, contact_file)
        gallery_contact_path = os.path.join(gallery_path, contact_file)
        
        if os.path.exists(root_contact_path):
            try:
                shutil.move(root_contact_path, gallery_contact_path)
                print(f"✅ BERHASIL: {contact_file} dipindahkan dari root ke {os.path.basename(gallery_path)}")
                restored = True
                break
            except Exception as e:
                print(f"❌ GAGAL: Tidak bisa memindahkan {contact_file}: {e}")
    
    # Jika tidak ada di root, coba restore dari backup
    if not restored:
        for contact_file in contact_variations:
            backup_contact_path = os.path.join(project_folder, f"{contact_file}.backup")
            gallery_contact_path = os.path.join(gallery_path, contact_file)
            
            if os.path.exists(backup_contact_path):
                try:
                    shutil.copy2(backup_contact_path, gallery_contact_path)
                    print(f"✅ BERHASIL: {contact_file} dikembalikan dari backup")
                    restored = True
                    break
                except Exception as e:
                    print(f"❌ GAGAL: Tidak bisa restore {contact_file} dari backup: {e}")
    
    return restored

def restore_backup_files():
    """Kembalikan semua file dari backup"""
    project_folder = os.getcwd()
    
    print("\n🔄 MENGEMBALIKAN SEMUA FILE DARI BACKUP...")
    print("=" * 50)
    
    restored_count = 0
    
    for root, dirs, files in os.walk(project_folder):
        for file in files:
            if file.endswith('.backup'):
                backup_path = os.path.join(root, file)
                original_path = backup_path.replace('.backup', '')
                
                try:
                    # Pastikan folder tujuan ada
                    os.makedirs(os.path.dirname(original_path), exist_ok=True)
                    
                    # Kembalikan file original dari backup
                    shutil.copy2(backup_path, original_path)
                    print(f"✅ Dikembalikan: {os.path.basename(original_path)}")
                    restored_count += 1
                    
                except Exception as e:
                    print(f"❌ Gagal mengembalikan {original_path}: {e}")
    
    return restored_count

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
                    print(f"✅ Dihapus: {os.path.basename(backup_path)}")
                    deleted_count += 1
                except Exception as e:
                    print(f"❌ Gagal menghapus {backup_path}: {e}")
    
    return deleted_count

def show_detailed_structure():
    """Tampilkan struktur project secara detail"""
    project_folder = os.getcwd()
    
    print("\n📁 STRUKTUR PROJECT DETAIL:")
    print("=" * 50)
    
    for item in os.listdir(project_folder):
        item_path = os.path.join(project_folder, item)
        if os.path.isdir(item_path):
            # Tandai folder Gallery
            if item.lower() in ['gallery', 'galeri', 'gellery']:
                print(f"📁 {item}/  <--- FOLDER GALLERY")
            else:
                print(f"📁 {item}/")
            
            # Tampilkan file dalam folder
            try:
                for sub_item in os.listdir(item_path):
                    sub_item_path = os.path.join(item_path, sub_item)
                    if sub_item.endswith('.html'):
                        if sub_item.lower() in ['kontak.html', 'contact.html']:
                            print(f"   📄 {sub_item}  <--- FILE KONTAK")
                        elif sub_item.lower() == 'index.html':
                            print(f"   📄 {sub_item}  <--- FILE INDEX")
                        else:
                            print(f"   📄 {sub_item}")
            except Exception as e:
                print(f"   [error: {e}]")
        elif item.endswith('.html'):
            # Tandai file HTML di root (seharusnya tidak ada kecuali index.html)
            if item.lower() in ['kontak.html', 'contact.html']:
                print(f"⚠️  📄 {item}  <--- SEHARUSNYA DI DALAM FOLDER GALLERY!")
            else:
                print(f"📄 {item}")

def main_restore():
    """Fungsi utama untuk membatalkan semua perubahan"""
    print("🚨 MEMBATALKAN SEMUA PERUBAHAN DAN MEMPERBAIKI MASALAH...")
    print("=" * 60)
    
    # 1. Cari masalah
    problems, gallery_path, backup_files = find_problematic_files()
    
    if problems:
        print(f"\n❌ MASALAH YANG DITEMUKAN: {len(problems)}")
        for problem in problems:
            print(f"   {problem}")
    else:
        print("\n✅ Tidak ada masalah yang ditemukan")
    
    # 2. Jika Gallery ditemukan, perbaiki file kontak
    contact_restored = False
    if gallery_path:
        contact_restored = restore_contact_to_correct_location(gallery_path)
    
    # 3. Restore semua file dari backup
    restored_count = restore_backup_files()
    
    # 4. Hapus file backup
    backups_deleted = delete_all_backup_files()
    
    # 5. Tampilkan struktur akhir
    show_detailed_structure()
    
    # 6. Verifikasi perbaikan
    print(f"\n🎯 LAPORAN PERBAIKAN:")
    print(f"   ✅ {restored_count} file dikembalikan dari backup")
    print(f"   ✅ File kontak diperbaiki: {contact_restored}")
    print(f"   ✅ {backups_deleted} file backup dihapus")
    
    if gallery_path and contact_restored:
        print(f"\n🎉 SEMUA MASALAH TELAH DIPERBAIKI!")
        print(f"📍 File kontak.html sekarang berada di: {gallery_path}")
    else:
        print(f"\n⚠️  Beberapa masalah mungkin belum teratasi sepenuhnya")
        print(f"   Periksa struktur folder manual jika perlu")

# JALANKAN
if __name__ == "__main__":
    main_restore()