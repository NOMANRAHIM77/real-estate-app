import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../components/UploadWidget";

function UpdateProfile() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

return (
  <div className="flex flex-col-reverse md:flex-row h-full w-full bg-white">

    {/* FORM */}
    <div className="flex-[3] flex items-center justify-center p-8 md:p-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-[420px]">

        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
          <p className="text-gray-400 text-sm mt-1">Make changes to your account details</p>
        </div>

        {[
          { id: "username", label: "Username", type: "text", defaultValue: currentUser.username, placeholder: "" },
          { id: "email", label: "Email Address", type: "email", defaultValue: currentUser.email, placeholder: "" },
          { id: "password", label: "New Password", type: "password", defaultValue: "", placeholder: "Leave blank to keep current" },
        ].map(({ id, label, type, defaultValue, placeholder }) => (
          <div key={id} className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              defaultValue={defaultValue}
              placeholder={placeholder}
              className="p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-amber-400 focus:bg-white focus:shadow-sm transition-all text-gray-900 placeholder-gray-300 text-sm"
            />
          </div>
        ))}

        <button className="p-4 bg-[#fece51] hover:bg-yellow-400 text-gray-900 font-bold rounded-xl transition-all duration-200 cursor-pointer mt-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-200/50 shadow-sm">
          Save Changes
        </button>

        {error && (
          <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-xl border border-red-100">
            {error}
          </div>
        )}
      </form>
    </div>

    {/* AVATAR PANEL */}
    <div className="flex-[2] bg-gray-50 border-l border-gray-200 flex flex-col gap-6 items-center justify-center py-10 md:py-0 px-8">
      <div className="relative">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt="Avatar Preview"
          className="w-36 h-36 object-cover rounded-2xl ring-4 ring-white shadow-xl border border-gray-200"
        />
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm" />
      </div>

      <div className="text-center">
        <p className="text-gray-900 font-bold text-lg">{currentUser.username}</p>
        <p className="text-gray-400 text-sm mt-0.5 break-all">{currentUser.email}</p>
      </div>

      <div className="w-full flex flex-col items-center gap-2">
        <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Profile Photo</p>
        <UploadWidget
          uwConfig={{
            cloudName: "lamadev",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  </div>
);
}

export default UpdateProfile;