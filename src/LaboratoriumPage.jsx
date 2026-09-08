import { useState } from "react";
import { 
    FlaskConical,
    Calculator,
    BookOpen,
    Sparkles,
    ArrowLeft,
    Edit3
} from "lucide-react";
import LabTarifCatalog from "./components/LabTarifCatalog";
import LabCostCalculator from "./components/LabCostCalculator";
import LabBrochureView from "./components/LabBrochureView";
import LabTarifManager from "./components/LabTarifManager";
import { useLabTarifData } from "./data/labTarifData";

export default function LaboratoriumPage({ onNavigate }) {
    const { labInfo } = useLabTarifData();
    const [subView, setSubView] = useState("catalog"); // default to single catalog table
    const [selectedItems, setSelectedItems] = useState([]);

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

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
            {/* Header */}
            <header className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <button 
                            onClick={() => onNavigate?.("dashboard")} 
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 mb-3"
                        >
                            <ArrowLeft size={14} />
                            Kembali ke dashboard
                        </button>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-700">Layanan Laboratorium</p>
                        <h1 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                            Katalog Tarif & Layanan Laboratorium Kimia Tanah BRMP DIY
                        </h1>
                        <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-6 text-slate-600">
                            Tabel terpadu seluruh pengujian tanah, tanaman, pupuk, dan air resmi berstandar ISO/IEC 17025:2017 & {labInfo.regulation || "PP No. 28/2023"}.
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => onNavigate?.("public-portal")}
                            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-3 text-xs shadow-md transition"
                        >
                            <Sparkles size={16} className="text-yellow-300" />
                            Buka Portal Publik Lab
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Bar for Views */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-3 border border-slate-200 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSubView("catalog")}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                            subView === "catalog"
                                ? "bg-[#123524] text-white shadow-sm"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        <FlaskConical size={14} />
                        Tabel Tarif Terpadu
                    </button>
                    <button
                        onClick={() => setSubView("calculator")}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                            subView === "calculator"
                                ? "bg-[#123524] text-white shadow-sm"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        <Calculator size={14} />
                        Kalkulator Biaya Sampel ({selectedItems.length})
                    </button>
                    <button
                        onClick={() => setSubView("brochure")}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                            subView === "brochure"
                                ? "bg-[#123524] text-white shadow-sm"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        <BookOpen size={14} />
                        Format Brosur Asli
                    </button>
                    <button
                        onClick={() => setSubView("manager")}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                            subView === "manager"
                                ? "bg-[#123524] text-white shadow-sm"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                        }`}
                    >
                        <Edit3 size={14} />
                        Kelola & Edit Tarif (Admin)
                    </button>
                </div>

                <span className="text-xs text-slate-500 font-semibold hidden md:inline">
                    Akreditasi KAN LP-1751-IDN (Amd-2) • ISO/IEC 17025:2017
                </span>
            </div>

            {/* Content View */}
            {subView === "manager" && (
                <LabTarifManager />
            )}

            {subView === "catalog" && (
                <LabTarifCatalog
                    onSelectForCalculator={handleSelectForCalculator}
                    selectedItems={selectedItems}
                />
            )}

            {subView === "calculator" && (
                <LabCostCalculator
                    selectedItems={selectedItems}
                    onRemoveItem={handleRemoveItem}
                    onClearAll={handleClearAll}
                    onAddItem={handleSelectForCalculator}
                />
            )}

            {subView === "brochure" && (
                <LabBrochureView />
            )}
        </div>
    );
}
