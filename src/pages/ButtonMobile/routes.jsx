import React from "react";

import Beranda from "./Home/Beranda";
import Pembelajaran from "./Home/Pembelajaran";
import ProfilSaya from "./Home/ProfilSaya";
import Settings from "./Home/Settings";
import Progress from "./Home/Progress";
import ProgressDetail from "./ProgressPage/ProgresDetail";
import PapanPeringkat from "./Home/PapanPeringkat";
import SedangDipelajari from "./BerandaPage/Home/SedangDipelajari";
import Materiterbaru from "./BerandaPage/Home/MateriTerbaru";
import DasarIslamKeimanan from "./BerandaPage/MateriTerbaruPage/DasarIslam";
import TematikPilihan from "./BerandaPage/ModeBelajar/TematikPilihan";
import JelajahiAplikasi from "./BerandaPage/Navbar/JelajahiAplikasi";
import TemaBelajar from "./BerandaPage/ModeBelajar/TemaBelajar";
import Pangkat from "../ButtonMobile/ProgressPage/Penghargaan/Pangkat";
import PangkatSebelumnya from "../ButtonMobile/ProgressPage/Penghargaan/PangkatSebelumnya";
import SeluruhPangkat from "./ProgressPage/Penghargaan/SeluruhPangkat";
import PangkatPemula from "./ProgressPage/Penghargaan/PangkatPemula";
import LevelDonatur from "./ProgressPage/LevelDonatur/LevelDonatur";
import DonaturSebelumnya from "./ProgressPage/LevelDonatur/DonaturSebelumnya";
import SeluruhLevelDonatur from "./ProgressPage/LevelDonatur/SeluruhLevelDonatur";
import Penghargaan from "./ProgressPage/LevelDonatur/Penghargaan";
import HadiahPencapaian from "./ProgressPage/HadiahPencapaianPage/HadiahPencapaian";
import Lencana from "./ProgressPage/LencanaBelajar/Lencana";
import TokoBerlian from "./ProgressPage/Statistik/TokoBerlian";
import DonasiSekarang from "./ProgressPage/Statistik/DonasiSekarang";
import DonasiPembayaran from "./ProgressPage/Statistik/DonasiPembayaran";
import Profil from "./BerandaPage/SettingsPage/Akun/Profil";
import Notifikasi from "./BerandaPage/SettingsPage/Akun/Notifikasi";
import NotifikasiDetail from "./BerandaPage/SettingsPage/Akun/NotifikasiDetail";
import Tampilan from "./BerandaPage/SettingsPage/Akun/Tampilan";
import Sertifikat from "./BerandaPage/SettingsPage/Akun/Sertifikat";
import DukungKami from "./BerandaPage/SettingsPage/Dukungan/DukungKami";
import LatarBelakang from "./BerandaPage/SettingsPage/Dukungan/LatarBelakang";
import Tujuan from "./BerandaPage/SettingsPage/Dukungan/Tujuan";
import VisiMisi from "./BerandaPage/SettingsPage/Dukungan/VisiMisi";
import Informasi from "./BerandaPage/SettingsPage/Dukungan/Informasi";
import Donatur from "./BerandaPage/SettingsPage/Dukungan/Donatur";
import Berita from "./BerandaPage/SettingsPage/Dukungan/Berita";
import BeritaTerbaru from "./BerandaPage/SettingsPage/Dukungan/BeritaTerbaru";
import RiwayatDana from "./BerandaPage/SettingsPage/Dukungan/RiwayatDana";
import PencairanDana from "./BerandaPage/SettingsPage/Dukungan/PencairanDana";
import PencairanDanaLima from "./BerandaPage/SettingsPage/Dukungan/PencairanDanaLima";
import Kontributor from "./BerandaPage/SettingsPage/Dukungan/Kontributor";
import ProfilPengguna from "./BerandaPage/SettingsPage/Dukungan/ProfilPengguna";
import SaranMasukan from "./BerandaPage/SettingsPage/Lainnya/SaranMasukan";
import TanyaJawab from "./BerandaPage/SettingsPage/Lainnya/TanyaJawab";

