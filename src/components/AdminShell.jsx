import { 
    ArrowUpRight, 
    Bell, 
    ChevronDown, 
    ChevronRight, 
    ClipboardList, 
    FlaskConical, 
    LayoutDashboard, 
    LogOut, 
    Settings, 
    Sprout, 
    Users,
    Sparkles,
    ExternalLink
} from "lucide-react";

const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
    { label: "Permohonan", icon: ClipboardList, key: "permohonan" },
    { label: "Laboratorium (Katalog Tarif)", icon: FlaskConical, key: "laboratorium" },
    {
        label: "Data Benih",
        icon: Sprout,
        key: "benih-jenis-benih",
        children: [
            { label: "Jenis Benih", key: "benih-jenis-benih" },
            { label: "Update Benih", key: "benih-update-benih" },
        ],
    },
    { label: "User", icon: Users, key: "user" },
    { label: "Pengaturan", icon: Settings, key: "pengaturan" },
];

export default function AdminShell({ activeView, onNavigate, children }) {
    return (
        <div className="min-h-screen lg:flex">
            <aside className="bg-[#123524] text-white lg:sticky lg:top-0 lg:h-screen lg:w-80">
                <div className="flex h-full flex-col gap-5 p-5 overflow-y-auto">
                    {/* Brand */}
                    <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 font-black text-white">B</div>
                        <div>
                            <p className="text-sm font-semibold tracking-[0.22em] text-brand-100">KITA BRMP DIY</p>
                            <p className="text-xs text-white/70">Sistem Layanan Lab & Benih</p>
                        </div>
                    </div>

                    {/* Quick Button: Portal Publik */}
                    <button
                        onClick={() => onNavigate?.("public-portal")}
                        className="flex items-center justify-between gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 p-3 text-xs font-bold text-white shadow-md transition"
                    >
                        <span className="flex items-center gap-2">
                            <Sparkles size={15} className="text-yellow-300" />
                            Portal Publik Laboratorium
                        </span>
                        <ExternalLink size={14} />
                    </button>

                    <nav className="flex flex-1 flex-col gap-1.5">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            const hasChildren = Array.isArray(item.children);
                            const isOpen = hasChildren && (
                                item.key === "benih-jenis-benih" 
                                    ? activeView.startsWith("benih") 
                                    : item.children.some((child) => child.key === activeView)
                            );
                            const isActive = activeView === item.key || isOpen;

                            return (
                                <div key={item.label} className="flex flex-col gap-1">
                                    <button onClick={() => onNavigate?.(item.key)} className={["flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-left text-sm font-medium transition", isActive ? "bg-brand-500 text-white shadow-glow" : "text-white/75 hover:bg-white/10 hover:text-white"].join(" ")}>
                                        <span className="flex items-center gap-3">
                                            <Icon size={18} />
                                            <span>{item.label}</span>
                                        </span>
                                        {hasChildren ? isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} /> : item.soon ? <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">Soon</span> : null}
                                    </button>

                                    {hasChildren && isOpen ? (
                                        <div className="ml-4 flex flex-col gap-1.5 border-l border-white/10 pl-3 py-1">
                                            {item.children.map((child) => {
                                                const isChildActive = activeView === child.key;
                                                return (
                                                    <button key={child.key} onClick={() => onNavigate?.(child.key)} className={["rounded-xl px-3 py-2 text-left text-xs font-semibold transition", isChildActive ? "bg-brand-400 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"].join(" ")}>
                                                        {child.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </nav>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-white">
                            <Bell size={14} className="text-yellow-400" />
                            Status Akreditasi
                        </div>
                        <p className="mt-1.5 text-xs leading-5 text-white/70">
                            ISO/IEC 17025:2017 Komite Akreditasi Nasional (KAN) LP-1751-IDN (Amd-2).
                        </p>
                    </div>

                    <button 
                        onClick={() => onNavigate?.("public-portal")}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                    >
                        <LogOut size={14} />
                        Halaman Publik
                    </button>
                </div>
            </aside>

            <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}
