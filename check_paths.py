import os
import re
from pathlib import Path
import shutil

def check_and_fix_html_paths(project_folder):
    """
    Memeriksa dan memperbaiki semua path di file HTML dalam project
    """
    issues = []
    fixes_applied = 0
    
    for root, dirs, files in os.walk(project_folder):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, project_folder)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        original_content = content = f.read()
                    
                    # Cari semua path di atribut HTML
                    patterns = {
                        'href': r'(href=[\'"])([^\'"]*)([\'"])',
                        'src': r'(src=[\'"])([^\'"]*)([\'"])',
                        'action': r'(action=[\'"])([^\'"]*)([\'"])'
                    }
                    
                    for attr, pattern in patterns.items():
                        matches = re.findall(pattern, content)
                        for match in matches:
                            prefix, path, suffix = match
                            # Skip URL eksternal
                            if path.startswith(('http://', 'https://', 'mailto:', 'tel:', '#')):
                                continue
                            
                            # Cek jika path valid
                            if not is_path_valid(path, root, project_folder):
                                # Coba cari path yang benar
                                correct_path = find_correct_path(path, root, project_folder)
                                
                                if correct_path:
                                    # Ganti path yang salah dengan yang benar
                                    old_pattern = prefix + path + suffix
                                    new_pattern = prefix + correct_path + suffix
                                    content = content.replace(old_pattern, new_pattern)
                                    
                                    issues.append({
                                        'file': relative_path,
                                        'attribute': attr,
                                        'old_path': path,
                                        'new_path': correct_path,
                                        'status': '✅ DIPERBAIKI'
                                    })
                                    fixes_applied += 1
                                else:
                                    issues.append({
                                        'file': relative_path,
                                        'attribute': attr,
                                        'old_path': path,
                                        'new_path': 'TIDAK DITEMUKAN',
                                        'status': '❌ TIDAK BISA DIPERBAIKI'
                                    })
                    
                    # Simpan perubahan jika ada perbaikan
                    if content != original_content:
                        # Buat backup dulu
                        backup_path = file_path + '.backup'
                        shutil.copy2(file_path, backup_path)
                        
                        # Tulis file yang sudah diperbaiki
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        
                        print(f"✅ File {relative_path} telah diperbaiki (backup: {backup_path})")
                        
                except Exception as e:
                    print(f"Error membaca file {file_path}: {e}")
    
    return issues, fixes_applied

def is_path_valid(path, html_file_dir, project_root):
    """
    Memeriksa apakah path yang diberikan valid
    """
    if path.startswith('/'):
        # Absolute path dari root project
        full_path = os.path.join(project_root, path.lstrip('/'))
    else:
        # Relative path dari lokasi file HTML
        full_path = os.path.join(html_file_dir, path)
    
    # Cek jika file/directory exists
    return os.path.exists(full_path)

def find_correct_path(wrong_path, html_file_dir, project_root):
    """
    Mencari path yang benar untuk menggantikan path yang salah
    """
    target_file = wrong_path.split('/')[-1]  # Ambil nama file target
    
    # Cari file tersebut di seluruh project
    for root, dirs, files in os.walk(project_root):
        for file in files:
            if file == target_file:
                # Hitung path relatif dari file HTML ke file target
                relative_path = os.path.relpath(os.path.join(root, file), html_file_dir)
                
                # Pastikan path menggunakan forward slash (untuk web)
                relative_path = relative_path.replace('\\', '/')
                
                # Validasi path yang ditemukan
                if is_path_valid(relative_path, html_file_dir, project_root):
                    return relative_path
    
    return None

def show_project_structure(project_folder):
    """
    Menampilkan struktur folder project
    """
    print(f"Struktur Project: {project_folder}")
    print("=" * 50)
    
    for root, dirs, files in os.walk(project_folder):
        level = root.replace(project_folder, '').count(os.sep)
        indent = ' ' * 2 * level
        print(f"{indent}📁 {os.path.basename(root)}/")
        sub_indent = ' ' * 2 * (level + 1)
        for file in files:
            print(f"{sub_indent}📄 {file}")

# MAIN EXECUTION
print("🔍 MEMERIKSA DAN MEMPERBAIKI PATH...")
project_folder = os.getcwd()
print(f"Project folder: {project_folder}")
print()

# Tampilkan struktur
show_project_structure(project_folder)
print()

# Periksa dan perbaiki path
issues, fixes_applied = check_and_fix_html_paths(project_folder)

# Tampilkan hasil
if issues:
    print(f"\n📊 HASIL PEMERIKSAAN:")
    print("=" * 60)
    for issue in issues:
        print(f"File: {issue['file']}")
        print(f"Atribut: {issue['attribute']}")
        print(f"Path lama: {issue['old_path']}")
        print(f"Path baru: {issue['new_path']}")
        print(f"Status: {issue['status']}")
        print("-" * 40)
    
    print(f"\n🎯 TOTAL PERBAIKAN: {fixes_applied} path telah diperbaiki!")
    
    # Tampilkan file yang memiliki backup
    print(f"\n💾 BACKUP FILE:")
    for root, dirs, files in os.walk(project_folder):
        for file in files:
            if file.endswith('.backup'):
                print(f"  - {file}")
    
    print(f"\n⚠️  PERHATIAN: File backup (.backup) telah dibuat. ")
    print("   Anda bisa menghapusnya setelah memastikan perbaikan berhasil.")
    
else:
    print("✅ Tidak ditemukan masalah path!")