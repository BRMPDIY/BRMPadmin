// Data Lengkap Tarif Layanan Laboratorium Kimia Tanah BRMP DIY
// Berdasarkan PP No. 28/2023 tentang Jenis dan Tarif atas Jenis Penerimaan Negara Bukan Pajak (PNBP) di Kementerian Pertanian
// Akreditasi ISO/IEC 17025:2017 Komite Akreditasi Nasional (KAN) No. LP-1751-IDN (Amd-2)

export const labInfo = {
    name: "Laboratorium Kimia Tanah",
    institution: "Balai Penerapan Modernisasi Pertanian Daerah Istimewa Yogyakarta (BRMP DIY)",
    kementerian: "Kementerian Pertanian Republik Indonesia",
    tagline: "Pertanian Bekerja Sepenuh Hati",
    website: "diy.brmp.pertanian.go.id",
    accreditation: {
        standard: "ISO/IEC 17025:2017",
        body: "Komite Akreditasi Nasional (KAN)",
        certNumber: "LP-1751-IDN (Amd-2)",
        international: "ILAC-MRA",
        validity: "Telah Terakreditasi Standar Internasional"
    },
    regulation: "PP Tarif No. 28/2023 tentang tarif PNBP di Kementerian Pertanian",
    address: "Jl. KepuhSari No.005 Maguwoharjo, Wedomartani, Ngemplak, Sleman, Daerah Istimewa Yogyakarta",
    phone: "(0274) 884662",
    whatsapp: "0858-7843-8548",
    email: "lab.brmpdiy@pertanian.go.id",
    serviceOverview: "Layanan pengujian analisa laboratorium tanah, pupuk, air dan tanaman meliputi analisa fisika dan kimia tanah, pengujian pupuk organik dan anorganik, pengujian air dan pengujian jaringan tanaman. Pelayanan yang dilakukan meliputi pengujian sampel tanah, pupuk, air dan tanaman. Pengujian meliputi unsur makro (N, P, K, C, S, B), unsur mikro (Na, Ca, Mg, Fe, Mn, Cu, Zn, Al, Si, Bo), logam berat (Pb, Cd, Co, Mo, As, Hg), pH, KTK, dan Kadar Lumpur.",
    introText: "Balai Penerapan Modernisasi Pertanian Daerah Istimewa Yogyakarta (BRMP DIY) melaksanakan tugas pokok dan fungsinya dengan dukungan SDM serta sarana prasarana yang memadai. Salah satu sarana yang dimiliki adalah Laboratorium berstandar internasional (ISO) dengan sertifikat ISO/IEC 17025:2017 yang diterbitkan oleh Komite Akreditasi Nasional (KAN) dengan nomor sertifikat LP-1751-IDN (Amd-2). Laboratorium BRMP DIY memberikan layanan pengujian fisika dan kimia tanah, pengujian jaringan tanaman, pengujian pupuk organik maupun anorganik, serta pengujian air. Layanan ini tidak hanya untuk mendukung kegiatan BRMP DIY, tetapi juga terbuka bagi masyarakat, pemerintah daerah, swasta, perguruan tinggi, mahasiswa, dan petani."
};

