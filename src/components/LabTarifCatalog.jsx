import { useState, useMemo, useEffect } from "react";
import { 
    Search, 
    ChevronDown, 
    ChevronUp, 
    PlusCircle, 
    Check, 
    FileSpreadsheet,
    FlaskConical,
    Mountain,
    Leaf,
    Boxes,
    Droplets,
    Layers
} from "lucide-react";
import { 
    useLabTarifData 
} from "../data/labTarifData";

const categoryBadgeStyles = {
    tanah: "bg-amber-100 text-amber-800 border-amber-300",
    tanaman: "bg-emerald-100 text-emerald-800 border-emerald-300",
    pupuk: "bg-sky-100 text-sky-800 border-sky-300",
    air: "bg-blue-100 text-blue-800 border-blue-300"
};

const categoryNames = {
    tanah: "Tanah (A)",
    tanaman: "Tanaman (B)",
    pupuk: "Pupuk (C)",
    air: "Air (D)"
};

export default function LabTarifCatalog({ onSelectForCalculator, selectedItems = [] }) {
    const { 
        categories: currentCategories, 
        labInfo: currentLabInfo 
    } = useLabTarifData();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [expandedRows, setExpandedRows] = useState({});
    const [copiedNotification, setCopiedNotification] = useState(false);

    // Flatten all items from Tanah, Tanaman, Pupuk, Air into one single list
    const allUnifiedItems = useMemo(() => {
        const list = [];
        currentCategories.forEach((cat) => {
            cat.items.forEach((item) => {
                list.push({
                    ...item,
                    categoryCode: cat.code,
                    categoryTitle: cat.title,
                    categoryBadge: cat.badge,
                    sampleMin: cat.sampleMin,
                    fullNo: `${cat.code}.${item.no}`
                });
            });
        });
        return list;
    }, [currentCategories]);

    // Filter single unified list by category and search term
    const filteredItems = useMemo(() => {
        return allUnifiedItems.filter((item) => {
            const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
            if (!matchCategory) return false;

            const query = searchQuery.toLowerCase().trim();
            if (!query) return true;

            const matchName = item.name.toLowerCase().includes(query);
            const matchNo = item.no.toLowerCase().includes(query) || item.fullNo.toLowerCase().includes(query);
            const matchCatName = item.categoryTitle.toLowerCase().includes(query);
            const matchSubItems = item.subItems?.some((sub) => sub.name.toLowerCase().includes(query));

            return matchName || matchNo || matchCatName || matchSubItems;
        });
    }, [allUnifiedItems, selectedCategory, searchQuery]);

    // Toggle sub-items expansion
    const toggleRow = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Toggle all rows expand
    const toggleAllExpand = () => {
        const hasSomeExpanded = Object.values(expandedRows).some(Boolean);
        if (hasSomeExpanded) {
            setExpandedRows({});
        } else {
            const allExpandable = {};
            allUnifiedItems.forEach((item) => {
                if (item.hasSubItems) {
                    allExpandable[item.id] = true;
                }
            });
            setExpandedRows(allExpandable);
        }
    };

    const formatRupiah = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(val);
    };

    const isItemSelected = (itemId) => {
        return selectedItems.some((sel) => sel.id === itemId);
    };

    const handleCopyAllTariff = () => {
        let text = `DAFTAR TARIF LABORATORIUM KIMIA TANAH BRMP DIY (PP No. 28/2023)\n=======================================================\n\n`;
        allUnifiedItems.forEach((item) => {
            text += `[${item.categoryBadge}] ${item.no}. ${item.name} - ${formatRupiah(item.price)}\n`;
            if (item.subItems) {
                item.subItems.forEach((sub) => {
                    text += `   - ${sub.name}: ${formatRupiah(sub.price)}\n`;
                });
            }
        });
        navigator.clipboard.writeText(text);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 3000);
    };

    return (
        <div className="space-y-4">
            {/* Filter, Search & Table Tools */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                            selectedCategory === "all"
                                ? "bg-[#123524] text-white shadow-sm"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        <FlaskConical size={13} />
                        Semua ({allUnifiedItems.length})
                    </button>
                    <button
                        onClick={() => setSelectedCategory("tanah")}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                            selectedCategory === "tanah"
                                ? "bg-amber-700 text-white shadow-sm"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        <Mountain size={13} />
                        Tanah ({currentCategories.find((c) => c.id === "tanah")?.items.length || 0})
                    </button>
                    <button
                        onClick={() => setSelectedCategory("tanaman")}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                            selectedCategory === "tanaman"
                                ? "bg-emerald-700 text-white shadow-sm"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        <Leaf size={13} />
                        Tanaman ({currentCategories.find((c) => c.id === "tanaman")?.items.length || 0})
                    </button>
                    <button
                        onClick={() => setSelectedCategory("pupuk")}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                            selectedCategory === "pupuk"
                                ? "bg-sky-700 text-white shadow-md"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        <Boxes size={13} />
                        Pupuk ({currentCategories.find((c) => c.id === "pupuk")?.items.length || 0})
                    </button>
                    <button
                        onClick={() => setSelectedCategory("air")}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                            selectedCategory === "air"
                                ? "bg-blue-700 text-white shadow-md"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        <Droplets size={13} />
                        Air ({currentCategories.find((c) => c.id === "air")?.items.length || 0})
                    </button>
                </div>

                {/* Search & Actions */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                    <div className="relative flex-1 sm:w-72">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari parameter / unsur kimia..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-500 focus:bg-white transition"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <button
                        onClick={toggleAllExpand}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 text-xs transition"
                        title="Buka/Tutup Sub-Unsur"
                    >
                        <Layers size={14} />
                        Sub-Unsur
                    </button>

                    <button
                        onClick={handleCopyAllTariff}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 text-xs transition"
                        title="Salin Data Tarif"
                    >
                        <FileSpreadsheet size={14} />
                        {copiedNotification ? "Tersalin!" : "Salin"}
                    </button>
                </div>
            </div>

            {/* SINGLE UNIFIED MASTER TABLE */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        Tabel Tarif Pengujian Laboratorium ({filteredItems.length} Data)
                    </span>
                    <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {currentLabInfo.regulation || "PP Tarif No. 28/2023"} • ISO/IEC 17025:2017
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-center font-black text-xs uppercase tracking-wider w-14">
                                    NO
                                </th>
                                <th className="px-4 py-3 text-left font-black text-xs uppercase tracking-wider w-32">
                                    KATEGORI
                                </th>
                                <th className="px-5 py-3 text-left font-black text-xs uppercase tracking-wider">
                                    JENIS ANALISIS / PARAMETER PENGUJIAN
                                </th>
                                <th className="px-4 py-3 text-left font-black text-xs uppercase tracking-wider w-32">
                                    SATUAN
                                </th>
                                <th className="px-5 py-3 text-right font-black text-xs uppercase tracking-wider w-36">
                                    TARIF (RP)
                                </th>
                                {onSelectForCalculator && (
                                    <th className="px-4 py-3 text-center font-black text-xs uppercase tracking-wider w-28">
                                        AKSI
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={onSelectForCalculator ? 6 : 5} className="py-12 text-center text-slate-500">
                                        <FlaskConical size={32} className="mx-auto text-slate-300 mb-2" />
                                        <p className="font-bold text-xs text-slate-700">Tidak ada data yang cocok</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map((item, idx) => {
                                    const isExpanded = expandedRows[item.id];
                                    const isSelected = isItemSelected(item.id);
                                    const badgeClass = categoryBadgeStyles[item.category] || "bg-slate-100 text-slate-700";

                                    return (
                                        <tr
                                            key={item.id}
                                            className={`transition hover:bg-emerald-50/40 ${
                                                isSelected ? "bg-emerald-50/60" : ""
                                            }`}
                                        >
                                            <td className="px-4 py-3 text-center font-bold text-slate-500 text-xs">
                                                {idx + 1}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${badgeClass}`}>
                                                    {categoryNames[item.category] || item.category}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                                            {item.name}
                                                        </span>
                                                        {item.hasSubItems && (
                                                            <button
                                                                onClick={() => toggleRow(item.id)}
                                                                className="inline-flex items-center gap-1 rounded-full bg-slate-100 hover:bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700 transition"
                                                            >
                                                                {item.subItems?.length} Sub-Unsur
                                                                {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Expanded Nested Sub-Items */}
                                                    {item.hasSubItems && isExpanded && (
                                                        <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50/90 p-3 space-y-1.5">
                                                            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                                                                Rincian Ekstraksi & Determinasi Unsur:
                                                            </div>
                                                            <div className="grid gap-1.5 sm:grid-cols-2">
                                                                {item.subItems.map((sub) => {
                                                                    const isSubSelected = isItemSelected(sub.id);
                                                                    return (
                                                                        <div
                                                                            key={sub.id}
                                                                            className="flex items-center justify-between rounded-lg bg-white border border-slate-200/80 px-2.5 py-1.5 text-xs"
                                                                        >
                                                                            <span className="text-slate-800 font-medium text-[11px]">{sub.name}</span>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-black text-emerald-700 text-[11px]">
                                                                                    {formatRupiah(sub.price)}
                                                                                </span>
                                                                                {onSelectForCalculator && (
                                                                                    <button
                                                                                        onClick={() => onSelectForCalculator({
                                                                                            ...sub,
                                                                                            category: item.category,
                                                                                            parentName: item.name
                                                                                        }, item.category)}
                                                                                        className={`p-0.5 rounded transition ${
                                                                                            isSubSelected
                                                                                                ? "bg-emerald-600 text-white"
                                                                                                : "bg-slate-100 hover:bg-emerald-100 text-slate-700"
                                                                                        }`}
                                                                                        title={isSubSelected ? "Hapus dari kalkulator" : "Tambah ke kalkulator"}
                                                                                    >
                                                                                        {isSubSelected ? <Check size={11} /> : <PlusCircle size={11} />}
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-500 font-medium">
                                                {item.unit}
                                            </td>
                                            <td className="px-5 py-3 text-right font-black text-slate-900 text-xs sm:text-sm">
                                                {formatRupiah(item.price)}
                                            </td>
                                            {onSelectForCalculator && (
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => onSelectForCalculator(item, item.category)}
                                                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-sm ${
                                                            isSelected
                                                                ? "bg-emerald-600 text-white"
                                                                : "bg-slate-100 text-slate-700 hover:bg-brand-500 hover:text-white"
                                                        }`}
                                                    >
                                                        {isSelected ? (
                                                            <>
                                                                <Check size={12} />
                                                                Dipilih
                                                            </>
                                                        ) : (
                                                            <>
                                                                <PlusCircle size={12} />
                                                                Pilih
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
