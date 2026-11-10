import { useState, useEffect, useMemo } from "react";
import { 
    FlaskConical, 
    Search, 
    Plus, 
    Edit3, 
    Trash2, 
    RotateCcw, 
    Save, 
    CheckCircle2, 
    AlertTriangle, 
    Shield, 
    Phone, 
    Building2, 
    FileText, 
    Layers, 
    X,
    Filter,
    DollarSign,
    Sparkles,
    Settings,
    Check,
    HelpCircle,
    ArrowUpDown,
    Percent,
    TrendingUp
} from "lucide-react";
import { 
    useLabTarifData,
    getStoredTarifCategories, 
    saveStoredTarifCategories, 
    getStoredLabInfo, 
    saveStoredLabInfo, 
    resetStoredTarifData 
} from "../data/labTarifData";

const categoryNames = {
    tanah: "Tanah (A)",
    tanaman: "Tanaman (B)",
    pupuk: "Pupuk (C)",
    air: "Air (D)"
};

const categoryBadgeStyles = {
    tanah: "bg-amber-100 text-amber-900 border-amber-300",
    tanaman: "bg-emerald-100 text-emerald-900 border-emerald-300",
    pupuk: "bg-sky-100 text-sky-900 border-sky-300",
    air: "bg-blue-100 text-blue-900 border-blue-300"
};