export const tarifCategories = [
    {
        id: "tanah",
        code: "A",
        title: "Analisis Tanah",
        badge: "Kategori A",
        iconName: "Mountain",
        description: "Pengujian fisika & kimia tanah, kesuburan, unsur hara makro, mikro, fraksi tekstur, KTK, dan kadar logam berat.",
        sampleMin: "500 gram contoh tanah kering angin / tanah komposit",
        items: [
            { id: "T-01", no: "1", name: "Persiapan contoh", unit: "Per contoh", price: 18000, category: "tanah" },
            { id: "T-02", no: "2", name: "pH H2O & pH KCl 1 M", unit: "Per contoh", price: 24000, category: "tanah" },
            { id: "T-03", no: "3", name: "C-Organik", unit: "Per contoh", price: 24000, category: "tanah" },
            { id: "T-04", no: "4", name: "Nitrogen (N-Total)", unit: "Per contoh", price: 30000, category: "tanah" },
            { id: "T-05", no: "5", name: "Salinitas / DHL", unit: "Per contoh", price: 12000, category: "tanah" },
            { id: "T-06", no: "6", name: "P tersedia (Bray / Olsen)", unit: "Per contoh", price: 30000, category: "tanah" },
            { id: "T-07", no: "7", name: "K tersedia (Morgan / NH4OAc)", unit: "Per contoh", price: 30000, category: "tanah" },
            {
                id: "T-08",
                no: "8",
                name: "Ekstraksi / Destruksi P & K Potensial",
                unit: "Per proses / parameter",
                price: 18000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-08-1", name: "Ekstraksi / Destruksi HCl 25%", price: 18000 },
                    { id: "T-08-2", name: "Determinasi P potensial", price: 18000 },
                    { id: "T-08-3", name: "Determinasi K potensial", price: 12000 }
                ]
            },
            {
                id: "T-09",
                no: "9",
                name: "NTK / Kejenuhan Basa",
                unit: "Per proses / unsur",
                price: 18000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-09-0", name: "Ekstraksi / Destruksi Kejenuhan Basa", price: 18000 },
                    { id: "T-09-1", name: "Determinasi Ca (Kalsium)", price: 18000 },
                    { id: "T-09-2", name: "Determinasi Mg (Magnesium)", price: 18000 },
                    { id: "T-09-3", name: "Determinasi K (Kalium)", price: 18000 },
                    { id: "T-09-4", name: "Determinasi Na (Natrium)", price: 12000 }
                ]
            },
            { id: "T-10", no: "10", name: "Kapasitas Tukar Kation (KTK)", unit: "Per contoh", price: 42000, category: "tanah" },
            {
                id: "T-11",
                no: "11",
                name: "Ekstraksi / Destruksi Al ddd dan H dd",
                unit: "Per proses / parameter",
                price: 60000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-11-1", name: "Ekstraksi / Destruksi", price: 60000 },
                    { id: "T-11-2", name: "Determinasi Al ddd dan H dd", price: 24000 }
                ]
            },
            {
                id: "T-12",
                no: "12",
                name: "Penetapan Unsur Makro & Mikro Total",
                unit: "Per proses / unsur",
                price: 30000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-12-0", name: "Ekstraksi Total", price: 30000 },
                    { id: "T-12-1", name: "Determinasi P (Fosfor)", price: 12000 },
                    { id: "T-12-2", name: "Determinasi K (Kalium)", price: 12000 },
                    { id: "T-12-3", name: "Determinasi Na (Natrium)", price: 12000 },
                    { id: "T-12-4", name: "Determinasi Ca (Kalsium)", price: 12000 },
                    { id: "T-12-5", name: "Determinasi Mg (Magnesium)", price: 12000 },
                    { id: "T-12-6", name: "Determinasi Fe (Besi)", price: 12000 },
                    { id: "T-12-7", name: "Determinasi Mn (Mangan)", price: 12000 },
                    { id: "T-12-8", name: "Determinasi Cu (Tembaga)", price: 12000 },
                    { id: "T-12-9", name: "Determinasi Zn (Seng)", price: 12000 },
                    { id: "T-12-10", name: "Determinasi Pb (Timbal)", price: 24000 },
                    { id: "T-12-11", name: "Determinasi Cd (Kadmium)", price: 24000 },
                    { id: "T-12-12", name: "Determinasi Co (Kobalt)", price: 24000 },
                    { id: "T-12-13", name: "Determinasi B (Boron)", price: 24000 }
                ]
            },
            {
                id: "T-13A",
                no: "13.a",
                name: "Penetapan Unsur Logam Berat Ekstraksi Total (ppm)",
                unit: "Per proses / unsur",
                price: 42000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-13A-0", name: "Ekstraksi Total (ppm)", price: 42000 },
                    { id: "T-13A-1", name: "Determinasi Pb (Timbal)", price: 24000 },
                    { id: "T-13A-2", name: "Determinasi Cd (Kadmium)", price: 24000 },
                    { id: "T-13A-3", name: "Determinasi Cu (Tembaga)", price: 24000 },
                    { id: "T-13A-4", name: "Determinasi Zn (Seng)", price: 24000 },
                    { id: "T-13A-5", name: "Determinasi Mo (Molibdenum)", price: 24000 },
                    { id: "T-13A-6", name: "Determinasi Ni (Nikel)", price: 24000 },
                    { id: "T-13A-7", name: "Determinasi Co (Kobalt)", price: 24000 }
                ]
            },
            {
                id: "T-13B",
                no: "13.b",
                name: "Penetapan Unsur Logam Berat Ekstraksi Total (ppb)",
                unit: "Per proses / unsur",
                price: 36000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-13B-0", name: "Ekstraksi Total (ppb)", price: 36000 },
                    { id: "T-13B-1", name: "Determinasi As (Arsenik)", price: 72000 },
                    { id: "T-13B-2", name: "Determinasi Hg (Merkuri / Raksa)", price: 72000 }
                ]
            },
            {
                id: "T-13C",
                no: "13.c",
                name: "Penetapan Unsur Makro & Mikro Tersedia",
                unit: "Per proses / unsur",
                price: 24000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-13C-0", name: "Ekstraksi Tersedia", price: 24000 },
                    { id: "T-13C-1", name: "Determinasi K (Kalium)", price: 12000 },
                    { id: "T-13C-2", name: "Determinasi Na (Natrium)", price: 12000 },
                    { id: "T-13C-3", name: "Determinasi Ca (Kalsium)", price: 12000 },
                    { id: "T-13C-4", name: "Determinasi Mg (Magnesium)", price: 12000 },
                    { id: "T-13C-5", name: "Determinasi Cu (Tembaga)", price: 12000 },
                    { id: "T-13C-6", name: "Determinasi Zn (Seng)", price: 12000 },
                    { id: "T-13C-7", name: "Determinasi NO3 (Nitrat)", price: 18000 },
                    { id: "T-13C-8", name: "Determinasi NH4 (Amonium)", price: 18000 },
                    { id: "T-13C-9", name: "Determinasi SO4 (Sulfat)", price: 18000 },
                    { id: "T-13C-10", name: "Determinasi Cl (Klorida)", price: 18000 },
                    { id: "T-13C-11", name: "Determinasi PO4 (Fosfat)", price: 18000 },
                    { id: "T-13C-12", name: "Determinasi SiO2 (Silika)", price: 18000 },
                    { id: "T-13C-13", name: "Determinasi Fe (Besi)", price: 18000 },
                    { id: "T-13C-14", name: "Determinasi Mn (Mangan)", price: 18000 },
                    { id: "T-13C-15", name: "Determinasi B (Boron)", price: 24000 }
                ]
            },
            {
                id: "T-13D",
                no: "13.d",
                name: "Penetapan Unsur Mikro Tersedia",
                unit: "Per proses / unsur",
                price: 18000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-13D-0", name: "Ekstraksi Tersedia", price: 18000 },
                    { id: "T-13D-1", name: "Determinasi Cu (Tembaga)", price: 12000 },
                    { id: "T-13D-2", name: "Determinasi Zn (Seng)", price: 12000 },
                    { id: "T-13D-3", name: "Determinasi Fe (Besi)", price: 12000 },
                    { id: "T-13D-4", name: "Determinasi Mn (Mangan)", price: 12000 }
                ]
            },
            {
                id: "T-13E",
                no: "13.e",
                name: "Penetapan Unsur Makro & Mikro Terlarut",
                unit: "Per proses / unsur",
                price: 12000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-13E-0", name: "Ekstraksi Terlarut", price: 12000 },
                    { id: "T-13E-1", name: "Determinasi K", price: 12000 },
                    { id: "T-13E-2", name: "Determinasi Na", price: 12000 },
                    { id: "T-13E-3", name: "Determinasi Fe", price: 12000 },
                    { id: "T-13E-4", name: "Determinasi Mn", price: 12000 },
                    { id: "T-13E-5", name: "Determinasi Cu", price: 12000 },
                    { id: "T-13E-6", name: "Determinasi Zn", price: 12000 },
                    { id: "T-13E-7", name: "Determinasi NO3", price: 18000 },
                    { id: "T-13E-8", name: "Determinasi NH4", price: 18000 },
                    { id: "T-13E-9", name: "Determinasi SO4", price: 18000 },
                    { id: "T-13E-10", name: "Determinasi Cl", price: 18000 },
                    { id: "T-13E-11", name: "Determinasi Ca", price: 18000 },
                    { id: "T-13E-12", name: "Determinasi Mg", price: 18000 },
                    { id: "T-13E-13", name: "Determinasi PO4", price: 18000 },
                    { id: "T-13E-14", name: "Determinasi Pb", price: 24000 },
                    { id: "T-13E-15", name: "Determinasi Cd", price: 24000 },
                    { id: "T-13E-16", name: "Determinasi B", price: 24000 }
                ]
            },
            {
                id: "T-13F",
                no: "13.f",
                name: "Ekstrak P-isofosfat",
                unit: "Per proses / unsur",
                price: 18000,
                category: "tanah",
                hasSubItems: true,
                subItems: [
                    { id: "T-13F-0", name: "Ekstraksi", price: 18000 },
                    { id: "T-13F-1", name: "Determinasi Fe", price: 24000 },
                    { id: "T-13F-2", name: "Determinasi Al", price: 24000 },
                    { id: "T-13F-3", name: "Determinasi Ca", price: 24000 }
                ]
            },
            { id: "T-14", no: "14", name: "BV dan Ruang Pori Total (Bulk Density & Porositas)", unit: "Per contoh", price: 27500, category: "tanah" },
            { id: "T-15", no: "15", name: "pF (pF 1; pF 2; pF 2,54; pF 4,2 - Kurva Retensi Air)", unit: "Per contoh", price: 80000, category: "tanah" },
            { id: "T-16", no: "16", name: "Permeabilitas Tanah", unit: "Per contoh", price: 22500, category: "tanah" },
            { id: "T-17", no: "17", name: "Particle Density (PD - Kerapatan Partikel)", unit: "Per contoh", price: 27500, category: "tanah" },
            { id: "T-18", no: "18", name: "Tekstur 3 Fraksi (Pasir, Debu, Liat)", unit: "Per contoh", price: 24000, category: "tanah" }
        ]
    },
    {
        id: "tanaman",
        code: "B",
        title: "Analisis Tanaman",
        badge: "Kategori B",
        iconName: "Leaf",
        description: "Pengujian jaringan tanaman (daun, batang, akar, buah) untuk kadar hara makro, mikro, N-total, C-organik, dan cemaran logam berat.",
        sampleMin: "200 gram contoh jaringan tanaman kering",
        items: [
            { id: "P-01", no: "1", name: "Persiapan contoh", unit: "Per contoh", price: 18000, category: "tanaman" },
            {
                id: "P-02",
                no: "2",
                name: "Penetapan Unsur Makro dan Mikro Tanaman",
                unit: "Per proses / unsur",
                price: 30000,
                category: "tanaman",
                hasSubItems: true,
                subItems: [
                    { id: "P-02-0", name: "Ekstraksi Total", price: 30000 },
                    { id: "P-02-1", name: "Determinasi P (Fosfor)", price: 12000 },
                    { id: "P-02-2", name: "Determinasi K (Kalium)", price: 12000 },
                    { id: "P-02-3", name: "Determinasi Na (Natrium)", price: 12000 },
                    { id: "P-02-4", name: "Determinasi Fe (Besi)", price: 12000 },
                    { id: "P-02-5", name: "Determinasi Mn (Mangan)", price: 12000 },
                    { id: "P-02-6", name: "Determinasi Cu (Tembaga)", price: 12000 },
                    { id: "P-02-7", name: "Determinasi Zn (Seng)", price: 12000 },
                    { id: "P-02-8", name: "Determinasi Ca (Kalsium)", price: 18000 },
                    { id: "P-02-9", name: "Determinasi Mg (Magnesium)", price: 18000 },
                    { id: "P-02-10", name: "Determinasi S (Sulfur/Belerang)", price: 18000 },
                    { id: "P-02-11", name: "Determinasi B (Boron)", price: 24000 },
                    { id: "P-02-12", name: "Determinasi Pb (Timbal)", price: 24000 },
                    { id: "P-02-13", name: "Determinasi Cd (Kadmium)", price: 24000 },
                    { id: "P-02-14", name: "Determinasi Co (Kobalt)", price: 24000 },
                    { id: "P-02-15", name: "Determinasi Al (Aluminium)", price: 24000 },
                    { id: "P-02-16", name: "Determinasi Si (Silikon)", price: 24000 }
                ]
            },
            { id: "P-03", no: "3", name: "Nitrogen (N-Total)", unit: "Per contoh", price: 30000, category: "tanaman" },
            { id: "P-04", no: "4", name: "C-Organik", unit: "Per contoh", price: 24000, category: "tanaman" }
        ]
    },
    {
        id: "pupuk",
        code: "C",
        title: "Analisis Pupuk",
        badge: "Kategori C",
        iconName: "Boxes",
        description: "Pengujian mutu pupuk organik & anorganik (kadar hara, bahan ikutan, kadar abu, pH, KTK, setara CaCO3, logam berat ppm & ppb).",
        sampleMin: "500 gram contoh pupuk padat / 500 mL pupuk cair",
        items: [
            { id: "F-01", no: "1", name: "Persiapan contoh", unit: "Per contoh", price: 30000, category: "pupuk" },
            { id: "F-02", no: "2", name: "Kadar Bahan Ikutan / Ukuran Partikel", unit: "Per contoh", price: 24000, category: "pupuk" },
            {
                id: "F-03",
                no: "3",
                name: "Penetapan Unsur Makro dan Mikro Pupuk",
                unit: "Per proses / unsur",
                price: 72000,
                category: "pupuk",
                hasSubItems: true,
                subItems: [
                    { id: "F-03-0A", name: "Ekstraksi Total", price: 72000 },
                    { id: "F-03-0B", name: "Ekstraksi Tersedia", price: 30000 },
                    { id: "F-03-0C", name: "Ekstraksi Air", price: 24000 },
                    { id: "F-03-1", name: "Determinasi P (Fosfor)", price: 30000 },
                    { id: "F-03-2", name: "Determinasi Ca (Kalsium)", price: 30000 },
                    { id: "F-03-3", name: "Determinasi Mg (Magnesium)", price: 30000 },
                    { id: "F-03-4", name: "Determinasi Fe (Besi)", price: 24000 },
                    { id: "F-03-5", name: "Determinasi K (Kalium)", price: 24000 },
                    { id: "F-03-6", name: "Determinasi Na (Natrium)", price: 24000 },
                    { id: "F-03-7", name: "Determinasi Cu (Tembaga)", price: 24000 },
                    { id: "F-03-8", name: "Determinasi Mn (Mangan)", price: 24000 },
                    { id: "F-03-9", name: "Determinasi Zn (Seng)", price: 24000 },
                    { id: "F-03-10", name: "Determinasi Co (Kobalt)", price: 24000 },
                    { id: "F-03-11", name: "Determinasi Al (Aluminium)", price: 35000 },
                    { id: "F-03-12", name: "Determinasi B (Boron)", price: 35000 }
                ]
            },
            { id: "F-04", no: "4", name: "Nitrogen Total (NH4, NO3, N-Organik)", unit: "Per contoh", price: 105000, category: "pupuk" },
            { id: "F-05", no: "5", name: "C-Organik", unit: "Per contoh", price: 24000, category: "pupuk" },
            { id: "F-06", no: "6", name: "Kadar Abu", unit: "Per contoh", price: 24000, category: "pupuk" },
            { id: "F-07", no: "7", name: "pH H2O", unit: "Per contoh", price: 18000, category: "pupuk" },
            { id: "F-08", no: "8", name: "Kapasitas Tukar Kation (KTK)", unit: "Per contoh", price: 35000, category: "pupuk" },
            { id: "F-09", no: "9", name: "Setara CaCO3", unit: "Per contoh", price: 30000, category: "pupuk" },
            {
                id: "F-10",
                no: "10",
                name: "Kadar Logam Berat Pupuk",
                unit: "Per proses / unsur",
                price: 72000,
                category: "pupuk",
                hasSubItems: true,
                subItems: [
                    { id: "F-10-0A", name: "Ekstraksi Total (ppm)", price: 72000 },
                    { id: "F-10-1", name: "Determinasi Pb (Timbal) ppm", price: 35000 },
                    { id: "F-10-2", name: "Determinasi Cd (Kadmium) ppm", price: 35000 },
                    { id: "F-10-3", name: "Determinasi Ni (Nikel) ppm", price: 35000 },
                    { id: "F-10-4", name: "Determinasi Cr (Kromium) ppm", price: 35000 },
                    { id: "F-10-5", name: "Determinasi Mo (Molibdenum) ppm", price: 35000 },
                    { id: "F-10-6", name: "Determinasi As (Arsenik) ppm", price: 35000 },
                    { id: "F-10-0B", name: "Ekstraksi Total (ppb)", price: 72000 },
                    { id: "F-10-7", name: "Determinasi As (Arsenik) ppb", price: 70000 },
                    { id: "F-10-8", name: "Determinasi Hg (Merkuri) ppb", price: 70000 }
                ]
            }
        ]
    },
    {
        id: "air",
        code: "D",
        title: "Analisis Air",
        badge: "Kategori D",
        iconName: "Droplets",
        description: "Pengujian kualitas air irigasi, air sumur, dan air limbah pertanian (kadar lumpur, pH, DHL, kation, anion, logam berat ppm & ppb).",
        sampleMin: "1000 - 2000 mL dalam botol bersih & kedap",
        items: [
            { id: "W-01", no: "1", name: "Kadar lumpur", unit: "Per contoh", price: 18000, category: "air" },
            { id: "W-02", no: "2", name: "pH", unit: "Per contoh", price: 14000, category: "air" },
            { id: "W-03", no: "3", name: "Daya Hantar Listrik (DHL)", unit: "Per contoh", price: 14000, category: "air" },
            { id: "W-04", no: "4", name: "N-NH4 (Amonium)", unit: "Per contoh", price: 18000, category: "air" },
            { id: "W-05", no: "5", name: "Ca (Kalsium)", unit: "Per contoh", price: 18000, category: "air" },
            { id: "W-06", no: "6", name: "Mg (Magnesium)", unit: "Per contoh", price: 18000, category: "air" },
            { id: "W-07", no: "7", name: "PO4 (Fosfat)", unit: "Per contoh", price: 18000, category: "air" },
            { id: "W-08", no: "8", name: "SO4 (Sulfat)", unit: "Per contoh", price: 18000, category: "air" },
            { id: "W-09", no: "9", name: "NO3 (Nitrat)", unit: "Per contoh", price: 24000, category: "air" },
            { id: "W-10", no: "10", name: "K (Kalium)", unit: "Per contoh", price: 19000, category: "air" },
            { id: "W-11", no: "11", name: "Na (Natrium)", unit: "Per contoh", price: 19000, category: "air" },
            { id: "W-12", no: "12", name: "Fe (Besi)", unit: "Per contoh", price: 19000, category: "air" },
            { id: "W-13", no: "13", name: "Mn (Mangan)", unit: "Per contoh", price: 19000, category: "air" },
            { id: "W-14", no: "14", name: "Cu (Tembaga)", unit: "Per contoh", price: 19000, category: "air" },
            { id: "W-15", no: "15", name: "Zn (Seng)", unit: "Per contoh", price: 19000, category: "air" },
            {
                id: "W-16",
                no: "16",
                name: "Determinasi Unsur Logam Berat (ppm)",
                unit: "Per unsur",
                price: 24000,
                category: "air",
                hasSubItems: true,
                subItems: [
                    { id: "W-16-1", name: "Pb (Timbal)", price: 24000 },
                    { id: "W-16-2", name: "Cd (Kadmium)", price: 24000 },
                    { id: "W-16-3", name: "Co (Kobalt)", price: 24000 },
                    { id: "W-16-4", name: "Cu (Tembaga)", price: 24000 },
                    { id: "W-16-5", name: "Mo (Molibdenum)", price: 24000 },
                    { id: "W-16-6", name: "As (Arsenik)", price: 24000 }
                ]
            },
            {
                id: "W-17",
                no: "17",
                name: "Determinasi Unsur Logam Berat (ppb)",
                unit: "Per unsur",
                price: 70000,
                category: "air",
                hasSubItems: true,
                subItems: [
                    { id: "W-17-1", name: "As (Arsenik) ppb", price: 70000 },
                    { id: "W-17-2", name: "Hg (Merkuri / Raksa) ppb", price: 70000 }
                ]
            }
        ]
    }
];

