document.addEventListener("DOMContentLoaded", function () {
  const coverSection = document.getElementById("cover");
  const mainContent = document.getElementById("main-content");
  const openBtn = document.getElementById("open-invitation-btn");
  const rsvpForm = document.getElementById("rsvp-form");
  const formMessage = document.getElementById("form-message");
  const commentsList = document.getElementById("comments-list");
  const musicAudio = document.getElementById("background-music");
  const musicToggleBtn = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");

  // --- Fungsi Utilitas: Mengambil Parameter Tamu dari URL ---
  // Contoh URL: index.html?to=Bapak+Hasan
  function getGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    // Menggunakan "Tamu Undangan" sebagai fallback jika parameter 'to' tidak ada
    return urlParams.get("to") || "Tamu Undangan";
  }

  // Tampilkan Nama Tamu
  document.getElementById("guest-name").textContent = getGuestName();

  // --- Logika Membuka Undangan ---
  openBtn.addEventListener("click", function () {
    coverSection.classList.add("hidden");
    mainContent.classList.remove("hidden");
    document.body.style.overflow = "auto"; // Aktifkan scroll

    // Putar musik secara otomatis (jika diizinkan oleh browser)
    playMusic();

    // Hapus parameter 'to' dari URL setelah dibuka (bersihkan tampilan URL)
    // history.replaceState({}, document.title, window.location.pathname);
  });

  // Awalnya, sembunyikan konten utama dan nonaktifkan scroll
  mainContent.classList.add("hidden");
  document.body.style.overflow = "hidden";

  // --- Logika Musik ---
  function playMusic() {
    musicAudio.volume = 0.5; // Atur volume
    musicAudio.play().catch((error) => {
      console.log("Autoplay failed:", error);
      // Tampilkan tombol musik jika autoplay gagal
    });
    musicIcon.textContent = "⏸️"; // Set icon ke Pause
  }

  function toggleMusic() {
    if (musicAudio.paused) {
      playMusic();
      musicIcon.textContent = "⏸️";
    } else {
      musicAudio.pause();
      musicIcon.textContent = "🎵";
    }
    VideoFrame;
    AnimationPlaybackEvent;
  }

  musicToggleBtn.addEventListener("click", toggleMusic);

  // Asumsi: Anda telah menaruh file audio di assets/music/song.mp3
  // Anda bisa mengaktifkan tombol play segera setelah DOMContentLoaded
  musicAudio.load();

  // --- Logika RSVP & Ucapan (Simulasi) ---
  let comments = [
    {
      name: "Keluarga Besar Budi",
      status: "Hadir",
      message: "Selamat menempuh hidup baru! Semoga samawa selalu.",
    },
    {
      name: "Siti Rahayu",
      status: "Tidak Hadir",
      message: "Mohon maaf tidak bisa hadir, semoga lancar acaranya.",
    },
  ];

  function renderComments() {
    commentsList.innerHTML = "";
    comments.forEach((comment) => {
      const commentItem = document.createElement("div");
      commentItem.className = "comment-item";
      commentItem.innerHTML = `
                <p class="comment-name">${comment.name}</p>
                <p class="comment-status">(${comment.status})</p>
                <p class="comment-message">${comment.message}</p>
            `;
      commentsList.appendChild(commentItem);
    });
  }

  // Submit RSVP
  rsvpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(rsvpForm);
    const name = formData.get("nama");
    const hadir = formData.get("hadir");
    const ucapan = formData.get("ucapan");

    if (!name || !hadir) {
      formMessage.textContent = "Mohon lengkapi Nama dan Konfirmasi Kehadiran.";
      formMessage.style.color = "red";
      return;
    }

    // SIMULASI: Tambahkan ucapan baru ke array (Ini hanya di sisi klien)
    comments.unshift({
      name: name,
      status: hadir === "hadir" ? "Insya Allah Hadir" : "Tidak Bisa Hadir",
      message: ucapan || "(Tidak Ada Ucapan)",
    });

    renderComments(); // Perbarui daftar ucapan
    rsvpForm.reset();
    formMessage.textContent =
      "Konfirmasi dan Ucapan berhasil dikirim! (Simulasi)";
    formMessage.style.color = "green";

    // Dalam implementasi nyata, data ini akan dikirim ke server (misalnya Google Sheets, Firebase, atau backend kustom)
    // Contoh: fetch('/api/rsvp', { method: 'POST', body: JSON.stringify({ name, hadir, ucapan }) })
  });

  // Tampilkan daftar ucapan awal saat halaman dimuat
  renderComments();
});
