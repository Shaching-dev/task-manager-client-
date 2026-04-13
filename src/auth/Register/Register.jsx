import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { IoCloseOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import uploadIcon from "../../assets/upload-icon.png";
import axios from "axios";
import useAuth from "../../hooks/useAuth/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { registerWithEmail, updateUserProfile } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    // console.log(file);
    if (!file) return;

    // Optional: simple validation
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (jpg, png, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }
    // Create live preview
    setPreview(URL.createObjectURL(file));

    // Save the actual File object to react-hook-form
    setValue("photo", file, { shouldValidate: true });
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    setValue("photo", null);

    // Clear the hidden input so user can select the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRegister = async (data) => {
    // console.log("Registration Data:", data);
    setIsSubmitting(true);
    try {
      const photoImg = data.photo;
      const formData = new FormData();
      formData.append("image", photoImg);
      const imageAPI = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_img_api_key}`;
      const photoRes = await axios.post(imageAPI, formData);
      const photoURL = photoRes.data.data.display_url;
      const result = await registerWithEmail(data.email, data.password);
      console.log(result.user);
      console.log(photoURL);

      if (photoURL && data.name) {
        await updateUserProfile({
          displayName: data.name,
          photoURL: photoURL,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex  flex-col  justify-center items-center md:items-end  px-6 py-5">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-2" onSubmit={handleSubmit(handleRegister)}>
          <div className="space-y-4">
            <div>
              {/* === PROFESSIONAL PHOTO UPLOAD === */}
              <div className="flex flex-col items-center">
                <label className="block font-medium text-gray-700 mb-3">
                  Upload Photo
                </label>

                <div className="relative group">
                  {/* Clickable Preview Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-28 h-28 rounded-full border-4 border-gray-300 overflow-hidden cursor-pointer hover:border-green-500 transition-all flex items-center justify-center bg-gray-100">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={uploadIcon}
                        alt="Upload Icon"
                        className="w-12 h-12 opacity-70"
                      />
                    )}
                  </div>

                  {/* Change button (appears only after photo is selected) */}
                  {preview && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-1 right-1 bg-white text-xs px-3 py-1 rounded-full shadow border text-gray-700 hover:bg-gray-50 flex items-center gap-1 text-[10px]">
                      Change
                    </button>
                  )}

                  {/* Cancel / Remove button */}
                  {preview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow transition">
                      <IoCloseOutline size={18} />
                    </button>
                  )}
                </div>

                {/* Hidden real file input */}
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: true })}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Click to upload (JPG, PNG • max 5MB)
                </p>

                {errors?.photo?.type === "required" && (
                  <p className="text-red-500 text-sm">Photo is required</p>
                )}
              </div>
              {/* === END PHOTO UPLOAD === */}
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  placeholder="••••••••"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-3 cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              {isSubmitting ? "please wait..." : "Register"}
            </button>
          </div>
        </form>

        <div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