// Preset paket pengujian populer untuk kemudahan pengguna
export const popularPackages = [
    {
        id: "pkg-tanah-dasar",
        name: "Paket Kesuburan Tanah Dasar",
        category: "Tanah",
        description: "Evaluasi status hara tanah cepat untuk rekomendasi pemupukan padi, jagung, hortikultura.",
        itemIds: ["T-01", "T-02", "T-03", "T-04", "T-06", "T-07"],
        itemNames: ["Persiapan contoh", "pH H2O & KCl", "C-Organik", "Nitrogen", "P tersedia", "K tersedia"],
        totalPrice: 156000
    },
    {
        id: "pkg-tanah-lengkap",
        name: "Paket Karakterisasi Tanah Lengkap & KTK",
        category: "Tanah",
        description: "Analisis kimia komprehensif, KTK, salinitas, dan tekstur 3 fraksi tanah.",
        itemIds: ["T-01", "T-02", "T-03", "T-04", "T-05", "T-06", "T-07", "T-10", "T-18"],
        itemNames: ["Persiapan contoh", "pH H2O & KCl", "C-Organik", "Nitrogen", "Salinitas/DHL", "P tersedia", "K tersedia", "KTK", "Tekstur 3 Fraksi"],
        totalPrice: 222000
    },
    {
        id: "pkg-pupuk-organik",
        name: "Paket Mutu Pupuk Organik Kompos",
        category: "Pupuk",
        description: "Uji standar mutu pupuk organik padat (C/N rasio, hara makro, kadar abu, pH).",
        itemIds: ["F-01", "F-02", "F-04", "F-05", "F-06", "F-07"],
        itemNames: ["Persiapan contoh", "Bahan Ikutan", "N Total", "C-Organik", "Kadar Abu", "pH H2O"],
        totalPrice: 225000
    },
    {
        id: "pkg-air-irigasi",
        name: "Paket Kualitas Air Irigasi",
        category: "Air",
        description: "Pengujian kelayakan air untuk pertanian & hidroponik (pH, DHL, N-NH4, NO3, Ca, Mg, SO4).",
        itemIds: ["W-01", "W-02", "W-03", "W-04", "W-05", "W-06", "W-08", "W-09"],
        itemNames: ["Kadar lumpur", "pH", "DHL", "N-NH4", "Ca", "Mg", "SO4", "NO3"],
        totalPrice: 142000
    }
];

