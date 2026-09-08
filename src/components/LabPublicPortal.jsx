import { useState, useEffect } from "react";
import { 
    FlaskConical, 
    Calculator, 
    BookOpen, 
    Award, 
    HelpCircle, 
    Phone, 
    MapPin, 
    CheckCircle2, 
    Send, 
    Building2, 
    Shield
} from "lucide-react";
import LabTarifCatalog from "./LabTarifCatalog";
import LabCostCalculator from "./LabCostCalculator";
import LabBrochureView from "./LabBrochureView";
import { getStoredLabInfo, labWorkflow } from "../data/labTarifData";

export default function LabPublicPortal({ onNavigateToAdmin }) {
    const [currentLabInfo, setCurrentLabInfo] = useState(getStoredLabInfo());
    const [activeTab, setActiveTab] = useState("catalog"); // "catalog", "calculator", "brochure", "profile", "workflow"
    const [selectedItems, setSelectedItems] = useState([]);
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionData, setSubmissionData] = useState({
        nama: "",
        pekerjaan: "Petani / Perorangan",
        instansi: "",
        email: "",
        hp: "",
        jenisSampel: "Tanah",
        jumlahSampel: 1,
        metodeKirim: "Antar Langsung ke Lab BRMP DIY (Sleman)",
        catatan: ""
    });

    useEffect(() => {
        const handleUpdate = () => {
            setCurrentLabInfo(getStoredLabInfo());
        };
        window.addEventListener("labTarifDataUpdated", handleUpdate);
        return () => window.removeEventListener("labTarifDataUpdated", handleUpdate);
    }, []);

    // Handle adding / toggling item in calculator
    const handleSelectForCalculator = (item, categoryId) => {
        setSelectedItems((prev) => {
            const exists = prev.some((p) => p.id === item.id);
            if (exists) {
                return prev.filter((p) => p.id !== item.id);
            } else {
                return [...prev, { ...item, category: categoryId }];
            }
        });
    };

    const handleRemoveItem = (itemId) => {
        setSelectedItems((prev) => prev.filter((p) => p.id !== itemId));
    };

    const handleClearAll = () => {
        setSelectedItems([]);
    };

    const handleSubmitSampleForm = (e) => {
        e.preventDefault();
        setSubmissionSuccess(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-brand-500 selection:text-white">
            
            {/* Top Announcement Bar */}
            <div className="bg-[#123524] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold">
                            Laboratorium Kimia Tanah BRMP DIY • Akreditasi KAN LP-1751-IDN (Amd-2) • ISO/IEC 17025:2017
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-[11px]">
                        <span>📞 {currentLabInfo.phone}</span>
                        <span>💬 WA: {currentLabInfo.whatsapp}</span>
                        {onNavigateToAdmin && (
                            <button
                                onClick={() => onNavigateToAdmin("laboratorium")}
                                className="underline hover:text-white font-bold text-yellow-300"
                            >
                                Masuk ke Panel Admin (Kelola Tarif) →
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#123524] to-[#2ea95c] text-white font-black text-lg shadow-sm">
                            B
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-black text-slate-900 text-sm sm:text-base tracking-tight leading-none">
                                    Laboratorium Kimia Tanah BRMP DIY
                                </span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium block">
                                {currentLabInfo.regulation || "PP Tarif No. 28/2023 PNBP Kementerian Pertanian"}
                            </span>
                        </div>
                    </div>

                    {/* Navigation Pills */}
                    <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                        {[
                            { id: "catalog", label: "Data Tarif", icon: FlaskConical },
                            { id: "calculator", label: `Kalkulator Biaya (${selectedItems.length})`, icon: Calculator, badge: selectedItems.length > 0 },
                            { id: "brochure", label: "Brosur Digital", icon: BookOpen },
                            { id: "profile", label: "Profil & Akreditasi", icon: Award },
                            { id: "workflow", label: "Alur Uji", icon: HelpCircle }
                        ].map((nav) => {
                            const Icon = nav.icon;
                            const isActive = activeTab === nav.id;
                            return (
                                <button
                                    key={nav.id}
                                    onClick={() => setActiveTab(nav.id)}
                                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                                        isActive
                                            ? "bg-[#123524] text-white shadow-sm"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-white"
                                    }`}
                                >
                                    <Icon size={14} />
                                    <span>{nav.label}</span>
                                    {nav.badge && (
                                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-slate-900 text-[10px] font-black">
                                            {selectedItems.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Action Button */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSubmissionModal(true)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 shadow-sm transition"
                        >
                            <Send size={13} />
                            <span>Ajukan Uji Sampel</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Nav Scroller */}
                <div className="md:hidden flex overflow-x-auto gap-1.5 p-2 border-t border-slate-200 bg-slate-50">
                    {[
                        { id: "catalog", label: "Data Tarif" },
                        { id: "calculator", label: `Kalkulator (${selectedItems.length})` },
                        { id: "brochure", label: "Brosur" },
                        { id: "profile", label: "Profil & ISO" },
                        { id: "workflow", label: "Alur Uji" }
                    ].map((nav) => (
                        <button
                            key={nav.id}
                            onClick={() => setActiveTab(nav.id)}
                            className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-bold ${
                                activeTab === nav.id ? "bg-[#123524] text-white" : "bg-white text-slate-700 border border-slate-200"
                            }`}
                        >
                            {nav.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Direct Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {activeTab === "catalog" && (
                    <LabTarifCatalog
                        onSelectForCalculator={handleSelectForCalculator}
                        selectedItems={selectedItems}
                    />
                )}

                {activeTab === "calculator" && (
                    <LabCostCalculator
                        selectedItems={selectedItems}
                        onRemoveItem={handleRemoveItem}
                        onClearAll={handleClearAll}
                        onAddItem={handleSelectForCalculator}
                        onNavigateToForm={() => setShowSubmissionModal(true)}
                    />
                )}

                {activeTab === "brochure" && (
                    <LabBrochureView />
                )}

                {activeTab === "profile" && (
                    <div className="space-y-6">
                        {/* Pendahuluan Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="max-w-3xl">
                                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block mb-1">
                                    PROFIL & LEGALITAS
                                </span>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                    Laboratorium Kimia Tanah BRMP DIY
                                </h2>
                                <p className="mt-3 text-slate-600 leading-relaxed text-xs sm:text-sm">
                                    {labInfo.introText}
                                </p>
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                                    <Shield className="text-emerald-700 mb-1" size={20} />
                                    <h4 className="text-sm font-black text-slate-900">Akreditasi KAN</h4>
                                    <p className="text-xs text-slate-600 mt-0.5">
                                        Nomor: <strong>{labInfo.accreditation.certNumber}</strong>
                                    </p>
                                </div>
                                <div className="rounded-xl bg-sky-50 border border-sky-200 p-4">
                                    <Award className="text-sky-700 mb-1" size={20} />
                                    <h4 className="text-sm font-black text-slate-900">Standar ISO</h4>
                                    <p className="text-xs text-slate-600 mt-0.5">
                                        <strong>ISO/IEC 17025:2017 & ILAC-MRA</strong>
                                    </p>
                                </div>
                                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                                    <Building2 className="text-amber-700 mb-1" size={20} />
                                    <h4 className="text-sm font-black text-slate-900">Regulasi Tarif</h4>
                                    <p className="text-xs text-slate-600 mt-0.5">
                                        <strong>PP No. 28/2023</strong> PNBP Kementan
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ruang Lingkup Pengujian */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 mb-3">
                                Ruang Lingkup Pengujian
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2 text-xs">
                                <div className="rounded-xl border border-slate-200 p-4 space-y-1.5">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                        Fisika & Kimia Tanah
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        pH (H2O & KCl), C-Organik, N-Total, P & K tersedia, KTK, Kejenuhan Basa, Salinitas/DHL, Tekstur 3 fraksi, Bulk Density, Porositas, Permeabilitas, pF, dan logam berat (Pb, Cd, Mo, Ni, Co, As, Hg).
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-4 space-y-1.5">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                        Pengujian Jaringan Tanaman
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        Analisis daun, batang, akar, dan buah tanaman: Hara makro (N, P, K, Ca, Mg, S) & mikro (Fe, Mn, Cu, Zn, B), C-Organik, serta cemaran logam berat (Pb, Cd, Co, Al, Si).
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-4 space-y-1.5">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                        Mutu Pupuk Organik & Anorganik
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        N Total, P, K, Ca, Mg, mikro, C-Organik, rasio C/N, kadar abu, pH H2O, KTK, setara CaCO3, bahan ikutan, dan logam berat (Pb, Cd, Ni, Cr, Mo, As, Hg).
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-4 space-y-1.5">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                        Pengujian Kualitas Air
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        Kadar lumpur, pH, DHL, N-NH4, NO3, Ca, Mg, PO4, SO4, K, Na, Fe, Mn, Cu, Zn, serta logam berat ppm & ppb (As, Hg).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "workflow" && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-4">
                            Alur & Prosedur Pengujian Laboratorium
                        </h2>
                        <div className="space-y-4">
                            {labWorkflow.map((flow) => (
                                <div key={flow.step} className="flex gap-3.5 items-start">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-sm shrink-0">
                                        {flow.step}
                                    </div>
                                    <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                                        <h4 className="text-sm font-black text-slate-900">
                                            {flow.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                            {flow.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-[#123524] text-white border-t border-emerald-900/60 py-6 px-4 sm:px-6 lg:px-8 mt-10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-3">
                    <div>
                        <span className="font-bold text-white">Laboratorium Kimia Tanah BRMP DIY</span> • {currentLabInfo.address}
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                        <span>Telp: {currentLabInfo.phone}</span>
                        <span>WA: {currentLabInfo.whatsapp}</span>
                    </div>
                </div>
            </footer>

            {/* Modal: Formulir Permohonan Pengujian Sampel */}
            {showSubmissionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <div>
                                <h3 className="text-base font-black text-slate-900">
                                    Formulir Pengajuan Uji Sampel Lab
                                </h3>
                                <p className="text-[11px] text-slate-500">
                                    Laboratorium Kimia Tanah BRMP DIY • ISO/IEC 17025:2017
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowSubmissionModal(false);
                                    setSubmissionSuccess(false);
                                }}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                ✕
                            </button>
                        </div>

                        {submissionSuccess ? (
                            <div className="py-6 text-center space-y-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                                    <CheckCircle2 size={28} />
                                </div>
                                <h4 className="text-lg font-black text-slate-900">
                                    Permohonan Terkirim
                                </h4>
                                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 text-xs text-slate-700 space-y-1 text-left max-w-sm mx-auto">
                                    <p><strong>Nama:</strong> {submissionData.nama}</p>
                                    <p><strong>Sampel:</strong> {submissionData.jenisSampel} ({submissionData.jumlahSampel} contoh)</p>
                                    <p><strong>Metode:</strong> {submissionData.metodeKirim}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowSubmissionModal(false);
                                        setSubmissionSuccess(false);
                                    }}
                                    className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2"
                                >
                                    Tutup
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitSampleForm} className="mt-4 space-y-3 text-xs">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">
                                        Nama Lengkap Pemohon *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Budi Santoso"
                                        value={submissionData.nama}
                                        onChange={(e) => setSubmissionData({ ...submissionData, nama: e.target.value })}
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                    />
                                </div>

                                <div className="grid gap-2 sm:grid-cols-2">
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">
                                            Kategori Pemohon *
                                        </label>
                                        <select
                                            value={submissionData.pekerjaan}
                                            onChange={(e) => setSubmissionData({ ...submissionData, pekerjaan: e.target.value })}
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                        >
                                            <option value="Petani / Perorangan">Petani / Perorangan</option>
                                            <option value="Kelompok Tani">Kelompok Tani (Poktan)</option>
                                            <option value="Mahasiswa / Peneliti">Mahasiswa / Peneliti</option>
                                            <option value="Instansi Pemerintah">Instansi Pemerintah</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">
                                            Nomor WhatsApp / HP *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Contoh: 081234567890"
                                            value={submissionData.hp}
                                            onChange={(e) => setSubmissionData({ ...submissionData, hp: e.target.value })}
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2 sm:grid-cols-2">
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">
                                            Jenis Sampel *
                                        </label>
                                        <select
                                            value={submissionData.jenisSampel}
                                            onChange={(e) => setSubmissionData({ ...submissionData, jenisSampel: e.target.value })}
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                        >
                                            <option value="Tanah">Tanah</option>
                                            <option value="Tanaman">Tanaman / Daun</option>
                                            <option value="Pupuk">Pupuk</option>
                                            <option value="Air">Air Irigasi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">
                                            Jumlah Sampel *
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            required
                                            value={submissionData.jumlahSampel}
                                            onChange={(e) => setSubmissionData({ ...submissionData, jumlahSampel: parseInt(e.target.value) || 1 })}
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">
                                        Metode Penyerahan Sampel *
                                    </label>
                                    <select
                                        value={submissionData.metodeKirim}
                                        onChange={(e) => setSubmissionData({ ...submissionData, metodeKirim: e.target.value })}
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                    >
                                        <option value="Antar Langsung ke Lab BRMP DIY (Sleman)">Antar Langsung ke Lab BRMP DIY (Sleman)</option>
                                        <option value="Kirim via Ekspedisi / Kurir">Kirim via Kurir / Ekspedisi</option>
                                    </select>
                                </div>

                                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowSubmissionModal(false)}
                                        className="rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-[#15803d] hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 shadow-sm"
                                    >
                                        Kirim Permohonan
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
