import { useState } from "react";
import { 
    Award, 
    CheckCircle, 
    FileText, 
    MapPin, 
    Phone, 
    Printer, 
    Share2, 
    Sparkles, 
    ZoomIn,
    Globe,
    Layers,
    ShieldCheck
} from "lucide-react";
import { 
    useLabTarifData 
} from "../data/labTarifData";

export default function LabBrochureView() {
    const { categories: tarifCategories, labInfo } = useLabTarifData();
    const [activeSide, setActiveSide] = useState("cover"); // "cover" (Sisi Depan) or "tables" (Sisi Belakang)
    const [zoomLevel, setZoomLevel] = useState(1);

    const tanahCat = tarifCategories.find((c) => c.id === "tanah");
    const tanamanCat = tarifCategories.find((c) => c.id === "tanaman");
    const pupukCat = tarifCategories.find((c) => c.id === "pupuk");
    const airCat = tarifCategories.find((c) => c.id === "air");

    const formatRupiah = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="space-y-6">
            {/* Control Bar */}
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveSide("cover")}
                        className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                            activeSide === "cover"
                                ? "bg-[#123524] text-white shadow-md"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        Sisi 1: Profil, Layanan & Analisis Air
                    </button>
                    <button
                        onClick={() => setActiveSide("tables")}
                        className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                            activeSide === "tables"
                                ? "bg-[#123524] text-white shadow-md"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        Sisi 2: Pendahuluan & Tabel Tarif Lengkap (A, B, C)
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 transition"
                    >
                        <Printer size={14} />
                        Cetak Brosur
                    </button>
                </div>
            </div>

            {/* SISI 1: COVER & OVERVIEW */}
            {activeSide === "cover" && (
                <div className="rounded-[2.5rem] border border-slate-300 bg-white p-4 md:p-8 shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* PANEL 1 (Kiri): Foto Lab + Tabel D. ANALISIS AIR */}
                        <div className="flex flex-col rounded-3xl bg-slate-50 border border-slate-200 p-5 shadow-sm relative overflow-hidden">
                            {/* Decorative geometric blocks */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex gap-1.5">
                                    <div className="h-6 w-3 bg-[#123524] rounded-sm transform -skew-x-12" />
                                    <div className="h-6 w-3 bg-[#2ea95c] rounded-sm transform -skew-x-12" />
                                    <div className="h-6 w-3 bg-[#eab308] rounded-sm transform -skew-x-12" />
                                </div>
                                <div className="grid grid-cols-4 gap-1 opacity-40">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                                    ))}
                                </div>
                            </div>

                            {/* Section Header: D. ANALISIS AIR */}
                            <div className="border-b-2 border-slate-900 pb-2 mb-3">
                                <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                                    <span className="text-[#123524]">D.</span> ANALISIS AIR
                                </h3>
                            </div>

                            {/* Table D */}
                            <div className="flex-1 overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-inner mb-4">
                                <table className="min-w-full text-[11px] leading-tight">
                                    <thead className="bg-slate-200 text-slate-800 font-bold">
                                        <tr className="border-b border-slate-300">
                                            <th className="px-2 py-1.5 text-center w-8">NO</th>
                                            <th className="px-2 py-1.5 text-left">JENIS ANALISIS</th>
                                            <th className="px-2 py-1.5 text-right w-24">TARIF (Rp)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 text-slate-700">
                                        {airCat?.items.slice(0, 15).map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50">
                                                <td className="px-2 py-1 text-center font-semibold">{item.no}</td>
                                                <td className="px-2 py-1">{item.name}</td>
                                                <td className="px-2 py-1 text-right font-bold text-slate-900">{formatRupiah(item.price)}</td>
                                            </tr>
                                        ))}
                                        {/* Sub-items ppm */}
                                        <tr className="bg-slate-100 font-bold text-slate-800">
                                            <td colSpan="3" className="px-2 py-1 italic">Determinasi Unsur (ppm) :</td>
                                        </tr>
                                        {airCat?.items.find((i) => i.id === "W-16")?.subItems?.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-slate-50">
                                                <td className="px-2 py-0.5 text-center text-slate-400">•</td>
                                                <td className="px-2 py-0.5 pl-4">{sub.name}</td>
                                                <td className="px-2 py-0.5 text-right font-bold text-slate-900">{formatRupiah(sub.price)}</td>
                                            </tr>
                                        ))}
                                        {/* Sub-items ppb */}
                                        <tr className="bg-slate-100 font-bold text-slate-800">
                                            <td colSpan="3" className="px-2 py-1 italic">Determinasi Unsur (ppb) :</td>
                                        </tr>
                                        {airCat?.items.find((i) => i.id === "W-17")?.subItems?.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-slate-50">
                                                <td className="px-2 py-0.5 text-center text-slate-400">•</td>
                                                <td className="px-2 py-0.5 pl-4">{sub.name}</td>
                                                <td className="px-2 py-0.5 text-right font-bold text-slate-900">{formatRupiah(sub.price)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Lab Scientist Illustration Footer */}
                            <div className="rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-50 p-3 border border-emerald-200 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                    ISO
                                </div>
                                <p className="text-[10px] text-emerald-900 leading-snug">
                                    Pengujian air irigasi & limbah pertanian memenuhi baku mutu permentan.
                                </p>
                            </div>
                        </div>

                        {/* PANEL 2 (Tengah): LAYANAN & SERTIFIKAT AKREDITASI */}
                        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#1b5e20] to-[#0d3813] text-white p-6 shadow-md relative overflow-hidden">
                            {/* Decorative angled shape */}
                            <div className="absolute -right-8 -top-8 h-28 w-28 bg-[#facc15] transform rotate-45 rounded-xl opacity-90" />
                            
                            <div>
                                <h3 className="text-3xl font-black tracking-tight text-white uppercase border-b border-white/20 pb-2">
                                    Layanan
                                </h3>
                                <p className="mt-4 text-xs text-white/90 leading-relaxed text-justify">
                                    {labInfo.serviceOverview}
                                </p>
                            </div>

                            {/* Sertifikat Akreditasi KAN Card */}
                            <div className="my-6 rounded-2xl bg-white p-4 text-slate-900 shadow-xl border border-amber-300">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-xs text-blue-900">ilac-MRA</span>
                                        <span className="font-black text-xs text-red-600">✓ KAN</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500">ISO/IEC 17025:2017</span>
                                </div>
                                <div className="mt-3 text-center">
                                    <h4 className="text-xs font-black tracking-wider text-amber-700 uppercase">
                                        SERTIFIKAT AKREDITASI
                                    </h4>
                                    <p className="text-[11px] font-bold text-slate-800 mt-1">
                                        Laboratorium Pengujian LP-1751-IDN (Amd-2)
                                    </p>
                                    <p className="text-[10px] text-slate-500 mt-1 font-semibold">
                                        Balai Penerapan Modernisasi Pertanian Yogyakarta
                                    </p>
                                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold text-emerald-800">
                                        <ShieldCheck size={12} /> Terakreditasi Nasional & Internasional
                                    </div>
                                </div>
                            </div>

                            {/* Contact & Address Footer */}
                            <div className="rounded-2xl bg-black/25 p-4 backdrop-blur-sm border border-white/10 space-y-2 text-xs">
                                <div className="flex items-start gap-2">
                                    <MapPin size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-white/90 leading-tight">
                                        {labInfo.address}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 pt-1">
                                    <Phone size={16} className="text-yellow-400 shrink-0" />
                                    <p className="text-[11px] text-white/90 font-bold">
                                        {labInfo.phone} / {labInfo.whatsapp}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* PANEL 3 (Kanan): COVER UTAMA & IDENTITAS */}
                        <div className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                            {/* Logo Top Right */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123524] text-white font-black text-sm shadow-md">
                                        BRMP
                                    </div>
                                    <div>
                                        <span className="text-xs font-black text-slate-900 block leading-none">BRMP DIY</span>
                                        <span className="text-[9px] text-slate-500 font-semibold">Kementerian Pertanian</span>
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="h-5 w-2 bg-[#2ea95c] rounded-sm transform skew-x-12" />
                                    <div className="h-5 w-2 bg-[#eab308] rounded-sm transform skew-x-12" />
                                </div>
                            </div>

                            {/* Main Giant Titles */}
                            <div className="my-8">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                    Laboratorium <br />
                                    <span className="text-[#123524]">Kimia Tanah</span> <br />
                                    <span className="text-[#2ea95c]">BRMP DIY</span>
                                </h1>
                                <p className="mt-3 text-xs text-slate-600 leading-relaxed font-medium">
                                    Penyedia jasa analisis fisika & kimia tanah, tanaman, pupuk, dan air terpercaya berbasis sains & standar ISO.
                                </p>
                            </div>

                            {/* Decorative Dot Matrix */}
                            <div className="grid grid-cols-6 gap-2 my-2 w-32 opacity-30">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                                ))}
                            </div>

                            {/* Agro Modern Logo & Tagline Footer */}
                            <div className="border-t border-slate-200 pt-4 flex items-end justify-between">
                                <div>
                                    <p className="text-xs italic font-bold text-slate-800">
                                        "{labInfo.tagline}"
                                    </p>
                                    <p className="text-[11px] text-brand-700 font-semibold mt-0.5">
                                        {labInfo.website}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 bg-emerald-50 rounded-xl px-2.5 py-1.5 border border-emerald-200">
                                    <div className="h-4 w-4 bg-[#2ea95c] rounded-sm rotate-45" />
                                    <span className="text-[10px] font-black text-[#123524]">AGRO MODERN</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* SISI 2: TABEL TARIF LENGKAP A, B, C & PENDAHULUAN */}
            {activeSide === "tables" && (
                <div className="rounded-[2.5rem] border border-slate-300 bg-white p-4 md:p-8 shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* PANEL 1 (Kiri): PENDAHULUAN */}
                        <div className="flex flex-col justify-between rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-sm">
                            <div>
                                <div className="flex items-center gap-2 border-b-2 border-[#123524] pb-2 mb-4">
                                    <div className="h-4 w-2 bg-[#2ea95c] rounded-sm" />
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                                        PENDAHULUAN
                                    </h3>
                                </div>

                                <div className="space-y-4 text-xs text-slate-700 leading-relaxed text-justify">
                                    <p>
                                        Balai Penerapan Modernisasi Pertanian Daerah Istimewa Yogyakarta (BRMP DIY) melaksanakan tugas pokok dan fungsinya dengan dukungan SDM serta sarana prasarana yang memadai.
                                    </p>
                                    <p>
                                        Salah satu sarana yang dimiliki adalah <strong>Laboratorium berstandar internasional (ISO)</strong> dengan sertifikat <strong>ISO/IEC 17025:2017</strong> yang diterbitkan oleh Komite Akreditasi Nasional (KAN) dengan nomor sertifikat <strong>LP-1751-IDN (Amd-2)</strong>.
                                    </p>
                                    <p>
                                        Laboratorium BRMP DIY memberikan layanan pengujian fisika dan kimia tanah, pengujian jaringan tanaman, pengujian pupuk organik maupun anorganik, serta pengujian air. Layanan ini tidak hanya untuk mendukung kegiatan BRMP DIY, tetapi juga <strong>terbuka bagi masyarakat, pemerintah daerah, swasta, perguruan tinggi, mahasiswa, dan petani</strong>.
                                    </p>
                                </div>
                            </div>

                            {/* Badge ISO & KAN */}
                            <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#123524] to-[#1e5a37] p-4 text-white">
                                <div className="flex items-center gap-2 mb-1">
                                    <Award className="text-yellow-400" size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">Akreditasi Resmi</span>
                                </div>
                                <p className="text-xs font-semibold text-white/90">
                                    ISO/IEC 17025:2017 • LP-1751-IDN (Amd-2)
                                </p>
                            </div>
                        </div>

                        {/* PANEL 2 (Tengah): BIAYA PENGUJIAN & A. ANALISIS TANAH */}
                        <div className="flex flex-col rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                    Biaya pengujian
                                </h3>
                                <p className="text-xs text-emerald-800 font-bold mt-1 bg-emerald-50 inline-block px-2.5 py-1 rounded-lg border border-emerald-200">
                                    * {labInfo.regulation}
                                </p>
                            </div>

                            {/* Header: A. ANALISIS TANAH */}
                            <div className="border-b-2 border-slate-900 pb-1.5 mb-2 flex items-center justify-between">
                                <h4 className="text-sm font-black text-slate-900">
                                    A. ANALISIS TANAH
                                </h4>
                                <span className="text-[10px] text-slate-500 font-bold">18 Parameter</span>
                            </div>

                            {/* Table A: Tanah */}
                            <div className="flex-1 overflow-x-auto rounded-xl border border-slate-300 bg-white max-h-[550px] overflow-y-auto">
                                <table className="min-w-full text-[10px] leading-tight">
                                    <thead className="bg-slate-100 text-slate-800 font-bold sticky top-0 border-b border-slate-300">
                                        <tr>
                                            <th className="px-2 py-1 text-center w-6">NO</th>
                                            <th className="px-2 py-1 text-left">JENIS ANALISIS</th>
                                            <th className="px-2 py-1 text-right w-20">TARIF (Rp)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 text-slate-700">
                                        {tanahCat?.items.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50">
                                                <td className="px-2 py-1 text-center font-bold">{item.no}</td>
                                                <td className="px-2 py-1">
                                                    <span className="font-semibold text-slate-900">{item.name}</span>
                                                    {item.subItems && (
                                                        <div className="pl-2 mt-0.5 space-y-0.5 text-[9.5px] text-slate-600">
                                                            {item.subItems.map((s) => (
                                                                <div key={s.id} className="flex justify-between">
                                                                    <span>- {s.name}</span>
                                                                    <span className="font-bold">{formatRupiah(s.price)}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-2 py-1 text-right font-bold text-slate-900 align-top">
                                                    {formatRupiah(item.price)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* PANEL 3 (Kanan): B. ANALISIS TANAMAN & C. ANALISIS PUPUK */}
                        <div className="flex flex-col gap-6">
                            
                            {/* Section B: Tanaman */}
                            <div className="rounded-3xl bg-white border border-slate-200 p-4 shadow-sm">
                                <div className="border-b-2 border-slate-900 pb-1.5 mb-2 flex items-center justify-between">
                                    <h4 className="text-xs font-black text-slate-900 uppercase">
                                        B. ANALISIS TANAMAN
                                    </h4>
                                    <span className="text-[10px] text-slate-500 font-bold">4 Parameter</span>
                                </div>
                                <div className="overflow-x-auto rounded-xl border border-slate-300 max-h-48 overflow-y-auto">
                                    <table className="min-w-full text-[10px] leading-tight">
                                        <thead className="bg-slate-100 text-slate-800 font-bold sticky top-0">
                                            <tr>
                                                <th className="px-2 py-1 text-center w-6">NO</th>
                                                <th className="px-2 py-1 text-left">JENIS ANALISIS</th>
                                                <th className="px-2 py-1 text-right w-20">TARIF (Rp)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {tanamanCat?.items.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50">
                                                    <td className="px-2 py-1 text-center font-bold">{item.no}</td>
                                                    <td className="px-2 py-1">
                                                        <span className="font-semibold text-slate-900">{item.name}</span>
                                                        {item.subItems && (
                                                            <div className="pl-2 mt-0.5 space-y-0.5 text-[9px] text-slate-600">
                                                                {item.subItems.slice(0, 6).map((s) => (
                                                                    <div key={s.id} className="flex justify-between">
                                                                        <span>- {s.name}</span>
                                                                        <span className="font-bold">{formatRupiah(s.price)}</span>
                                                                    </div>
                                                                ))}
                                                                <div className="text-[9px] text-slate-400 italic">
                                                                    +{item.subItems.length - 6} unsur lainnya...
                                                                </div>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-1 text-right font-bold text-slate-900 align-top">
                                                        {formatRupiah(item.price)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Section C: Pupuk */}
                            <div className="rounded-3xl bg-white border border-slate-200 p-4 shadow-sm flex-1 flex flex-col">
                                <div className="border-b-2 border-slate-900 pb-1.5 mb-2 flex items-center justify-between">
                                    <h4 className="text-xs font-black text-slate-900 uppercase">
                                        C. ANALISIS PUPUK
                                    </h4>
                                    <span className="text-[10px] text-slate-500 font-bold">10 Parameter</span>
                                </div>
                                <div className="overflow-x-auto rounded-xl border border-slate-300 flex-1 max-h-64 overflow-y-auto">
                                    <table className="min-w-full text-[10px] leading-tight">
                                        <thead className="bg-slate-100 text-slate-800 font-bold sticky top-0">
                                            <tr>
                                                <th className="px-2 py-1 text-center w-6">NO</th>
                                                <th className="px-2 py-1 text-left">JENIS ANALISIS</th>
                                                <th className="px-2 py-1 text-right w-20">TARIF (Rp)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {pupukCat?.items.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50">
                                                    <td className="px-2 py-1 text-center font-bold">{item.no}</td>
                                                    <td className="px-2 py-1">
                                                        <span className="font-semibold text-slate-900">{item.name}</span>
                                                        {item.subItems && (
                                                            <div className="pl-2 mt-0.5 space-y-0.5 text-[9px] text-slate-600">
                                                                {item.subItems.slice(0, 5).map((s) => (
                                                                    <div key={s.id} className="flex justify-between">
                                                                        <span>- {s.name}</span>
                                                                        <span className="font-bold">{formatRupiah(s.price)}</span>
                                                                    </div>
                                                                ))}
                                                                <div className="text-[9px] text-slate-400 italic">
                                                                    +{item.subItems.length - 5} unsur lainnya...
                                                                </div>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-1 text-right font-bold text-slate-900 align-top">
                                                        {formatRupiah(item.price)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