export const labWorkflow = [
    {
        step: 1,
        title: "Penyiapan & Pengemasan Sampel",
        desc: "Kumpulkan sampel tanah/pupuk/air/tanaman sesuai bobot minimal, beri label yang jelas (kode, lokasi, tanggal)."
    },
    {
        step: 2,
        title: "Pengisian Formulir Permohonan",
        desc: "Pilih parameter pengujian yang dibutuhkan via sistem online atau formulir SPK di laboratorium BRMP DIY."
    },
    {
        step: 3,
        title: "Penyerahan Sampel & Pembayaran PNBP",
        desc: "Serahkan sampel langsung ke Lab Sleman atau kirim melalui kurir. Pembayaran PNBP resmi sesuai PP 28/2023."
    },
    {
        step: 4,
        title: "Proses Pengujian Terakreditasi",
        desc: "Analisis dilakukan oleh analis bersertifikat menggunakan instrumen AAS, Spectrophotometer, Flame Photometer berstandar ISO 17025."
    },
    {
        step: 5,
        title: "Penerbitan Laporan Hasil Uji (LHU)",
        desc: "Laporan Hasil Uji resmi diterbitkan lengkap dengan tanda tangan pengesahan dan dapat diunduh (PDF) atau diambil hardcopy."
    }
];

