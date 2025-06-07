import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { useTheme } from "../../../../../Context/ThemeContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveUserCreate, getUserProfile } from "../Reducer/userProfil";

const Profil = () => {
  const dispatch = useDispatch();
  const { getBorder, getButtonClass, middleTheme } = useTheme();

  const {
    data: userData,
    loading,
    error,
  } = useSelector((state) => state.userProfile);

  const [form, setForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ambil data user saat mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Isi form hanya setelah data tersedia
  useEffect(() => {
    if (userData) {
      setForm({
        donation_name: userData.donation_name ?? "",
        full_name: userData.full_name ?? "",
        date_of_birth: userData.date_of_birth
          ? userData.date_of_birth.split("T")[0]
          : "",
        gender: userData.gender ?? "",
        phone_number: userData.phone_number ?? "",
        bio: userData.bio ?? "",
        location: userData.location ?? "",
        occupation: userData.occupation ?? "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = ["full_name", "donation_name"];
    const missingFields = requiredFields.filter(
      (field) => !form[field] || form[field].trim() === ""
    );

    if (missingFields.length > 0) {
      alert(`❌ Field berikut wajib diisi: ${missingFields.join(", ")}`);
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...form,
      date_of_birth: form.date_of_birth
        ? new Date(form.date_of_birth).toISOString()
        : null,
    };

    try {
      const result = await dispatch(saveUserCreate(payload));
      if (saveUserCreate.fulfilled.match(result)) {
        alert("✅ Profil berhasil disimpan!");
        dispatch(getUserProfile()); // Refresh
      } else {
        const errorMessage =
          result.payload || result.error?.message || "Terjadi kesalahan";
        alert(`❌ Gagal menyimpan profil: ${errorMessage}`);
      }
    } catch (err) {
      alert(`❌ Error: ${err.message || "Terjadi kesalahan tak terduga"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Saat data masih loading atau belum siap
  if (loading || !form) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:px-5 min-h-screen w-full h-full">
      <div
        className={`py-2 flex flex-col text-xl px-5 flex-grow max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <Link to={"/settings"}>
          <div className="flex items-center gap-2">
            <FaArrowLeft className="text-2xl cursor-pointer" />
            <h1 className="text-2xl font-semibold">Profil</h1>
          </div>
        </Link>

        <p className="text-gray-600 mt-4 text-lg font-medium mb-4">
          Harap diisi profil pengguna untuk kemajuan aplikasi. Data pengguna
          insya Allah akan kami lindungi.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label="Nama Lengkap"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
          />
          <InputField
            label="Nama Donatur"
            name="donation_name"
            value={form.donation_name}
            onChange={handleChange}
          />
          <InputField
            label="Nomor Telepon"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
          />
          <InputField
            label="Domisili"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          <InputField
            label="Tanggal Lahir"
            name="date_of_birth"
            type="date"
            value={form.date_of_birth}
            onChange={handleChange}
          />
          <InputField
            label="Pekerjaan"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
          />
          <InputField
            label="Bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
          />

          {/* Select Gender */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="gender"
              className="text-sm font-medium text-gray-700"
            >
              Jenis Kelamin
            </label>
            <div
              className={`flex text-sm font-medium items-center border ${getBorder()} rounded-lg p-2`}
            >
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="flex-1 bg-transparent focus:outline-none"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
              <AiFillEdit className="text-gray-400 cursor-pointer" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`border-none rounded-xl p-3 ${getButtonClass()} mt-5 md:mt-20 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => {
  const { getBorder } = useTheme();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        className={`flex text-sm font-medium items-center border ${getBorder()} rounded-lg p-2`}
      >
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent focus:outline-none"
        />
        <AiFillEdit className="text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default Profil;