export const buttonMobileRoutes = [
  {
    path: "/beranda",
    element: <Beranda />,
  },
  {
    path: "/pembelajaran",
    element: <Pembelajaran />,
  },
  {
    path: "/profil-saya",
    element: <ProfilSaya />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/progress",
    element: <Progress />,
  },
  {
    path: "/progress-detail",
    element: <ProgressDetail />,
  },
  {
    path: "/papan-peringkat",
    element: <PapanPeringkat />,
  },
  {
    path: "/sedang-dipelajari",
    element: <SedangDipelajari />,
  },
  {
    path: "/materi-terbaru",
    element: <Materiterbaru />,
  },
  {
    path: "/dasar-islam-keimanan",
    element: <DasarIslamKeimanan />,
  },
  {
    path: "/tematik-pilihan",
    element: <TematikPilihan />,
  },
  {
    path: "/jelajahi-aplikasi",
    element: <JelajahiAplikasi />,
  },
  {
    path: "/tema-belajar",
    element: <TemaBelajar />,
  },
  {
    path: "/progress/pangkat",
    element: <Pangkat />,
  },
  {
    path: "/pangkat-sebelumnya",
    element: <PangkatSebelumnya />,
  },
  {
    path: "/seluruh-pangkat",
    element: <SeluruhPangkat />,
  },
  {
    path: "/pangkat/pangkat-pemula",
    element: <PangkatPemula />,
  },
  {
    path: "/progress/level-donatur",
    element: <LevelDonatur />,
  },
  {
    path: "/progress/level-donatur-sebelumnya",
    element: <DonaturSebelumnya />,
  },
  {
    path: "/progress/seluruh-level",
    element: <SeluruhLevelDonatur />,
  },
  {
    path: "/progress/level/penghargaan",
    element: <Penghargaan />,
  },
  {
    path: "/progress/hadiah-pencapaian",
    element: <HadiahPencapaian />,
  },
  {
    path: "/progress/lencana",
    element: <Lencana />,
  },
  {
    path: "/progress/toko-berlian",
    element: <TokoBerlian />,
  },
  {
    path: "/progress/donasi-sekarang",
    element: <DonasiSekarang />,
  },
  {
    path: "/progress/donasi-pembayaran",
    element: <DonasiPembayaran />,
  },
  {
    path: "/profil",
    element: <Profil />,
  },
  {
    path: "/notifikasi",
    element: <Notifikasi />,
  },
  {
    path: "/notifikasi-detail",
    element: <NotifikasiDetail />,
  },
  {
    path: "/tampilan",
    element: <Tampilan />,
  },
  {
    path: "/sertifikat",
    element: <Sertifikat />,
  },
  {
    path: "/dukung-kami",
    element: <DukungKami />,
  },
  {
    path: "/dukung-kami/latar-belakang",
    element: <LatarBelakang />,
  },
  {
    path: "/dukung-kami/latar-belakang/tujuan",
    element: <Tujuan />,
  },
  {
    path: "/dukung-kami/latar-belakang/visi-dan-misi",
    element: <VisiMisi />,
  },
  {
    path: "/dukung-kami/informasi",
    element: <Informasi />,
  },
  {
    path: "/dukung-kami/informasi/donatur",
    element: <Donatur />,
  },
  {
    path: "/dukung-kami/berita",
    element: <Berita />,
  },
  {
    path: "/dukung-kami/berita/terbaru",
    element: <BeritaTerbaru />,
  },
  {
    path: "/dukung-kami/riwayat-dana",
    element: <RiwayatDana />,
  },
  {
    path: "/dukung-kami/riwayat-dana/pencairan-dana-empat",
    element: <PencairanDana />,
  },
  {
    path: "/dukung-kami/riwayat-dana/pencairan-dana-lima",
    element: <PencairanDanaLima />,
  },
  {
    path: "/kontributor",
    element: <Kontributor />,
  },
  {
    path: "/profil-pengguna",
    element: <ProfilPengguna />,
  },
  {
    path: "/saran-masukan",
    element: <SaranMasukan />,
  },
  {
    path: "/tanya-jawab",
    element: <TanyaJawab />,
  },
];
