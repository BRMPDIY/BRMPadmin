import { useState } from "react";
import LoginPage from "./LoginPage";
import AdminDashboardPage from "./AdminDashboardPage";
import LaboratoriumPage from "./LaboratoriumPage";
import PermohonanPage from "./PermohonanPage";
import AdminShell from "./components/AdminShell";
import BenihPage from "./BenihPage";
import AddBenihPage from "./AddBenihPage";
import UpdateBenihPage from "./UpdateBenihPage";
import AddUpdateStokPage from "./AddUpdateStokPage";
import UserMen from "./usermen";
import SettingsPage from "./SettingsPage";
import LabPublicPortal from "./components/LabPublicPortal";

const aduanRows = [
    {
        no: 1,
        proses: "Selesai",
        kode: "53608401",
        nama: "dea",
        pekerjaan: "pegawai",
        tipe: "Perorangan",
        email: "dea@gmail.com",
        hp: "081297732826",
        tanggal: "20-07-2024 08:27",
        caraMemperoleh: "Mendapatkan salinan hardcopy",
        caraMendapatkan: "Pakai Kurir",
    },
    {
        no: 2,
        proses: "Selesai",
        kode: "607426615",
        nama: "Diah Sulistyorini",
        pekerjaan: "mahasiswa",
        tipe: "Perorangan",
        email: "dsy.nuriyanto@gmail.com",
        hp: "082323375252",
        tanggal: "28-06-25 09:09",
        caraMemperoleh: "Mendapatkan salinan hardcopy",
        caraMendapatkan: "Mengambil langsung",
    },
    {
        no: 3,
        proses: "Diproses",
        kode: "1970012002",
        nama: "COBA",
        pekerjaan: "MAHASISWA",
        tipe: "Instansi",
        email: "lobs1@fahungla.com",
        hp: "0874444-05-2025",
        tanggal: "27-05-25 04:45",
        caraMemperoleh: "Mendapatkan salinan hardcopy",
        caraMendapatkan: "Mengambil langsung",
    },
    {
        no: 4,
        proses: "Selesai",
        kode: "214404124",
        nama: "Andik Susatyo",
        pekerjaan: "Pengusaha",
        tipe: "Perorangan",
        email: "andik@gmail.com",
        hp: "081249286420",
        tanggal: "15-09-25 19:30",
        caraMemperoleh: "Mendapatkan salinan hardcopy",
        caraMendapatkan: "Pakai Kurir",
    },
];

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // Default to public portal or dashboard
    const [activeView, setActiveView] = useState("public-portal");

    const isLaboratoriumView = activeView.startsWith("laboratorium");

    // If viewing the public portal, render full screen landing portal
    if (activeView === "public-portal") {
        return <LabPublicPortal onNavigateToAdmin={setActiveView} />;
    }

    if (!isLoggedIn) {
        return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
    }

    return (
        <AdminShell activeView={activeView} onNavigate={setActiveView}>
            {activeView === "permohonan" ? (
                <PermohonanPage onNavigate={setActiveView} rows={aduanRows} />
            ) : isLaboratoriumView ? (
                <LaboratoriumPage activeTab={activeView} onNavigate={setActiveView} />
            ) : activeView === "benih-tambah-jenis-benih" ? (
                <AddBenihPage onNavigate={setActiveView} />
            ) : activeView === "benih-tambah-update-stok" ? (
                <AddUpdateStokPage onNavigate={setActiveView} />
            ) : activeView === "benih-update-benih" ? (
                <UpdateBenihPage onNavigate={setActiveView} />
            ) : activeView.startsWith("benih") ? (
                <BenihPage activeTab={activeView} onNavigate={setActiveView} />
            ) : activeView === "user" ? (
                <UserMen onNavigate={setActiveView} />
            ) : activeView === "pengaturan" ? (
                <SettingsPage onNavigate={setActiveView} />
            ) : (
                <AdminDashboardPage />
            )}
        </AdminShell>
    );
}
