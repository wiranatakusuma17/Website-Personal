let currentAudio = null; // Menyimpan audio yang sedang dimainkan
let fadeInterval = null; // Untuk efek fade

function fadeOut(audio, callback) {
    let volume = audio.volume;
    clearInterval(fadeInterval); // Pastikan tidak ada fade lain yang berjalan

    fadeInterval = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            audio.volume = volume;
        } else {
            clearInterval(fadeInterval);
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 1; // Reset volume untuk audio selanjutnya
            if (callback) callback(); // Jalankan callback setelah fade out selesai
        }
    }, 50);
}

function playAudio(audioId) {
    let newAudio = document.getElementById(audioId);

    // Jika audio yang sama diklik lagi, tidak perlu restart
    if (currentAudio === newAudio && !currentAudio.paused) return;

    // Jika ada audio lain yang sedang diputar, lakukan fade out dulu
    if (currentAudio && currentAudio !== newAudio) {
        fadeOut(currentAudio, () => {
            currentAudio = newAudio;
            startAudioWithFadeIn(currentAudio);
        });
    } else {
        currentAudio = newAudio;
        startAudioWithFadeIn(currentAudio);
    }
}

function startAudioWithFadeIn(audio) {
    audio.volume = 0; // Mulai dari volume 0
    audio.loop = true; // Loop terus menerus
    audio.play();
    
    let volume = 0;
    clearInterval(fadeInterval);
    
    fadeInterval = setInterval(() => {
        if (volume < 1) {
            volume += 0.05;
            audio.volume = volume;
        } else {
            clearInterval(fadeInterval);
        }
    }, 50);
}


function playHoverSound() {
    let hoverAudio = document.getElementById("hoverSound");
    hoverAudio.currentTime = 0; // Restart audio jika sebelumnya sudah diputar
    hoverAudio.play();
}





