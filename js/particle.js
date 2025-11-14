// particles.js - Tambahkan file baru atau tambahkan di main.js
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size antara 3px - 8px
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Random color (putih dengan variasi opacity)
    const opacity = Math.random() * 0.5 + 0.3;
    particle.style.background = `rgba(255, 255, 255, ${opacity})`;
    
    // Random animation delay dan duration
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 4;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Random animation type
    const animationType = Math.random() > 0.5 ? 'float' : 'pulse';
    particle.style.animationName = animationType;
    
    container.appendChild(particle);
}

// Panggil function ketika DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
});

// Juga panggil ketika tab menjadi active (untuk mobile)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Refresh particles ketika kembali ke tab
        const container = document.getElementById('particles');
        if (container) {
            container.innerHTML = '';
            initParticles();
        }
    }
});