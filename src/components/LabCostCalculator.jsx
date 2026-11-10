import { useState, useMemo } from "react";
import { 
    Calculator, 
    Trash2, 
    Plus, 
    Printer, 
    Send, 
    FileText, 
    CheckCircle, 
    Building, 
    User, 
    Phone, 
    MapPin, 
    Receipt, 
    RotateCcw,
    Sparkles,
    ShieldCheck,
    Info
} from "lucide-react";
import { 
    popularPackages, 
    useLabTarifData 
} from "../data/labTarifData";

export default function LabCostCalculator({ 
    selectedItems = [], 
    onRemoveItem, 
    onClearAll, 
    onAddItem,
    onNavigateToForm
}) {
    const { 
        categories: currentCategories, 
        labInfo: currentLabInfo, 
        getItemById 
    } = useLabTarifData();

    const [sampleCount, setSampleCount] = useState(1);
    const [customerName, setCustomerName] = useState("");
    const [customerType, setCustomerType] = useState("Petani / Perorangan");
    const [institution, setInstitution] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [showTarifInfo, setShowTarifInfo] = useState(false);

    const formatRupiah = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(val || 0);
    };

    // Dynamically resolve items with latest prices and names from stored categories
    const dynamicSelectedItems = useMemo(() => {
        return selectedItems.map((item) => {
            const fresh = getItemById(item.id);
            return {
                ...item,
                name: fresh?.name || item.name,
                price: typeof fresh?.price === "number" ? fresh.price : (item.price || 0),
                parentName: fresh?.parentName || item.parentName,
                category: fresh?.category || item.category
            };
        });
    }, [selectedItems, getItemById]);

    // Calculate totals dynamically
    const costBreakdown = useMemo(() => {
        const subtotalPerSample = dynamicSelectedItems.reduce((sum, item) => sum + (item.price || 0), 0);
        const grandTotal = subtotalPerSample * Math.max(1, sampleCount);

        return {
            subtotalPerSample,
            sampleCount: Math.max(1, sampleCount),
            grandTotal,
            itemCount: dynamicSelectedItems.length
        };
    }, [dynamicSelectedItems, sampleCount]);

    // Dynamically calculate preset package totals
    const dynamicPopularPackages = useMemo(() => {
        return popularPackages.map((pkg) => {
            let calculatedTotal = 0;
            pkg.itemIds.forEach((id) => {
                const fresh = getItemById(id);
                if (fresh) {
                    calculatedTotal += (fresh.price || 0);
                }
            });
            return {
                ...pkg,
                totalPrice: calculatedTotal || pkg.totalPrice
            };
        });
    }, [getItemById]);

    // Handle preset quick package
    const handleAddPackage = (pkg) => {
        pkg.itemIds.forEach((id) => {
            const fresh = getItemById(id);
            if (fresh && !selectedItems.some((s) => s.id === fresh.id)) {
                onAddItem(fresh, fresh.category);
            }
        });
    };

    const handleSendWhatsApp = () => {
        const itemList = dynamicSelectedItems
            .map((item, idx) => `${idx + 1}. ${item.name} (${formatRupiah(item.price)})`)
            .join("%0A");

        const cleanPhone = (currentLabInfo.whatsapp || "085878438548").replace(/\D/g, "");
        const targetWa = cleanPhone.startsWith("0") ? `62${cleanPhone.slice(1)}` : cleanPhone;
        const regText = currentLabInfo.regulation || "PP 28/2023";

        const text = `*PENGAJUAN & KONSULTASI UJI SAMPEL LABORATORIUM*%0A` +
            `Laboratorium Kimia Tanah BRMP DIY • ISO/IEC 17025:2017%0A%0A` +
            `*Data Pemohon:*%0A` +
            `- Nama: ${customerName || "-"}%0A` +
            `- Kategori/Instansi: ${customerType} ${institution ? `(${institution})` : ""}%0A` +
            `- No. WhatsApp/HP: ${phone || "-"}%0A` +
            `- Lokasi/Lahan: ${location || "-"}%0A%0A` +
            `*Rincian Sampel & Parameter Uji:*%0A` +
            `- Jumlah Sampel: ${sampleCount} contoh%0A` +
            `- Metode Penyerahan: Antar Langsung ke Lab BRMP DIY (Sleman)%0A` +
            `- Parameter yang Dipilih (${dynamicSelectedItems.length}):%0A${itemList}%0A%0A` +
            `*Total Estimasi Biaya PNBP (${regText}):* ${formatRupiah(costBreakdown.grandTotal)}%0A%0A` +
            `Mohon dilakukan pengecekan dan tindak lanjut terhadap pengajuan tersebut untuk verifikasi sampel, penentuan tarif, jadwal, dan prosedur pengujian. Terima kasih!`;

        const waUrl = `https://wa.me/${targetWa}?text=${text}`;
        window.open(waUrl, "_blank");
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md">
                            <Calculator size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">
                                Kalkulator Estimasi Biaya Pengujian
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Hitung simulasi biaya PNBP resmi sesuai {currentLabInfo.regulation || "PP No. 28/2023"} sebelum mengirimkan sampel ke laboratorium
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {dynamicSelectedItems.length > 0 && (
                            <button
                                onClick={onClearAll}
                                className="inline-flex items-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                            >
                                <RotateCcw size={14} />
                                Reset Pilihan
                            </button>
                        )}
                        <button
                            onClick={() => setShowReceiptModal(true)}
                            disabled={dynamicSelectedItems.length === 0}
                            className="inline-flex items-center gap-1.5 rounded-2xl bg-[#123524] text-white px-4 py-2 text-xs font-bold hover:bg-emerald-950 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            <Receipt size={14} />
                            Lihat Nota Estimasi
                        </button>
                    </div>
                </div>
            </div>

            {/* Main 2 Column Grid */}
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Left Column: Selected Items & Preset Packages */}
                <div className="space-y-6">
                    {/* Selected Parameters Box */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">
                                    Parameter Pengujian Dipilih ({dynamicSelectedItems.length})
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Pilih parameter dari katalog tarif di bawah atau klik paket rekomendasi
                                </p>
                            </div>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                                {sampleCount} Sampel
                            </span>
                        </div>

                        {dynamicSelectedItems.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
                                <Calculator size={40} className="mx-auto text-slate-300 mb-3" />
                                <h4 className="text-sm font-bold text-slate-700">Belum ada parameter dipilih</h4>
                                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                                    Silakan klik tombol "Pilih" pada tabel katalog tarif atau pilih salah satu paket cepat di bawah ini untuk memulai simulasi.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                                {dynamicSelectedItems.map((item, index) => (
                                    <div
                                        key={`${item.id}-${index}`}
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 transition hover:bg-white hover:shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black text-emerald-800">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <h4 className="text-xs font-black text-slate-900">
                                                    {item.name}
                                                </h4>
                                                {item.parentName && (
                                                    <span className="text-[10px] text-slate-500 block">
                                                        Bagian dari: {item.parentName}
                                                    </span>
                                                )}
                                                <span className="text-[10px] text-emerald-700 font-semibold">
                                                    {item.category ? item.category.toUpperCase() : "LAB"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black text-slate-900">
                                                {formatRupiah(item.price)}
                                            </span>
                                            <button
                                                onClick={() => onRemoveItem(item.id)}
                                                className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                                                title="Hapus parameter"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Quick Preset Packages */}
                        <div className="mt-6 pt-4 border-t border-slate-100">
                            <span className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-3">
                                Tambah Paket Cepat:
                            </span>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {dynamicPopularPackages.map((pkg) => (
                                    <button
                                        key={pkg.id}
                                        onClick={() => handleAddPackage(pkg)}
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-brand-500 hover:bg-emerald-50/30 group"
                                    >
                                        <div>
                                            <span className="text-xs font-bold text-slate-800 group-hover:text-brand-700 block">
                                                {pkg.name}
                                            </span>
                                            <span className="text-[11px] text-slate-500">
                                                {pkg.itemNames.length} Parameter • {formatRupiah(pkg.totalPrice)}
                                            </span>
                                        </div>
                                        <Plus size={16} className="text-brand-600 group-hover:scale-110 transition" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer Info & Cost Calculation Summary */}
                <div className="space-y-6">
                    {/* Calculation Card */}
                    <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                                <Receipt className="text-emerald-700" size={18} />
                                <h3 className="text-lg font-black text-slate-900">Ringkasan Biaya PNBP</h3>
                            </div>
                            <span className="rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5">
                                {currentLabInfo.regulation ? currentLabInfo.regulation.split(" ")[0] + " " + (currentLabInfo.regulation.split(" ")[1] || "") : "PNBP"}
                            </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="rounded-2xl bg-white border border-slate-200 p-4 mb-4">
                            <label className="text-xs font-bold text-slate-700 block mb-2">
                                Jumlah Sampel / Titik Uji:
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSampleCount((prev) => Math.max(1, prev - 1))}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 text-lg transition"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={sampleCount}
                                    onChange={(e) => setSampleCount(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-24 text-center rounded-xl border border-slate-300 py-2 font-black text-slate-900 text-base outline-none focus:border-brand-500"
                                />
                                <button
                                    onClick={() => setSampleCount((prev) => prev + 1)}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 text-lg transition"
                                >
                                    +
                                </button>
                                <span className="text-xs text-slate-500 font-medium">
                                    Contoh sampel
                                </span>
                            </div>
                        </div>

                        {/* Cost Breakdown Rows */}
                        <div className="space-y-2.5 text-xs text-slate-600 bg-white rounded-2xl border border-slate-200 p-4">
                            <div className="flex justify-between">
                                <span>Biaya per 1 Sampel ({costBreakdown.itemCount} parameter):</span>
                                <span className="font-bold text-slate-900">{formatRupiah(costBreakdown.subtotalPerSample)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Pengali Jumlah Sampel:</span>
                                <span className="font-bold text-slate-900">× {costBreakdown.sampleCount} contoh</span>
                            </div>
                            <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between items-end">
                                <div>
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                        TOTAL ESTIMASI PNBP
                                    </span>
                                    <span className="text-[10px] text-emerald-700 font-medium">
                                        Resmi Kas Negara ({currentLabInfo.kementerian || "Kementerian Pertanian"})
                                    </span>
                                </div>
                                <span className="text-2xl font-black text-emerald-800">
                                    {formatRupiah(costBreakdown.grandTotal)}
                                </span>
                            </div>
                        </div>

                        {/* Interactive Button & Container: ⓘ Informasi Tarif & Pembayaran */}
                        <div className="mt-3">
                            <button
                                type="button"
                                onClick={() => setShowTarifInfo((prev) => !prev)}
                                className={`w-full flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-bold transition border ${
                                    showTarifInfo
                                        ? "bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm"
                                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-emerald-800 shadow-xs"
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
                                        ⓘ
                                    </span>
                                    <span>Informasi Tarif & Pembayaran</span>
                                </span>
                                <span className="text-[11px] text-emerald-700 font-semibold">
                                    {showTarifInfo ? "Sembunyikan ▲" : "Lihat Detail ▼"}
                                </span>
                            </button>

                            {showTarifInfo && (
                                <div className="mt-2.5 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-emerald-50/40 border border-amber-200 p-4 text-xs text-slate-800 space-y-2.5 shadow-sm animate-in fade-in duration-150">
                                    <div className="flex items-center gap-2 font-black text-slate-900 border-b border-amber-200/70 pb-2">
                                        <ShieldCheck size={16} className="text-emerald-700" />
                                        <span className="text-xs">Informasi Tarif & Pembayaran</span>
                                    </div>
                                    <p className="leading-relaxed text-slate-700">
                                        Tarif ini merupakan simulasi perhitungan resmi PNBP berdasarkan <strong>{currentLabInfo.regulation || "PP No. 28/2023"}</strong>.
                                    </p>
                                    <p className="leading-relaxed text-slate-700">
                                        Pembayaran dilakukan melalui kode billing resmi setelah sampel diterima dan diverifikasi oleh petugas laboratorium BRMP DIY.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Customer Form Info */}
                        <div className="mt-5 space-y-3">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                                Data Pemohon & Lokasi (Opsional):
                            </h4>
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div>
                                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Nama Pemohon</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Budi Santoso"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Tipe Pemohon</label>
                                    <select
                                        value={customerType}
                                        onChange={(e) => setCustomerType(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                    >
                                        <option value="Petani / Perorangan">Petani / Perorangan</option>
                                        <option value="Kelompok Tani (Poktan/Gapoktan)">Kelompok Tani (Poktan/Gapoktan)</option>
                                        <option value="Mahasiswa / Dosen / Peneliti">Mahasiswa / Dosen / Peneliti</option>
                                        <option value="Instansi Pemerintah / Dinas Pertanian">Instansi Pemerintah / Dinas Pertanian</option>
                                        <option value="Perusahaan Swasta / Agro Industri">Perusahaan Swasta / Agro Industri</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div>
                                    <label className="text-[11px] font-medium text-slate-600 block mb-1">No. WhatsApp / HP</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: 081234567890"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Instansi / Universitas / Perusahaan</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: UGM / Dinas Sleman"
                                        value={institution}
                                        onChange={(e) => setInstitution(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-medium text-slate-600 block mb-1">Lokasi Lahan / Alamat Pengambilan Sampel</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Maguwoharjo, Sleman, DIY"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6">
                            <button
                                onClick={handleSendWhatsApp}
                                disabled={dynamicSelectedItems.length === 0}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 text-xs sm:text-sm transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={16} />
                                Kirim Konsultasi WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt / Quotation Modal */}
            {showReceiptModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="border-b-2 border-emerald-700 pb-4 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white font-black text-sm">
                                        BRMP
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-slate-900 leading-none">
                                            {currentLabInfo.institution}
                                        </h3>
                                        <p className="text-[11px] text-slate-500 mt-0.5">
                                            {currentLabInfo.name} • Akreditasi KAN LP-1751-IDN (Amd-2)
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-3 text-[11px] text-slate-600">
                                    <p><strong>Alamat:</strong> {currentLabInfo.address}</p>
                                    <p><strong>Telp / WA:</strong> {currentLabInfo.phone} / {currentLabInfo.whatsapp}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-1 uppercase tracking-wider">
                                    ESTIMASI SPK PNBP
                                </span>
                                <p className="text-[10px] text-slate-400 mt-2">
                                    Tanggal: {new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}
                                </p>
                            </div>
                        </div>

                        {/* Customer Information in Receipt */}
                        <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs grid grid-cols-2 gap-2 border border-slate-200">
                            <div>
                                <span className="text-slate-400 block text-[10px]">Nama Pemohon:</span>
                                <span className="font-bold text-slate-900">{customerName || "-"}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block text-[10px]">Tipe / Instansi:</span>
                                <span className="font-bold text-slate-900">{customerType} {institution ? `(${institution})` : ""}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block text-[10px]">No. Telepon / WA:</span>
                                <span className="font-bold text-slate-900">{phone || "-"}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block text-[10px]">Lokasi Sampel:</span>
                                <span className="font-bold text-slate-900">{location || "-"}</span>
                            </div>
                        </div>

                        {/* Item Table */}
                        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                            <table className="min-w-full text-xs">
                                <thead className="bg-slate-100 text-slate-700">
                                    <tr>
                                        <th className="px-3 py-2 text-left w-10">No</th>
                                        <th className="px-3 py-2 text-left">Parameter Pengujian ({currentLabInfo.regulation || "PP 28/2023"})</th>
                                        <th className="px-3 py-2 text-right">Tarif Satuan</th>
                                        <th className="px-3 py-2 text-center">Jml</th>
                                        <th className="px-3 py-2 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {dynamicSelectedItems.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-3 py-2 text-slate-500 font-bold">{idx + 1}</td>
                                            <td className="px-3 py-2 font-medium text-slate-900">{item.name}</td>
                                            <td className="px-3 py-2 text-right text-slate-600">{formatRupiah(item.price)}</td>
                                            <td className="px-3 py-2 text-center text-slate-600">{sampleCount}</td>
                                            <td className="px-3 py-2 text-right font-black text-slate-900">
                                                {formatRupiah(item.price * sampleCount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-50 border-t border-slate-200">
                                    <tr>
                                        <td colSpan="4" className="px-3 py-3 text-right font-black text-slate-700">
                                            TOTAL ESTIMASI BIAYA PNBP:
                                        </td>
                                        <td className="px-3 py-3 text-right font-black text-emerald-800 text-sm">
                                            {formatRupiah(costBreakdown.grandTotal)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Notice */}
                        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900 flex items-start gap-2">
                            <ShieldCheck size={16} className="text-amber-700 shrink-0 mt-0.5" />
                            <span>
                                Tarif ini merupakan simulasi perhitungan resmi PNBP berdasarkan <strong>{currentLabInfo.regulation || "PP No. 28/2023"}</strong>. Pembayaran dilakukan melalui kode billing resmi setelah sampel diterima dan diverifikasi oleh petugas laboratorium BRMP DIY.
                            </span>
                        </div>

                        {/* Modal Actions */}
                        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                            <button
                                onClick={() => setShowReceiptModal(false)}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={handlePrintReceipt}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                            >
                                <Printer size={14} />
                                Cetak Dokumen SPK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