// LocalStorage helpers for dynamic Admin editing
export const STORAGE_KEY_CATEGORIES = "brmp_lab_tarif_categories";
export const STORAGE_KEY_INFO = "brmp_lab_info";

export function getStoredTarifCategories() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Failed to load stored categories:", e);
    }
    return tarifCategories;
}

export function saveStoredTarifCategories(categories) {
    try {
        localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
        window.dispatchEvent(new Event("labTarifDataUpdated"));
    } catch (e) {
        console.error("Failed to save categories:", e);
    }
}

export function getStoredLabInfo() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_INFO);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Failed to load stored lab info:", e);
    }
    return labInfo;
}

export function saveStoredLabInfo(info) {
    try {
        localStorage.setItem(STORAGE_KEY_INFO, JSON.stringify(info));
        window.dispatchEvent(new Event("labTarifDataUpdated"));
    } catch (e) {
        console.error("Failed to save lab info:", e);
    }
}

export function resetStoredTarifData() {
    try {
        localStorage.removeItem(STORAGE_KEY_CATEGORIES);
        localStorage.removeItem(STORAGE_KEY_INFO);
        window.dispatchEvent(new Event("labTarifDataUpdated"));
    } catch (e) {
        console.error("Failed to reset stored data:", e);
    }
}

// Find item or sub-item across categories
export function findItemInCategories(categories, itemId) {
    if (!categories || !itemId) return null;
    for (const cat of categories) {
        for (const it of cat.items || []) {
            if (it.id === itemId) {
                return { 
                    ...it, 
                    category: cat.id, 
                    categoryCode: cat.code, 
                    categoryTitle: cat.title,
                    badge: cat.badge 
                };
            }
            if (it.subItems) {
                const sub = it.subItems.find((s) => s.id === itemId);
                if (sub) {
                    return { 
                        ...sub, 
                        parentName: it.name, 
                        parentId: it.id, 
                        unit: it.unit,
                        category: cat.id, 
                        categoryCode: cat.code, 
                        categoryTitle: cat.title,
                        badge: cat.badge 
                    };
                }
            }
        }
    }
    return null;
}

