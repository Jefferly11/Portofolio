/* =====================================================================
   FILE INI ADALAH SATU-SATUNYA YANG PERLU KAMU EDIT.
   Ganti isi di bawah dengan data kamu. Simpan, lalu refresh index.html.

   CARA MENAMBAH:
   1. Taruh foto/gambar di folder "images/" (mis. gambar1.jpeg)
   2. Salin satu blok { ... }, tempel di bawahnya, lalu ubah isinya.
   3. Kalau "image" dikosongkan / file tidak ketemu, otomatis tampil gambar
      placeholder berwarna, jadi website tidak pernah terlihat rusak.
   ===================================================================== */

const PORTFOLIO = {

  /* ---------------------------- PROFIL ---------------------------- */
  profile: {
    name: "Jefferly Mathew Miharja",
    // Teks yang bergantian diketik di bagian atas
    roles: ["Web Developer", "Machine Learning", "Organizer & Leader", "Fast Learner"],
    tagline: "Design. Develop. Deliver dan Teach Machines, Empower the Future, serta aktif berorganisasi untuk memberi dampak nyata.",
    about: [
      "Halo! Saya [Jefferly Mathew Miharja], mahasiswa yang tertarik pada pengembangan web, Machine Learning, dan teknologi kreatif.",
      "Selain coding, saya aktif di organisasi sehingga terbiasa bekerja dalam tim, memimpin kegiatan, dan menyelesaikan masalah di bawah tekanan."
    ],
    photo: "images/gambar1.jpg",          // foto profil kamu
    location: "Bandung, Indonesia",
    email: "mathew.miharja@gmail.com",
    cv: "",                               // mis. "files/cv.pdf" (kosongkan jika belum ada)
    socials: [
      { label: "GitHub",    url: "https://github.com/Jefferly11" },
      { label: "LinkedIn",  url: "https://www.linkedin.com/in/jefferly-mathew-miharja-848177326/" },
      { label: "Instagram", url: "https://www.instagram.com/jefferly_11/" }
    ]
  },

  /* ---------------------------- SKILL ---------------------------- */
  // level: 0 - 100
  skills: [
    { name: "HTML & CSS",        level: 60 },
    { name: "JavaScript",        level: 20 },
    { name: "Game Development",  level: 20 },
    { name: "UI / UX Design",    level: 10 },
    { name: "Public Speaking",   level: 75 },
    { name: "Kepemimpinan",      level: 80 }
  ],

  /* ---------------------- WEBSITE & GAME BUATAN ---------------------- */
  // type: "Website" atau "Game" (dipakai untuk tombol filter)
  // link  : tautan demo / tempat main game  (boleh dikosongkan "")
  // repo  : tautan kode di GitHub           (boleh dikosongkan "")
  projects: [
    {
      title: "Ruang Ragam",
      type: "Website",
      year: "2026",
      desc: "Website di mana kita bisa lebih mengenal keragaman budaya di Indonesia.",
      tags: ["HTML","JavaScript"],
      image: "images/ruangragam.jpg",
      link: "https://jefferly11.github.io/ruangragam/?",
      repo: "https://jefferly11.github.io/ruangragam/?"
    },
    {
      title: "WAYANG RISE",
      type: "Game",
      year: "2026",
      desc: "Wayang Rise adalah game petualangan yang terinspirasi dari kekayaan budaya wayang Indonesia. Pemain akan berperan sebagai Arjuna, seorang pemanah yang menjelajahi dunia penuh nuansa Nusantara, menghadapi berbagai musuh, dan meningkatkan kekuatan panah untuk menjadi semakin kuat.",
      tags: ["Scratch"],
      image: "images/wayangrise.jpg",
      link: "https://scratch.mit.edu/projects/1392664033",
      repo: ""
    },
    // ← tempel proyek baru di sini (jangan lupa koma di antara blok)
  ],

  /* ------------------------- SERTIFIKAT ------------------------- */
  // category bebas kamu tentukan (mis. "Teknologi", "Organisasi", "Lomba", "Bahasa").
  // Tombol filter dibuat otomatis dari kategori yang kamu pakai.
  certificates: [
    {
      title: "Web Development",
      issuer: "Universitas Catur Insan Cendekia",
      date: " 21 Agustus 2025",
      category: "Lomba",
      image: "images/webdev1.jpg",
      link: ""        // tautan verifikasi (opsional)
    },
    {
      title: "Juara 2 Vocal Group",
      issuer: "Pesparawi GSPDI Filadelfia",
      date: "16 September 2024",
      category: "Lomba",
      image: "images/vocal1.jpg",
      link: ""
    }
    // ← tempel sertifikat baru di sini
  ],

  /* ------------------- PENGALAMAN ORGANISASI ------------------- */
  // photos: daftar foto kegiatan, bisa banyak. Klik foto → tampil besar (galeri).
  organizations: [
    {
      name: "OSIS",
      role: "Sekbid TIK",
      period: "2023-2024",
      desc: "Saya mengikuti organisasi OSIS di Sekbid TIK dan ikut membantu berbagai kegiatan sekolah yang berhubungan dengan teknologi. Saya juga belajar mengelola informasi digital, membantu kebutuhan teknis acara, serta bekerja sama dengan anggota OSIS lainnya. Dari pengalaman ini, saya bisa menambah pengetahuan di bidang teknologi sekaligus melatih tanggung jawab, komunikasi, dan kerja sama tim.",
      photos: [
        "images/osis1.jpg",
        "images/osis2.jpg"
      ]
    },
    {
      name: "Pramuka",
      role: "Kordinator Sekbid TIK",
      period: "2024 – 2025",
      desc: "Saya menjabat sebagai Koordinator Seksi Bidang TIK dalam organisasi Pramuka. Saya bertanggung jawab mengoordinasikan anggota dalam bidang teknologi dan informasi, membantu dokumentasi kegiatan, serta mendukung kebutuhan teknis selama kegiatan Pramuka berlangsung. Melalui peran ini, saya belajar memimpin tim, mengatur tugas, dan bekerja sama agar setiap kegiatan berjalan dengan baik.",
      photos: [
        "images/pramuka1.jpg",
        "images/pramuka2.jpg"
      ]
    }
    // ← tempel organisasi baru di sini
  ]
};
