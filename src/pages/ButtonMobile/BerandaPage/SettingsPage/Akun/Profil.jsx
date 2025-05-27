import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { useTheme } from "../../../../../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { saveUserCreate, setUser } from "../../Reducer/userProfile";

const Profil = () => {
//   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, getBorder, getButtonClass, getBorderClass, middleTheme } =
    useTheme();
//   const userData = useSelector((state) => state.userProfile.user);

//   const saveUserToLocal = (user) => {
//     localStorage.setItem("userProfile", JSON.stringify(user));
//   };

//   const loadUserFromLocal = () => {
//     const data = localStorage.getItem("userProfile");
//     return data ? JSON.parse(data) : null;
//   };

//   const [form, setForm] = useState({
//     donation_name: "",
//     full_name: "",
//     date_of_birth: "",
//     gender: "",
//     phone_number: "",
//     bio: "",
//     location: "",
//     occupation: "",
//   });

//   useEffect(() => {
//     if (userData) {
//       setForm({
//         donation_name: userData.donation_name || "",
//         full_name: userData.full_name || "",
//         date_of_birth: userData.date_of_birth?.split("T")[0] || "",
//         gender: userData.gender || "",
//         phone_number: userData.phone_number || "",
//         bio: userData.bio || "",
//         location: userData.location || "",
//         occupation: userData.occupation || "",
//       });
//       saveUserToLocal(userData);
//     } else {
//       const localUser = loadUserFromLocal();
//       if (localUser) {
//         setForm({
//           donation_name: localUser.donation_name || "",
//           full_name: localUser.full_name || "",
//           date_of_birth: localUser.date_of_birth?.split("T")[0] || "",
//           gender: localUser.gender || "",
//           phone_number: localUser.phone_number || "",
//           bio: localUser.bio || "",
//           location: localUser.location || "",
//           occupation: localUser.occupation || "",
//         });
//         dispatch(setUser(localUser));
//       }
//     }
//   }, [userData, dispatch]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("id");
//     if (!userId) return alert("User ID tidak ditemukan di localStorage");

//     const payload = {
//       user_id: userId,
//       ...form,
//       date_of_birth: new Date(form.date_of_birth).toISOString(),
//     };

//     try {
//       const result = await dispatch(saveUserCreate(payload));
//       if (saveUserCreate.fulfilled.match(result)) {
//         alert("✅ Profil berhasil disimpan!");
//         const updatedUser = { ...form, user_id: userId };
//         dispatch(setUser(updatedUser));
//         saveUserToLocal(updatedUser);
//       } else {
//         alert(
//           `❌ Gagal menyimpan profil: ${result.payload || "Terjadi kesalahan"}`
//         );
//       }
//     } catch (err) {
//       alert(`❌ Error: ${err.message || "Terjadi kesalahan"}`);
//     }
//   };

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

        <form className="flex flex-col gap-4">
          <InputField
            label="Nama Lengkap"
            name="full_name"
            // value={form.full_name}
            // onChange={handleChange}
            placeholder="Budi"
          />
          <InputField
            label="Nama Donatur"
            name="donation_name"
            // value={form.donation_name}
            // onChange={handleChange}
            placeholder="Budi"
          />
          <InputField
            label="Nomor Telepon"
            name="phone_number"
            // value={form.phone_number}
            // onChange={handleChange}
            placeholder="081234567890"
          />
          <InputField
            label="Domisili"
            name="location"
            // value={form.location}
            // onChange={handleChange}
            placeholder="Jakarta"
          />
          <InputField
            label="Tanggal Lahir"
            name="date_of_birth"
            type="date"
            // value={form.date_of_birth}
            // onChange={handleChange}
            placeholder="YYYY-MM-DD"
          />
          <InputField
            label="Pekerjaan"
            name="occupation"
            // value={form.occupation}
            // onChange={handleChange}
            placeholder="Mahasiswa"
          />
          <InputField
            label="Bio"
            name="bio"
            // value={form.bio}
            // onChange={handleChange}
            placeholder="Pencinta Ilmu"
          />
          <InputField
            label="Jenis Kelamin"
            name="gender"
            // value={form.gender}
            // onChange={handleChange}
            placeholder="male / female"
          />
          <button
            type="submit"
            className={`border-none rounded-xl p-3 ${getButtonClass()} mt-5 md:mt-20`}
          >
            Simpan
          </button>
         
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => {
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
          placeholder={placeholder}
          onChange={onChange}
          className="flex-1 bg-transparent focus:outline-none"
        />
        <AiFillEdit className="text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default Profil;
