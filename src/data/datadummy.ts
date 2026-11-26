// ==================== SCHEMES ====================
export const schemes = [
    {
        id: 'full-stack',
        name: 'Full Stack Web Development',
        description: 'Comprehensive training program covering frontend and backend development',
        duration: '6 months',
        level: 'Intermediate',
        participants: 156,
        status: 'active',
        available: true,
    },
    {
        id: 'data-science',
        name: 'Data Science & Machine Learning',
        description: 'Learn data analysis, visualization, and machine learning fundamentals',
        duration: '4 months',
        level: 'Advanced',
        participants: 89,
        status: 'active',
        available: true,
    },
    {
        id: 'cloud-devops',
        name: 'Cloud Computing & DevOps',
        description: 'Master cloud platforms and DevOps practices',
        duration: '3 months',
        level: 'Advanced',
        participants: 45,
        status: 'coming-soon',
        available: false,
    },
];

// ==================== TRAININGS DATA (DETAILED) ====================
export const trainingsData = [
    {
        id: 'admin-perkantoran',
        title: 'Pengelolaan Administrasi Perkantoran',
        duration: '2 Bulan',
        description: 'Pelatihan administrasi perkantoran yang membekali peserta dengan kemampuan pengelolaan dokumen, komunikasi bisnis, pengarsipan, penggunaan aplikasi perkantoran, serta pelayanan pelanggan sesuai kebutuhan dunia kerja modern.',
        learningPath: [
            {
                title: 'Menangani Penerimaan dan Pengiriman Dokumen',
                modules: [
                    { id: 'ap-1-1', title: 'Pengenalan Prosedur Dokumen Masuk', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Siti Aminah, S.A.B.', duration: '15 min', status: 'completed' },
                    { id: 'ap-1-2', title: 'Standar Pengiriman Dokumen Dinas', type: 'pdf', contentUrl: '/assets/pdf/modul-pengiriman-dokumen.pdf', instructor: 'Siti Aminah, S.A.B.', duration: '10 min', status: 'active' }
                ]
            },
            {
                title: 'Menciptakan Dokumen dan Lembar Kerja Sederhana',
                modules: [
                    { id: 'ap-2-1', title: 'Praktik Pembuatan Surat Resmi', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Budi Santoso, M.M.', duration: '20 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'junior-secretary',
        title: 'Junior Secretary',
        duration: '3 Bulan',
        description: 'Program pelatihan sekretaris profesional yang mencakup administrasi perkantoran, pengelolaan jadwal pimpinan, komunikasi bisnis, bahasa Inggris operasional, pelayanan pelanggan, dan teknologi perkantoran.',
        learningPath: [
            {
                title: 'Administrasi dan Dokumen Perkantoran',
                modules: [
                    { id: 'js-1-1', title: 'Manajemen Dokumen Perjalanan Dinas', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Diana Putri, M.Si.', duration: '18 min', status: 'completed' },
                    { id: 'js-1-2', title: 'Checklist Persiapan Rapat Pimpinan', type: 'pdf', contentUrl: '/assets/pdf/checklist-rapat.pdf', instructor: 'Diana Putri, M.Si.', duration: '10 min', status: 'active' }
                ]
            },
            {
                title: 'Sekretarial dan Manajemen Pimpinan',
                modules: [
                    { id: 'js-2-1', title: 'Teknik Penjadwalan Eksekutif', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Ahmad Reza, MBA', duration: '22 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'assistant-web-developer',
        title: 'Asisten Pengembang Web',
        duration: '2 Bulan',
        description: 'Pelatihan dasar pengembangan web yang membekali peserta dengan kemampuan membuat antarmuka web, menulis kode sesuai standar industri, menggunakan library, serta menerapkan pemrograman terstruktur.',
        learningPath: [
            {
                title: 'Implementasi User Interface (UI)',
                modules: [
                    { id: 'awd-1-1', title: 'Dasar HTML5 & Semantic Web', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Muhammad Zacky', duration: '25 min', status: 'completed' },
                    { id: 'awd-1-2', title: 'Styling dengan CSS Flexbox & Grid', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Muhammad Zacky', duration: '30 min', status: 'active' },
                    { id: 'awd-1-3', title: 'Cheat Sheet CSS Grid', type: 'pdf', contentUrl: '/assets/pdf/css-grid-cheatsheet.pdf', instructor: 'Muhammad Zacky', duration: '5 min', status: 'locked' }
                ]
            },
            {
                title: 'Dasar Pemrograman Web Terstruktur',
                modules: [
                    { id: 'awd-2-1', title: 'Logika Pemrograman JavaScript', type: 'video', contentUrl: 'tgbNymZ7vqY', instructor: 'Rizki Darmawan, S.Kom.', duration: '35 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        duration: '2.5 Bulan',
        description: 'Pelatihan merancang strategi pemasaran digital, mencakup SEO, pengelolaan media sosial, dan analisis kampanye periklanan.',
        learningPath: [
            {
                title: 'Social Media Management',
                modules: [
                    { id: 'dm-1-1', title: 'Merancang Content Calendar', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Sarah Nadira', duration: '20 min', status: 'completed' },
                    { id: 'dm-1-2', title: 'Template Content Calendar', type: 'pdf', contentUrl: '/assets/pdf/content-calendar.pdf', instructor: 'Sarah Nadira', duration: '10 min', status: 'active' }
                ]
            },
            {
                title: 'SEO Fundamentals',
                modules: [
                    { id: 'dm-2-1', title: 'Riset Keyword Dasar', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Bagas Kuncoro', duration: '25 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'desain-grafis',
        title: 'Pembuatan Desain Grafis',
        duration: '2 Bulan',
        description: 'Eksplorasi kreativitas visual menggunakan alat desain standar industri untuk kebutuhan cetak maupun digital marketing.',
        learningPath: [
            {
                title: 'Prinsip Dasar Desain',
                modules: [
                    { id: 'dg-1-1', title: 'Teori Warna dan Tipografi', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Dian Sastro, S.Ds.', duration: '20 min', status: 'completed' },
                    { id: 'dg-1-2', title: 'Buku Panduan Layouting', type: 'pdf', contentUrl: '/assets/pdf/panduan-layout.pdf', instructor: 'Dian Sastro, S.Ds.', duration: '15 min', status: 'active' }
                ]
            },
            {
                title: 'Penguasaan Tools Desain',
                modules: [
                    { id: 'dg-2-1', title: 'Interface Adobe Illustrator', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Galih Purnama', duration: '28 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'laporan-keuangan-tunggal',
        title: 'Menyusun Laporan Keuangan Entitas Tunggal',
        duration: '1.5 Bulan',
        description: 'Pelatihan teknis penyusunan siklus akuntansi lengkap untuk bisnis entitas tunggal sesuai standar akuntansi yang berlaku.',
        learningPath: [
            {
                title: 'Konsep Dasar Akuntansi',
                modules: [
                    { id: 'lk-1-1', title: 'Persamaan Dasar Akuntansi', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Hendra Wijaya, S.E., Ak.', duration: '25 min', status: 'completed' }
                ]
            },
            {
                title: 'Siklus Akuntansi',
                modules: [
                    { id: 'lk-2-1', title: 'Penyusunan Jurnal Umum', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Hendra Wijaya, S.E., Ak.', duration: '30 min', status: 'active' },
                    { id: 'lk-2-2', title: 'Latihan Soal Jurnal Umum', type: 'pdf', contentUrl: '/assets/pdf/latihan-jurnal.pdf', instructor: 'Hendra Wijaya, S.E., Ak.', duration: '20 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'spv-sdm',
        title: 'Supervisor Sumber Daya Manusia',
        duration: '2 Bulan',
        description: 'Membekali peserta dengan keterampilan manajerial SDM, mulai dari rekrutmen, pelatihan, hingga penilaian kinerja karyawan.',
        learningPath: [
            {
                title: 'Manajemen Rekrutmen',
                modules: [
                    { id: 'sdm-1-1', title: 'Proses Screening CV', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Andi Pratama, M.Psi.', duration: '20 min', status: 'completed' },
                    { id: 'sdm-1-2', title: 'Teknik Wawancara Perilaku', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Andi Pratama, M.Psi.', duration: '25 min', status: 'active' }
                ]
            },
            {
                title: 'Pengembangan Karyawan',
                modules: [
                    { id: 'sdm-2-1', title: 'Penyusunan KPI Dasar', type: 'pdf', contentUrl: '/assets/pdf/kpi-dasar.pdf', instructor: 'Linda Kusuma', duration: '15 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'pelayanan-pelanggan',
        title: 'Pelayanan Pelanggan',
        duration: '1 Bulan',
        description: 'Fokus pada peningkatan service excellence, menangani komplain, dan membangun hubungan baik dengan pelanggan (Customer Relationship).',
        learningPath: [
            {
                title: 'Dasar Service Excellence',
                modules: [
                    { id: 'pp-1-1', title: 'Mindset Pelayanan Prima', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Rina Marlina', duration: '15 min', status: 'completed' }
                ]
            },
            {
                title: 'Handling Complaint',
                modules: [
                    { id: 'pp-2-1', title: 'Teknik L.E.A.R.N', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Rina Marlina', duration: '20 min', status: 'active' }
                ]
            }
        ]
    },
    {
        id: 'front-office',
        title: 'Menyediakan Layanan Front Office',
        duration: '1.5 Bulan',
        description: 'Mempersiapkan tenaga profesional di garda terdepan perusahaan dengan standar pelayanan resepsionis dan operasional telepon.',
        learningPath: [
            {
                title: 'Grooming & Etika',
                modules: [
                    { id: 'fo-1-1', title: 'Standar Penampilan Resepsionis', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Bella Saputri', duration: '20 min', status: 'completed' },
                    { id: 'fo-1-2', title: 'Buku Panduan Grooming', type: 'pdf', contentUrl: '/assets/pdf/grooming-guide.pdf', instructor: 'Bella Saputri', duration: '10 min', status: 'active' }
                ]
            },
            {
                title: 'Telephone Operator',
                modules: [
                    { id: 'fo-2-1', title: 'Menyapa dan Mentransfer Panggilan', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Bella Saputri', duration: '15 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'operator-komputer',
        title: 'Operator Komputer (Komputer Operator)',
        duration: '1.5 Bulan',
        description: 'Pelatihan dasar pengoperasian komputer dan aplikasi perkantoran (Word, Excel, PowerPoint) untuk meningkatkan produktivitas kerja.',
        learningPath: [
            {
                title: 'Sistem Operasi & Internet',
                modules: [
                    { id: 'ok-1-1', title: 'Manajemen File di Windows', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Teguh Prakoso', duration: '15 min', status: 'completed' }
                ]
            },
            {
                title: 'Pengolahan Kata & Angka',
                modules: [
                    { id: 'ok-2-1', title: 'Pemformatan Teks Microsoft Word', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Teguh Prakoso', duration: '25 min', status: 'active' },
                    { id: 'ok-2-2', title: 'Rumus Dasar Excel', type: 'pdf', contentUrl: '/assets/pdf/excel-formulas.pdf', instructor: 'Teguh Prakoso', duration: '15 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'digital-filling',
        title: 'Digital Filling',
        duration: '1 Bulan',
        description: 'Transformasi dari arsip fisik ke digital. Mempelajari sistem penamaan, penyimpanan cloud, dan keamanan dokumen elektronik.',
        learningPath: [
            {
                title: 'Pengenalan Arsip Digital',
                modules: [
                    { id: 'df-1-1', title: 'Pentingnya Digitalisasi Dokumen', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Rina Amelia', duration: '15 min', status: 'completed' }
                ]
            },
            {
                title: 'Sistem Penyimpanan Cloud',
                modules: [
                    { id: 'df-2-1', title: 'Manajemen Google Drive Workspace', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Rina Amelia', duration: '20 min', status: 'active' },
                    { id: 'df-2-2', title: 'Standar Naming Convention', type: 'pdf', contentUrl: '/assets/pdf/naming-convention.pdf', instructor: 'Rina Amelia', duration: '10 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'audio-visual',
        title: 'Memproduksi Karya Audio Visual',
        duration: '3 Bulan',
        description: 'Pelatihan teknis videografi dan pengeditan video. Mempelajari pra-produksi, produksi, hingga post-production menggunakan CapCut/Premiere.',
        learningPath: [
            {
                title: 'Pra-Produksi & Konsep',
                modules: [
                    { id: 'av-1-1', title: 'Pembuatan Naskah & Storyboard', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Dimas Aditya', duration: '25 min', status: 'completed' },
                    { id: 'av-1-2', title: 'Template Storyboard', type: 'pdf', contentUrl: '/assets/pdf/storyboard-template.pdf', instructor: 'Dimas Aditya', duration: '5 min', status: 'active' }
                ]
            },
            {
                title: 'Editing & Post-Production',
                modules: [
                    { id: 'av-2-1', title: 'Dasar Cutting dan Transisi Premiere Pro', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Dimas Aditya', duration: '35 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'data-analyst',
        title: 'Analis Data (Data Analyst)',
        duration: '3 Bulan',
        description: 'Mempelajari cara mengolah, menganalisis, dan memvisualisasikan data mentah menjadi informasi strategis menggunakan tools seperti SQL dan Tableau.',
        learningPath: [
            {
                title: 'SQL & Database Dasar',
                modules: [
                    { id: 'da-1-1', title: 'Konsep Relational Database', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Fauzi Rahman', duration: '20 min', status: 'completed' },
                    { id: 'da-1-2', title: 'Perintah SELECT, WHERE, dan JOIN', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Fauzi Rahman', duration: '30 min', status: 'active' }
                ]
            },
            {
                title: 'Visualisasi Data (Tableau)',
                modules: [
                    { id: 'da-2-1', title: 'Membuat Dashboard Interaktif', type: 'video', contentUrl: 'tgbNymZ7vqY', instructor: 'Anita Larasati', duration: '35 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'k3',
        title: 'Petugas Keselamatan dan Kesehatan Kerja',
        duration: '2 Bulan',
        description: 'Sertifikasi K3 Umum untuk mengidentifikasi bahaya, menilai risiko, dan menerapkan standar keselamatan di lingkungan kerja.',
        learningPath: [
            {
                title: 'Dasar Peraturan K3',
                modules: [
                    { id: 'k3-1-1', title: 'Undang-Undang Keselamatan Kerja', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Ir. Wahyu Hidayat', duration: '25 min', status: 'completed' },
                    { id: 'k3-1-2', title: 'Buku Saku UU K3', type: 'pdf', contentUrl: '/assets/pdf/buku-saku-k3.pdf', instructor: 'Ir. Wahyu Hidayat', duration: '15 min', status: 'active' }
                ]
            },
            {
                title: 'Identifikasi Risiko',
                modules: [
                    { id: 'k3-2-1', title: 'Metode HIRARC', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Ir. Wahyu Hidayat', duration: '30 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'laporan-keuangan-pemula',
        title: 'Penyusunan Laporan Keuangan Untuk Pemula',
        duration: '1 Bulan',
        description: 'Pengenalan praktis pembukuan untuk usaha kecil. Cocok bagi pemula yang tidak memiliki latar belakang akuntansi.',
        learningPath: [
            {
                title: 'Pengantar Pembukuan',
                modules: [
                    { id: 'lkp-1-1', title: 'Konsep Debet dan Kredit', type: 'video', contentUrl: 'cFknhEPt1r4', instructor: 'Nisa Rahmawati, S.Ak.', duration: '20 min', status: 'completed' },
                    { id: 'lkp-1-2', title: 'Buku Kas Sederhana', type: 'pdf', contentUrl: '/assets/pdf/buku-kas.pdf', instructor: 'Nisa Rahmawati, S.Ak.', duration: '10 min', status: 'active' }
                ]
            },
            {
                title: 'Membaca Laporan Dasar',
                modules: [
                    { id: 'lkp-2-1', title: 'Cara Membaca Laba Rugi UMKM', type: 'video', contentUrl: 'dQw4w9WgXcQ', instructor: 'Nisa Rahmawati, S.Ak.', duration: '20 min', status: 'locked' }
                ]
            }
        ]
    },
    {
        id: 'soft-skills-bnsp',
        title: 'Keterampilan Diri (Soft Skills) - Berbasis BNSP',
        duration: '1 Bulan',
        description: 'Pelatihan pengembangan diri berbasis unit kompetensi untuk meningkatkan profesionalisme, komunikasi, dan performa di lingkungan kerja sesuai standar BNSP.',
        learningPath: [
            {
                title: 'Membangun Konsep Diri yang Positif dalam Bekerja',
                modules: [
                    { id: 'ss-1-1', title: 'Pengenalan Konsep Diri Positif', type: 'video', contentUrl: 'konsep-diri-001', instructor: 'Veldi Mahjedi', duration: '15 min', status: 'completed' },
                    { id: 'ss-1-2', title: 'Menerapkan Sikap Positif di Tempat Kerja', type: 'video', contentUrl: 'konsep-diri-002', instructor: 'Veldi Mahjedi', duration: '20 min', status: 'active' },
                    { id: 'ss-1-3', title: 'Panduan Self-Awareness', type: 'pdf', contentUrl: '/assets/pdf/self-awareness.pdf', instructor: 'Veldi Mahjedi', duration: '15 min', status: 'active' },
                    { id: 'ss-1-4', title: 'Quiz Konsep Diri', type: 'quiz', contentUrl: 'quiz-kd-001', instructor: 'Veldi Mahjedi', duration: '10 min', status: 'locked' }
                ]
            },
            {
                title: 'Mengembangkan Kemampuan Berpikir Kritis dalam Memecahkan Masalah dan Mencari Solusi',
                modules: [
                    { id: 'ss-2-1', title: 'Teknik Problem Solving dan Analisis Akar Masalah', type: 'video', contentUrl: 'critical-thinking-001', instructor: 'Devi Tampubolon', duration: '30 min', status: 'locked' }
                ]
            },
            {
                title: 'Mengembangkan Kemampuan Menghadapi Tantangan di Tempat Kerja',
                modules: [
                    { id: 'ss-3-1', title: 'Membangun Resiliensi dan Manajemen Stres', type: 'video', contentUrl: 'resilience-001', instructor: 'Wustari L. Mogindayo', duration: '25 min', status: 'locked' }
                ]
            },
            {
                title: 'Mengembangkan Kemampuan Berinisiatif dalam Bekerja',
                modules: [
                    { id: 'ss-4-1', title: 'Menjadi Pribadi Proaktif dan Inovatif', type: 'video', contentUrl: 'initiative-001', instructor: 'Bambang Yopri', duration: '20 min', status: 'locked' }
                ]
            },
            {
                title: 'Mengembangkan Kemampuan Bekerja Sama dalam Tim',
                modules: [
                    { id: 'ss-5-1', title: 'Kolaborasi dan Sinergi dalam Tim', type: 'video', contentUrl: 'teamwork-001', instructor: 'Nadi Kospriani', duration: '25 min', status: 'locked' }
                ]
            },
            {
                title: 'Mengembangkan Kemampuan Dasar dalam Memimpin Kelompok Kecil',
                modules: [
                    { id: 'ss-6-1', title: 'Dasar-Dasar Kepemimpinan (Leadership)', type: 'video', contentUrl: 'leadership-001', instructor: 'Ary Gemini', duration: '30 min', status: 'locked' }
                ]
            },
            {
                title: 'Membangun Integritas sebagai Tenaga Kerja Profesional',
                modules: [
                    { id: 'ss-7-1', title: 'Etika Kerja dan Integritas Profesional', type: 'video', contentUrl: 'integrity-001', instructor: 'Yunus Tynggana', duration: '25 min', status: 'locked' }
                ]
            },
            {
                title: 'Membangun Kemampuan dalam Pengelolaan Emosi',
                modules: [
                    { id: 'ss-8-1', title: 'Kecerdasan Emosional (EQ) di Tempat Kerja', type: 'video', contentUrl: 'eq-001', instructor: 'Dr. Dasep Suryanto', duration: '20 min', status: 'locked' },
                    { id: 'ss-8-2', title: 'Teknik Regulasi Emosi', type: 'pdf', contentUrl: '/assets/pdf/emotion-regulation.pdf', instructor: 'Dr. Dasep Suryanto', duration: '15 min', status: 'locked' }
                ]
            },
            {
                title: 'Meningkatkan Kualitas Penampilan Prima',
                modules: [
                    { id: 'ss-9-1', title: 'Grooming dan Standar Penampilan Profesional', type: 'video', contentUrl: 'grooming-001', instructor: 'Retno Diyanti', duration: '20 min', status: 'locked' }
                ]
            },
            {
                title: 'Membangun Kemampuan Komunikasi yang Efektif',
                modules: [
                    { id: 'ss-10-1', title: 'Dasar Komunikasi Efektif dan Asertif', type: 'video', contentUrl: 'communication-001', instructor: 'Maria T. Kurniawati', duration: '25 min', status: 'locked' },
                    { id: 'ss-10-2', title: 'Praktek Komunikasi Bisnis', type: 'pdf', contentUrl: '/assets/pdf/business-comm.pdf', instructor: 'Maria T. Kurniawati', duration: '15 min', status: 'locked' },
                    { id: 'ss-10-3', title: 'Assessment Komunikasi & Soft Skills', type: 'quiz', contentUrl: 'quiz-final-001', instructor: 'Maria T. Kurniawati', duration: '20 min', status: 'locked' }
                ]
            }
        ]
    },
];

// ==================== LEARNING PATHS (Simplified for UI Mapping) ====================
export const learningPaths: { [key: string]: any[] } = {
    'full-stack': [
        { id: 1, title: 'Pengenalan Web Development', modules: 2, order: 1 },
        { id: 2, title: 'HTML & CSS Fundamentals', modules: 3, order: 2 },
        { id: 3, title: 'JavaScript Basics', modules: 2, order: 3 },
        { id: 4, title: 'React Framework', modules: 3, order: 4 },
        { id: 5, title: 'Backend Development', modules: 2, order: 5 },
    ],
    'data-science': [
        { id: 6, title: 'Introduction to Data Science', modules: 2, order: 1 },
        { id: 7, title: 'Python Programming', modules: 3, order: 2 },
        { id: 8, title: 'Data Analysis with Pandas', modules: 3, order: 3 },
        { id: 9, title: 'Machine Learning Basics', modules: 4, order: 4 },
    ],
};

// ==================== MODULES ====================
export const modulesData: { [key: string]: any[] } = {
    'html-css': [
        { id: 1, title: 'HTML Basics', description: 'Belajar dasar HTML', duration: '30 min', status: 'published', hasQuiz: true, order: 1 },
        { id: 2, title: 'CSS Styling', description: 'Styling dengan CSS', duration: '45 min', status: 'published', hasQuiz: true, order: 2 },
        { id: 3, title: 'Responsive Design', description: 'Membuat layout responsif', duration: '40 min', status: 'draft', hasQuiz: false, order: 3 },
    ],
    'javascript': [
        { id: 4, title: 'JavaScript Fundamentals', description: 'Dasar JavaScript', duration: '50 min', status: 'published', hasQuiz: true, order: 1 },
        { id: 5, title: 'DOM Manipulation', description: 'Manipulasi DOM', duration: '35 min', status: 'published', hasQuiz: true, order: 2 },
    ],
    'react': [
        { id: 6, title: 'Introduction to React', description: 'Pengenalan React', duration: '40 min', status: 'published', hasQuiz: true, order: 1 },
        { id: 7, title: 'Components & Props', description: 'Komponen dan Props', duration: '45 min', status: 'published', hasQuiz: true, order: 2 },
        { id: 8, title: 'State & Hooks', description: 'State dan Hooks', duration: '50 min', status: 'draft', hasQuiz: false, order: 3 },
    ],
};

// ==================== MODULE MAPPING ====================
export const learningPathModules: { [key: string]: Array<{ id: string; name: string }> } = {
    'html-css': [
        { id: 'html-basics', name: 'HTML Basics' },
        { id: 'css-styling', name: 'CSS Styling' },
        { id: 'responsive-design', name: 'Responsive Design' },
    ],
    'javascript': [
        { id: 'js-fundamentals', name: 'JavaScript Fundamentals' },
        { id: 'dom-manipulation', name: 'DOM Manipulation' },
    ],
    'react': [
        { id: 'intro-react', name: 'Introduction to React' },
        { id: 'components-props', name: 'Components & Props' },
        { id: 'state-hooks', name: 'State & Hooks' },
    ],
};

// ==================== MATERIALS ====================
export const materials: { [key: string]: any[] } = {
    'html-basics': [
        { id: 1, name: 'Introduction to HTML.mp4', type: 'video', size: '45.2 MB', duration: '15:30', status: 'published', uploadDate: '2026-05-15' },
        { id: 2, name: 'HTML Tags Reference.pdf', type: 'pdf', size: '2.1 MB', pages: 12, status: 'published', uploadDate: '2026-05-15' },
        { id: 3, name: 'HTML Forms Tutorial.mp4', type: 'video', size: '38.7 MB', duration: '12:45', status: 'draft', uploadDate: '2026-05-20' },
    ],
    'css-styling': [
        { id: 4, name: 'CSS Fundamentals.mp4', type: 'video', size: '52.3 MB', duration: '18:20', status: 'published', uploadDate: '2026-05-16' },
        { id: 5, name: 'CSS Properties Guide.pdf', type: 'pdf', size: '3.5 MB', pages: 20, status: 'published', uploadDate: '2026-05-16' },
    ],
    'js-fundamentals': [
        { id: 6, name: 'JavaScript Basics.mp4', type: 'video', size: '67.8 MB', duration: '25:15', status: 'published', uploadDate: '2026-05-18' },
    ],
    'responsive-design': [],
    'dom-manipulation': [],
    'intro-react': [],
    'components-props': [],
    'state-hooks': [],
};

// ==================== MATERIALS MAPPING ====================
export const moduleMaterials: { [key: string]: Array<{ id: string; name: string; type: string }> } = {
    'html-basics': [
        { id: 'html-intro-video', name: 'Introduction to HTML.mp4', type: 'video' },
        { id: 'html-tags-pdf', name: 'HTML Tags Reference.pdf', type: 'pdf' },
        { id: 'html-forms-video', name: 'HTML Forms Tutorial.mp4', type: 'video' },
    ],
    'css-styling': [
        { id: 'css-fund-video', name: 'CSS Fundamentals.mp4', type: 'video' },
        { id: 'css-props-pdf', name: 'CSS Properties Guide.pdf', type: 'pdf' },
    ],
    'js-fundamentals': [
        { id: 'js-basics-video', name: 'JavaScript Basics.mp4', type: 'video' },
    ],
    'responsive-design': [],
    'dom-manipulation': [],
    'intro-react': [],
    'components-props': [],
    'state-hooks': [],
};

// ==================== QUIZZES ====================
export const quizzes: { [key: string]: any } = {
    'html-intro-video': {
        title: 'Quiz: Introduction to HTML',
        materialName: 'Introduction to HTML.mp4',
        questions: [
            { id: 1, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correctAnswer: 0 },
            { id: 2, question: 'Which HTML tag defines the largest heading?', options: ['<h6>', '<h1>', '<heading>', '<head>'], correctAnswer: 1 },
            { id: 3, question: 'Which HTML tag is used to create a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], correctAnswer: 1 },
            { id: 4, question: 'Which attribute specifies the destination URL of a link?', options: ['src', 'link', 'href', 'url'], correctAnswer: 2 },
            { id: 5, question: 'Which tag creates an unordered (bulleted) list?', options: ['<ol>', '<li>', '<ul>', '<list>'], correctAnswer: 2 },
        ],
    },
    'css-fund-video': {
        title: 'Quiz: CSS Fundamentals',
        materialName: 'CSS Fundamentals.mp4',
        questions: [
            { id: 6, question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], correctAnswer: 0 },
            { id: 7, question: 'Which CSS property changes the text color?', options: ['text-color', 'font-color', 'color', 'fgcolor'], correctAnswer: 2 },
            { id: 8, question: 'How do you link an external CSS file to an HTML document?', options: ['<style>', '<css>', '<link>', '<stylesheet>'], correctAnswer: 2 },
            { id: 9, question: 'Which CSS selector targets all elements on a page?', options: ['*', 'all', 'every', '#all'], correctAnswer: 0 },
            { id: 10, question: 'Which CSS property controls the text size?', options: ['text-size', 'font-size', 'text-style', 'font-style'], correctAnswer: 1 },
        ],
    },
    'html-forms-video': {
        title: 'Quiz: HTML Forms Tutorial',
        materialName: 'HTML Forms Tutorial.mp4',
        questions: [
            { id: 11, question: 'Which HTML element wraps form inputs for submission?', options: ['<input>', '<form>', '<fieldset>', '<label>'], correctAnswer: 1 },
            { id: 12, question: 'Which <label> attribute binds it to an <input> element id?', options: ['name', 'target', 'for', 'bind'], correctAnswer: 2 },
            { id: 13, question: 'Which input type masks typed characters?', options: ['text', 'hidden', 'password', 'secret'], correctAnswer: 2 },
            { id: 14, question: 'Which attribute makes an input field mandatory before submission?', options: ['mandatory', 'validate', 'required', 'must'], correctAnswer: 2 },
            { id: 15, question: 'Which element creates a dropdown selection list?', options: ['<dropdown>', '<select>', '<list>', '<options>'], correctAnswer: 1 },
        ],
    },
    'js-basics-video': {
        title: 'Quiz: JavaScript Basics',
        materialName: 'JavaScript Basics.mp4',
        questions: [
            { id: 16, question: 'Which keyword declares a variable that cannot be reassigned?', options: ['var', 'let', 'const', 'static'], correctAnswer: 2 },
            { id: 17, question: 'Which operator checks strict equality (both value and type) in JavaScript?', options: ['==', '===', '!=', '='], correctAnswer: 1 },
            { id: 18, question: 'Which array method creates a new array by transforming every element?', options: ['forEach', 'filter', 'map', 'reduce'], correctAnswer: 2 },
        ],
    },
    'html-tags-pdf': {
        title: 'Quiz: HTML Tags Reference',
        materialName: 'HTML Tags Reference.pdf',
        questions: [
            { id: 19, question: 'Which semantic HTML tag wraps primary navigation links?', options: ['<menu>', '<nav>', '<aside>', '<section>'], correctAnswer: 1 },
            { id: 20, question: 'Which tag correctly displays an image with alternative text?', options: ['<picture> with title', '<img> with alt', '<figure> with src', '<image> with desc'], correctAnswer: 1 },
            { id: 21, question: 'Which HTML tag defines a table row?', options: ['<td>', '<th>', '<tr>', '<row>'], correctAnswer: 2 },
        ],
    },
    'css-props-pdf': {
        title: 'Quiz: CSS Properties Guide',
        materialName: 'CSS Properties Guide.pdf',
        questions: [
            { id: 22, question: 'Which CSS property sets space inside an element between content and border?', options: ['margin', 'padding', 'gap', 'spacing'], correctAnswer: 1 },
            { id: 23, question: 'Which display value enables Flexbox layout on a container?', options: ['inline', 'block', 'flex', 'float'], correctAnswer: 2 },
            { id: 24, question: 'Which CSS property rounds the corners of an element?', options: ['corner-radius', 'border-round', 'border-radius', 'box-radius'], correctAnswer: 2 },
        ],
    },
};

// ==================== PARTICIPANTS ====================
export const participants = [
    {
        id: 1,
        name: 'Ahmad Sudirman',
        email: 'ahmad.sudirman@email.com',
        phone: '+62 812-3456-7890',
        scheme: 'Full Stack Web Development',
        status: 'active',
        progress: 75,
        joinDate: '2026-01-15',
        avatar: 'AS',
    },
    {
        id: 2,
        name: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@email.com',
        phone: '+62 813-9876-5432',
        scheme: 'Data Science & ML',
        status: 'active',
        progress: 60,
        joinDate: '2026-01-20',
        avatar: 'SN',
    },
    {
        id: 3,
        name: 'Budi Santoso',
        email: 'budi.santoso@email.com',
        phone: '+62 821-4567-8901',
        scheme: 'Full Stack Web Development',
        status: 'completed',
        progress: 100,
        joinDate: '2025-12-01',
        avatar: 'BS',
    },
    {
        id: 4,
        name: 'Rina Kartika',
        email: 'rina.kartika@email.com',
        phone: '+62 822-2345-6789',
        scheme: 'Data Science & ML',
        status: 'active',
        progress: 45,
        joinDate: '2026-02-01',
        avatar: 'RK',
    },
];

// ==================== CERTIFICATES ====================
export const certificates = [
    {
        id: 1,
        participantName: 'Budi Santoso',
        scheme: 'Full Stack Web Development',
        issueDate: '2026-05-30',
        certificateNumber: 'CERT-FSW-2026-001',
        status: 'issued',
    },
    {
        id: 2,
        participantName: 'Ahmad Sudirman',
        scheme: 'Full Stack Web Development',
        issueDate: '2026-06-01',
        certificateNumber: 'CERT-FSW-2026-002',
        status: 'pending',
    },
];

// ==================== TRAINING (JADWAL) ====================
export const trainings = [
    {
        id: 1,
        title: 'Workshop: Modern JavaScript',
        date: '2026-06-15',
        time: '09:00 - 12:00',
        instructor: 'John Doe',
        participants: 25,
        location: 'Online - Zoom',
        status: 'scheduled',
    },
    {
        id: 2,
        title: 'Bootcamp: React Development',
        date: '2026-06-20',
        time: '13:00 - 17:00',
        instructor: 'Jane Smith',
        participants: 30,
        location: 'Room 101',
        status: 'scheduled',
    },
];