export default function LabTarifManager() {
    const { 
        categories: syncedCategories, 
        labInfo: syncedLabInfo, 
        saveCategories, 
        saveLabInfo, 
        resetData 
    } = useLabTarifData();

    const [categories, setCategories] = useState(syncedCategories);
    const [labInfoData, setLabInfoData] = useState(syncedLabInfo);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [toastMessage, setToastMessage] = useState(null);
    const [expandedSubItems, setExpandedSubItems] = useState({});

    // Form inputs for quick add
    const [newParamCategory, setNewParamCategory] = useState("tanah");
    const [newParamName, setNewParamName] = useState("");
    const [newParamPrice, setNewParamPrice] = useState("");
    const [newParamUnit, setNewParamUnit] = useState("Per contoh");

    // Form inputs for regulation & contact
    const [regulationText, setRegulationText] = useState(syncedLabInfo.regulation || "");
    const [whatsappText, setWhatsappText] = useState(syncedLabInfo.whatsapp || "");
    const [phoneText, setPhoneText] = useState(syncedLabInfo.phone || "");
    const [isEditingInfo, setIsEditingInfo] = useState(false);

    // Track edited items in memory before save or auto-save
    const [unsavedChanges, setUnsavedChanges] = useState({});
    const [editingRowId, setEditingRowId] = useState(null);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);

    // Sync local state when external / synced state changes
    useEffect(() => {
        setCategories(syncedCategories);
    }, [syncedCategories]);

    useEffect(() => {
        setLabInfoData(syncedLabInfo);
        setRegulationText(syncedLabInfo.regulation || "");
        setWhatsappText(syncedLabInfo.whatsapp || "");
        setPhoneText(syncedLabInfo.phone || "");
    }, [syncedLabInfo]);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Flatten all items
    const flattenedItems = useMemo(() => {
        const list = [];
        categories.forEach((cat) => {
            cat.items.forEach((item) => {
                list.push({
                    ...item,
                    categoryTitle: cat.title,
                    categoryCode: cat.code,
                    categoryId: cat.id
                });
            });
        });
        return list;
    }, [categories]);

    // Filter items
    const filteredItems = useMemo(() => {
        return flattenedItems.filter((it) => {
            const matchCategory = selectedCategory === "all" || it.categoryId === selectedCategory;
            if (!matchCategory) return false;
            if (!searchQuery.trim()) return true;

            const q = searchQuery.toLowerCase();
            return (
                (it.name && it.name.toLowerCase().includes(q)) ||
                (it.id && it.id.toLowerCase().includes(q)) ||
                (it.categoryTitle && it.categoryTitle.toLowerCase().includes(q)) ||
                (it.subItems && it.subItems.some((sub) => sub.name.toLowerCase().includes(q) || sub.id.toLowerCase().includes(q)))
            );
        });
    }, [flattenedItems, selectedCategory, searchQuery]);

    const formatRupiah = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(val || 0);
    };

    const toggleSubItemExpand = (id) => {
        setExpandedSubItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Handle inline price change (Auto-saves to localStorage immediately)
    const handlePriceChange = (categoryId, itemId, newPrice) => {
        const val = parseInt(newPrice) || 0;
        setCategories((prev) => {
            const updated = prev.map((cat) => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        items: cat.items.map((it) => (it.id === itemId ? { ...it, price: val } : it))
                    };
                }
                return cat;
            });
            saveCategories(updated);
            return updated;
        });
        setUnsavedChanges((prev) => ({ ...prev, [itemId]: true }));
    };

    // Handle sub-item price change
    const handleSubItemPriceChange = (categoryId, parentId, subId, newPrice) => {
        const val = parseInt(newPrice) || 0;
        setCategories((prev) => {
            const updated = prev.map((cat) => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        items: cat.items.map((it) => {
                            if (it.id === parentId && it.subItems) {
                                return {
                                    ...it,
                                    subItems: it.subItems.map((sub) =>
                                        sub.id === subId ? { ...sub, price: val } : sub
                                    )
                                };
                            }
                            return it;
                        })
                    };
                }
                return cat;
            });
            saveCategories(updated);
            return updated;
        });
        setUnsavedChanges((prev) => ({ ...prev, [subId]: true }));
    };

    // Handle inline name change
    const handleNameChange = (categoryId, itemId, newName) => {
        setCategories((prev) => {
            const updated = prev.map((cat) => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        items: cat.items.map((it) => (it.id === itemId ? { ...it, name: newName } : it))
                    };
                }
                return cat;
            });
            saveCategories(updated);
            return updated;
        });
        setUnsavedChanges((prev) => ({ ...prev, [itemId]: true }));
    };

    // Save individual row
    const handleSaveRow = (itemId) => {
        saveCategories(categories);
        setUnsavedChanges((prev) => {
            const next = { ...prev };
            delete next[itemId];
            return next;
        });
        setEditingRowId(null);
        showToast("Tarif parameter berhasil diperbarui dan tersinkron ke sistem!");
    };

    // Save all changes
    const handleSaveAllChanges = () => {
        saveCategories(categories);
        setUnsavedChanges({});
        setEditingRowId(null);
        showToast("Seluruh perubahan tarif berhasil disimpan dan tersinkron ke semua halaman!");
    };

    // Save Regulation Info
    const handleSaveRegulationInfo = (e) => {
        e.preventDefault();
        const updated = {
            ...labInfoData,
            regulation: regulationText,
            whatsapp: whatsappText,
            phone: phoneText
        };
        setLabInfoData(updated);
        saveLabInfo(updated);
        setIsEditingInfo(false);
        showToast("Informasi Regulasi & Nomor Kontak Lab berhasil diperbarui dan tersinkron!");
    };

    // Add New Parameter
    const handleAddNewParameter = (e) => {
        e.preventDefault();
        if (!newParamName.trim()) return;

        const targetCat = categories.find((c) => c.id === newParamCategory);
        const nextNo = (targetCat?.items?.length || 0) + 1;
        const codePrefix = newParamCategory === "tanah" ? "T" : newParamCategory === "tanaman" ? "P" : newParamCategory === "pupuk" ? "F" : "W";
        const newId = `${codePrefix}-${String(nextNo).padStart(2, "0")}`;

        const newItem = {
            id: newId,
            no: String(nextNo),
            name: newParamName.trim(),
            unit: newParamUnit.trim() || "Per contoh",
            price: parseInt(newParamPrice) || 0,
            category: newParamCategory
        };

        const updatedCategories = categories.map((cat) => {
            if (cat.id === newParamCategory) {
                return {
                    ...cat,
                    items: [...cat.items, newItem]
                };
            }
            return cat;
        });

        setCategories(updatedCategories);
        saveCategories(updatedCategories);
        setNewParamName("");
        setNewParamPrice("");
        showToast(`Parameter baru "${newItem.name}" (${formatRupiah(newItem.price)}) berhasil ditambahkan ke Kategori ${newParamCategory.toUpperCase()}!`);
    };

    // Delete Parameter
    const handleDeleteItem = (item) => {
        const updatedCategories = categories.map((cat) => {
            if (cat.id === item.categoryId) {
                return {
                    ...cat,
                    items: cat.items.filter((it) => it.id !== item.id)
                };
            }
            return cat;
        });
        setCategories(updatedCategories);
        saveCategories(updatedCategories);
        setDeleteConfirmItem(null);
        showToast(`Parameter "${item.name}" berhasil dihapus.`);
    };

    // Reset to defaults
    const handleResetToDefault = () => {
        resetData();
        setUnsavedChanges({});
        setShowResetConfirm(false);
        showToast("Seluruh tarif & regulasi berhasil dikembalikan ke standar awal PP No. 28/2023.");
    };

    const hasUnsavedChanges = Object.keys(unsavedChanges).length > 0;

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#123524] text-white px-5 py-3.5 shadow-2xl border border-emerald-400 animate-in fade-in slide-in-from-bottom-2 duration-200 text-xs font-bold">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Banner Mode Admin Aktif */}
            <div className="rounded-3xl border-2 border-emerald-600 bg-gradient-to-r from-[#123524] to-[#1e5438] text-white p-6 shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="rounded-full bg-emerald-500/30 border border-emerald-400/50 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-emerald-200">
                                Mode Editor Admin Aktif
                            </span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-white">
                            Formulir & Editor Tarif Laboratorium
                        </h2>
                        <p className="text-xs text-emerald-100/80 max-w-2xl leading-relaxed">
                            Di halaman ini Anda dapat <strong>mengubah angka tarif secara langsung pada tabel</strong>, mengedit dasar hukum regulasi (PP/Permentan), atau menambahkan parameter uji baru.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {hasUnsavedChanges && (
                            <button
                                onClick={handleSaveAllChanges}
                                className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 px-5 py-3 text-xs font-black shadow-lg transition animate-pulse"
                            >
                                <Save size={16} />
                                Simpan Semua Perubahan ({Object.keys(unsavedChanges).length})
                            </button>
                        )}
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="inline-flex items-center gap-1.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white px-4 py-3 text-xs font-bold transition"
                        >
                            <RotateCcw size={14} />
                            Reset Standar Awal
                        </button>
                    </div>
                </div>
            </div>

            {/* 2 Column Form Panels: Regulasi & Tambah Parameter Baru */}
            <div className="grid gap-6 lg:grid-cols-2">
                
                {/* Panel 1: Form Edit Regulasi & Kontak */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-bold">
                                    <Shield size={16} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-900">
                                        Dasar Hukum Regulasi & Kontak Admin
                                    </h3>
                                    <p className="text-[11px] text-slate-500">
                                        Perbarui nama PP Tarif (contoh: tahun 2026) dan kontak WhatsApp
                                    </p>
                                </div>
                            </div>
                            {!isEditingInfo ? (
                                <button
                                    onClick={() => setIsEditingInfo(true)}
                                    className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5"
                                >
                                    <Edit3 size={13} />
                                    Edit Info
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditingInfo(false)}
                                    className="rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 px-2.5 py-1 text-xs"
                                >
                                    Batal
                                </button>
                            )}
                        </div>

                        {isEditingInfo ? (
                            <form onSubmit={handleSaveRegulationInfo} className="space-y-3 text-xs">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">
                                        Dasar Regulasi Tarif (PP / Permentan):
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={regulationText}
                                        onChange={(e) => setRegulationText(e.target.value)}
                                        placeholder="Contoh: PP Tarif No. 28/2023 PNBP Kementerian Pertanian"
                                        className="w-full rounded-xl border border-emerald-600 bg-emerald-50/30 px-3.5 py-2 text-xs font-bold text-slate-900 outline-none"
                                    />
                                </div>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">
                                            Nomor WhatsApp Admin Lab:
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={whatsappText}
                                            onChange={(e) => setWhatsappText(e.target.value)}
                                            placeholder="Contoh: 0858-7843-8548"
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">
                                            Telepon Kantor:
                                        </label>
                                        <input
                                            type="text"
                                            value={phoneText}
                                            onChange={(e) => setPhoneText(e.target.value)}
                                            placeholder="Contoh: (0274) 884662"
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 shadow-sm"
                                    >
                                        <Save size={14} />
                                        Simpan Perubahan Regulasi
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-2.5 text-xs">
                                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dasar Regulasi Aktif</span>
                                    <p className="font-bold text-slate-900 mt-0.5 text-xs sm:text-sm">
                                        {labInfoData.regulation}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[11px]">
                                    <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                                        <span className="text-slate-400 block text-[10px]">WhatsApp Penerima Permohonan:</span>
                                        <span className="font-bold text-emerald-800">{labInfoData.whatsapp}</span>
                                    </div>
                                    <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                                        <span className="text-slate-400 block text-[10px]">Telepon Kantor:</span>
                                        <span className="font-bold text-slate-800">{labInfoData.phone}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Panel 2: Form Tambah Parameter Baru */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                            <Plus size={16} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-slate-900">
                                Tambah Parameter Pengujian Baru
                            </h3>
                            <p className="text-[11px] text-slate-500">
                                Masukkan parameter uji baru ke dalam tabel tarif
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleAddNewParameter} className="space-y-3 text-xs">
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Kategori Pengujian *</label>
                                <select
                                    value={newParamCategory}
                                    onChange={(e) => setNewParamCategory(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500 font-medium"
                                >
                                    <option value="tanah">Tanah (Kategori A)</option>
                                    <option value="tanaman">Tanaman (Kategori B)</option>
                                    <option value="pupuk">Pupuk (Kategori C)</option>
                                    <option value="air">Air (Kategori D)</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Satuan Uji *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Per contoh / Per unsur"
                                    value={newParamUnit}
                                    onChange={(e) => setNewParamUnit(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-bold text-slate-700 block mb-1">Nama Parameter Pengujian *</label>
                            <input
                                type="text"
                                required
                                placeholder="Contoh: Uji Logam Berat Kromium (Cr)"
                                value={newParamName}
                                onChange={(e) => setNewParamName(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <label className="font-bold text-slate-700 block mb-1">Tarif PNBP Baru (Rp) *</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">Rp</span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1000"
                                        required
                                        placeholder="25000"
                                        value={newParamPrice}
                                        onChange={(e) => setNewParamPrice(e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs font-black text-slate-900 outline-none focus:border-brand-500"
                                    />
                                </div>
                            </div>
                            <div className="pt-5">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 shadow-sm transition"
                                >
                                    <Plus size={14} />
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Main Interactive Table: Live Editable Price Table */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                
                {/* Table Top Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-black text-slate-900">
                                Tabel Edit Langsung Tarif Pengujian
                            </h3>
                            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5">
                                {filteredItems.length} Parameter
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Ketik langsung angka harga baru di kotak input, lalu klik tombol centang <strong>✓ Simpan</strong> pada baris tersebut.
                        </p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                        <input
                            type="text"
                            placeholder="Cari nama parameter / kode..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 py-2 text-xs outline-none focus:border-brand-500 focus:bg-white transition"
                        />
                    </div>
                </div>

                {/* Category Selector Tabs */}
                <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                            selectedCategory === "all"
                                ? "bg-[#123524] text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900 hover:bg-white"
                        }`}
                    >
                        Semua Kategori ({flattenedItems.length})
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                                selectedCategory === cat.id
                                    ? "bg-[#123524] text-white shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                            }`}
                        >
                            {cat.title} ({cat.items.length})
                        </button>
                    ))}
                </div>

                {/* Live Editable Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 uppercase text-[11px] font-black tracking-wider">
                            <tr>
                                <th className="px-4 py-3.5 w-16">Kode</th>
                                <th className="px-4 py-3.5">Nama Parameter Pengujian (Bisa diedit)</th>
                                <th className="px-4 py-3.5 w-36">Kategori</th>
                                <th className="px-4 py-3.5 w-28">Satuan</th>
                                <th className="px-4 py-3.5 text-right w-52 bg-emerald-50/60 border-l border-r border-emerald-100">
                                    Input Harga Tarif (Rp)
                                </th>
                                <th className="px-4 py-3.5 text-center w-28">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-slate-400">
                                        Tidak ada parameter yang sesuai dengan kata kunci pencarian.
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map((item) => {
                                    const isUnsaved = !!unsavedChanges[item.id];
                                    const isEditingThis = editingRowId === item.id;
                                    const isSubExpanded = !!expandedSubItems[item.id];

                                    return (
                                        <>
                                            <tr 
                                                key={`${item.categoryId}-${item.id}`} 
                                                className={`transition ${isUnsaved ? "bg-amber-50/70" : "hover:bg-slate-50/80"}`}
                                            >
                                                {/* Kode */}
                                                <td className="px-4 py-3 font-mono font-bold text-slate-500">
                                                    {item.id}
                                                </td>

                                                {/* Nama Parameter */}
                                                <td className="px-4 py-3">
                                                    {isEditingThis ? (
                                                        <input
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(e) => handleNameChange(item.categoryId, item.id, e.target.value)}
                                                            className="w-full rounded-lg border border-brand-500 bg-white px-2.5 py-1 text-xs font-bold text-slate-900 outline-none shadow-xs"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-between group">
                                                            <span className="font-bold text-slate-900">{item.name}</span>
                                                            <button
                                                                onClick={() => setEditingRowId(item.id)}
                                                                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-brand-600 transition p-1"
                                                                title="Edit Nama"
                                                            >
                                                                <Edit3 size={13} />
                                                            </button>
                                                        </div>
                                                    )}
                                                    {item.hasSubItems && (
                                                        <div className="mt-1 flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleSubItemExpand(item.id)}
                                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md transition"
                                                            >
                                                                <span>{isSubExpanded ? "▲ Tutup Sub-parameter" : `▼ Edit ${item.subItems?.length || 0} Sub-parameter`}</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Kategori */}
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold border ${categoryBadgeStyles[item.categoryId] || "bg-slate-100 text-slate-700"}`}>
                                                        {item.categoryTitle}
                                                    </span>
                                                </td>

                                                {/* Satuan */}
                                                <td className="px-4 py-3 text-slate-600">
                                                    {item.unit || "Per contoh"}
                                                </td>

                                                {/* Input Harga Langsung */}
                                                <td className="px-4 py-2.5 text-right bg-emerald-50/30 border-l border-r border-emerald-100/70">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <span className="text-xs font-bold text-slate-400">Rp</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="1000"
                                                            value={item.price}
                                                            onChange={(e) => handlePriceChange(item.categoryId, item.id, e.target.value)}
                                                            className={`w-32 rounded-xl border text-right px-2.5 py-1.5 text-xs font-black outline-none transition ${
                                                                isUnsaved 
                                                                    ? "border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-300" 
                                                                    : "border-slate-300 bg-white text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                                            }`}
                                                        />
                                                    </div>
                                                </td>

                                                {/* Aksi */}
                                                <td className="px-4 py-3 text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        {isUnsaved ? (
                                                            <button
                                                                onClick={() => handleSaveRow(item.id)}
                                                                className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1 shadow-sm transition"
                                                                title="Simpan baris ini"
                                                            >
                                                                <Check size={13} />
                                                                Simpan
                                                            </button>
                                                        ) : (
                                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                                                Tersimpan
                                                            </span>
                                                        )}

                                                        <button
                                                            onClick={() => setDeleteConfirmItem(item)}
                                                            className="rounded-lg p-1 text-slate-300 hover:bg-rose-50 hover:text-rose-600 transition"
                                                            title="Hapus Parameter"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Sub-items rows if expanded */}
                                            {item.hasSubItems && isSubExpanded && item.subItems?.map((sub) => {
                                                const isSubUnsaved = !!unsavedChanges[sub.id];
                                                return (
                                                    <tr key={sub.id} className="bg-emerald-50/20 border-t border-dashed border-emerald-200">
                                                        <td className="px-4 py-2 font-mono text-[11px] text-slate-400 pl-8">
                                                            ↳ {sub.id}
                                                        </td>
                                                        <td className="px-4 py-2 text-xs font-semibold text-slate-700 pl-8">
                                                            {sub.name}
                                                        </td>
                                                        <td className="px-4 py-2 text-[10px] text-slate-400">
                                                            Sub-elemen
                                                        </td>
                                                        <td className="px-4 py-2 text-slate-400 text-[11px]">
                                                            {item.unit || "Per unsur"}
                                                        </td>
                                                        <td className="px-4 py-2 text-right bg-emerald-50/40 border-l border-r border-emerald-100">
                                                            <div className="flex items-center justify-end gap-1.5">
                                                                <span className="text-[11px] font-bold text-slate-400">Rp</span>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    step="1000"
                                                                    value={sub.price}
                                                                    onChange={(e) => handleSubItemPriceChange(item.categoryId, item.id, sub.id, e.target.value)}
                                                                    className={`w-28 rounded-lg border text-right px-2 py-1 text-xs font-bold outline-none transition ${
                                                                        isSubUnsaved
                                                                            ? "border-amber-500 bg-amber-50 text-amber-950 ring-1 ring-amber-300"
                                                                            : "border-slate-300 bg-white text-slate-900 focus:border-emerald-600"
                                                                    }`}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {isSubUnsaved ? (
                                                                <button
                                                                    onClick={() => handleSaveRow(sub.id)}
                                                                    className="inline-flex items-center gap-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2 py-0.5 transition"
                                                                >
                                                                    <Check size={11} />
                                                                    Simpan
                                                                </button>
                                                            ) : (
                                                                <span className="text-[9px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                                                                    Tersimpan
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Bar if has changes */}
                {hasUnsavedChanges && (
                    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                            <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                            <span>Ada {Object.keys(unsavedChanges).length} parameter yang harga atau namanya telah Anda ubah.</span>
                        </div>
                        <button
                            onClick={handleSaveAllChanges}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs px-5 py-2.5 shadow-md transition"
                        >
                            <Save size={15} />
                            Simpan Seluruh Perubahan Sekarang
                        </button>
                    </div>
                )}
            </div>

            {/* Modal: Konfirmasi Reset Default */}
            {showResetConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center space-y-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mx-auto">
                            <AlertTriangle size={24} />
                        </div>
                        <h4 className="text-base font-black text-slate-900">
                            Reset ke Standar Awal PP 28/2023?
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Tindakan ini akan mengembalikan seluruh harga parameter, nama pengujian, dan informasi kontak ke konfigurasi awal bawaan sistem.
                        </p>
                        <div className="pt-3 flex items-center justify-center gap-2">
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleResetToDefault}
                                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 shadow-sm"
                            >
                                Ya, Reset Data
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Konfirmasi Hapus Parameter */}
            {deleteConfirmItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center space-y-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mx-auto">
                            <Trash2 size={24} />
                        </div>
                        <h4 className="text-base font-black text-slate-900">
                            Hapus Parameter Pengujian?
                        </h4>
                        <p className="text-xs text-slate-600 font-bold">
                            "{deleteConfirmItem.name}" ({formatRupiah(deleteConfirmItem.price)})
                        </p>
                        <div className="pt-3 flex items-center justify-center gap-2">
                            <button
                                onClick={() => setDeleteConfirmItem(null)}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleDeleteItem(deleteConfirmItem)}
                                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 shadow-sm"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