// Calculate total package price dynamically from stored categories
export function calculatePackagePrice(categories, itemIds) {
    if (!categories || !itemIds || !Array.isArray(itemIds)) return 0;
    return itemIds.reduce((sum, id) => {
        const item = findItemInCategories(categories, id);
        return sum + (item?.price || 0);
    }, 0);
}

// React Custom Hook for unified synchronization
import { useState, useEffect, useCallback } from "react";

export function useLabTarifData() {
    const [categories, setCategoriesState] = useState(getStoredTarifCategories);
    const [labInfoData, setLabInfoState] = useState(getStoredLabInfo);

    useEffect(() => {
        const handleUpdate = () => {
            setCategoriesState(getStoredTarifCategories());
            setLabInfoState(getStoredLabInfo());
        };

        window.addEventListener("labTarifDataUpdated", handleUpdate);
        window.addEventListener("storage", handleUpdate);
        return () => {
            window.removeEventListener("labTarifDataUpdated", handleUpdate);
            window.removeEventListener("storage", handleUpdate);
        };
    }, []);

    const saveCategories = useCallback((newCategories) => {
        setCategoriesState(newCategories);
        saveStoredTarifCategories(newCategories);
    }, []);

    const saveLabInfo = useCallback((newInfo) => {
        setLabInfoState(newInfo);
        saveStoredLabInfo(newInfo);
    }, []);

    const resetData = useCallback(() => {
        resetStoredTarifData();
        setCategoriesState(getStoredTarifCategories());
        setLabInfoState(getStoredLabInfo());
    }, []);

    const getItemById = useCallback((itemId) => {
        return findItemInCategories(categories, itemId);
    }, [categories]);

    return {
        categories,
        labInfo: labInfoData,
        saveCategories,
        saveLabInfo,
        resetData,
        getItemById
    };
}


