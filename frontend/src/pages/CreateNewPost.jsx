import { useState, useRef, useContext } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import apiRequest from "../lib/apiRequest";
import UploadWidget from "../components/UploadWidget";
import { useNavigate } from "react-router-dom";
import PostDetailView, { PreviewDataContext } from "./PostDetailView";

function CreateNewPost() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const formRef = useRef(null);
  const navigate = useNavigate();

  const updatePreviewStructure = (currentQuillValue = value, currentImages = images) => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const inputs = Object.fromEntries(formData);

    const mockPostData = {
      title: inputs.title || "Untitled Property Listing",
      price: parseInt(inputs.price) || 0,
      address: inputs.address || "No address provided",
      city: inputs.city || "",
      bedroom: parseInt(inputs.bedroom) || 1,
      bathroom: parseInt(inputs.bathroom) || 1,
      type: inputs.type || "rent",
      property: inputs.property || "apartment",
      latitude: inputs.latitude || "0",
      longitude: inputs.longitude || "0",
      images: currentImages.length > 0 ? currentImages : ["/no-image.png"],
      isSaved: false,
      user: {
        username: "You (Preview)",
        avatar: "/noavatar.jpg",
      },
      postDetail: {
        desc: currentQuillValue,
        utilities: inputs.utilities || "owner",
        pet: inputs.pet || "allowed",
        income: inputs.income || "No requirements stated",
        size: parseInt(inputs.size) || 0,
        school: parseInt(inputs.school) || 0,
        bus: parseInt(inputs.bus) || 0,
        restaurant: parseInt(inputs.restaurant) || 0,
      },
    };

    setPreviewData(mockPostData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images.length > 0 ? images : ["/no-image.png"],
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.error(err);
      setError("Failed to create post. Please try again.");
    }
  };

  const inputStyle =
    "p-4 border border-gray-400 rounded-[5px] outline-none focus:border-teal-600 transition-colors text-gray-700 w-full";

return (
  <div className="h-screen w-full overflow-hidden bg-[#f6f7fb] flex">

    {/* LEFT - FORM */}
    <div className={`flex-1 overflow-y-auto p-6 ${showPreview ? "hidden xl:block" : "block"}`}>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Create Listing</h1>
          <p className="text-sm text-gray-500">Add property details below</p>
        </div>

        <button
          type="button"
          onClick={() => {
            updatePreviewStructure();
            setShowPreview(true);
          }}
          className="xl:hidden px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold"
        >
          Preview
        </button>
      </div>

      {/* FORM CARD */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col gap-6"
      >

        {/* GRID INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {[
            ["Title", "title", "text"],
            ["Price", "price", "number"],
            ["Address", "address", "text"],
            ["City", "city", "text"],
            ["Bedrooms", "bedroom", "number"],
            ["Bathrooms", "bathroom", "number"],
            ["Latitude", "latitude", "text"],
            ["Longitude", "longitude", "text"],
            ["Income Policy", "income", "text"],
            ["Size (sqft)", "size", "number"],
            ["School (m)", "school", "number"],
            ["Bus (m)", "bus", "number"],
            ["Restaurant (m)", "restaurant", "number"],
          ].map(([label, name, type]) => (
            <div key={name} className="flex flex-col gap-1.5">

              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {label}
              </label>

              <input
                name={name}
                type={type}
                className="h-11 px-3 rounded-xl border border-gray-200 focus:border-gray-900 outline-none text-sm"
                onChange={() => updatePreviewStructure()}
              />
            </div>
          ))}

          {/* TYPE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Type
            </label>
            <select
              name="type"
              className="h-11 px-3 rounded-xl border border-gray-200"
              onChange={() => updatePreviewStructure()}
            >
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
            </select>
          </div>

          {/* PROPERTY */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Property
            </label>
            <select
              name="property"
              className="h-11 px-3 rounded-xl border border-gray-200"
              onChange={() => updatePreviewStructure()}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>

          {/* UTILITIES */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Utilities
            </label>
            <select
              name="utilities"
              className="h-11 px-3 rounded-xl border border-gray-200"
              onChange={() => updatePreviewStructure()}
            >
              <option value="owner">Owner pays</option>
              <option value="tenant">Tenant pays</option>
              <option value="shared">Shared</option>
            </select>
          </div>

          {/* PET */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Pet Policy
            </label>
            <select
              name="pet"
              className="h-11 px-3 rounded-xl border border-gray-200"
              onChange={() => updatePreviewStructure()}
            >
              <option value="allowed">Allowed</option>
              <option value="not-allowed">Not Allowed</option>
            </select>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Description
          </label>

          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={(val) => {
                setValue(val);
                updatePreviewStructure(val);
              }}
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="h-12 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-black transition"
        >
          Publish Listing
        </button>

        {error && (
          <p className="text-sm text-red-500 font-medium">{error}</p>
        )}
      </form>
    </div>

  {/* PREVIEW */}
<div className="flex-1 flex flex-col overflow-hidden">

  {/* HEADER */}
  <div className="p-4 border-b flex items-center justify-between shrink-0">
    <p className="font-semibold text-gray-800">Live Preview</p>

    <button
      onClick={() => setShowPreview(false)}
      className="xl:hidden text-xs px-3 py-1 bg-gray-900 text-white rounded-lg"
    >
      Back
    </button>
  </div>

  {/* PREVIEW CONTENT */}
  <div className="flex-1 overflow-hidden bg-gray-50">

    {previewData ? (
      <div className="h-full overflow-y-auto p-4">

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">

          {/* TITLE + PRICE */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {previewData.title}
            </h2>
            <p className="text-sm text-gray-500">
              {previewData.address}
            </p>

            <div className="inline-block mt-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-full">
              ${previewData.price?.toLocaleString()}
            </div>
          </div>

          {/* META */}
          <div className="grid grid-cols-2 gap-3">

            <div className="p-3 rounded-xl bg-gray-50 border">
              <p className="text-xs text-gray-500">Type</p>
              <p className="font-semibold text-gray-800 capitalize">
                {previewData.type}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border">
              <p className="text-xs text-gray-500">Property</p>
              <p className="font-semibold text-gray-800 capitalize">
                {previewData.property}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border">
              <p className="text-xs text-gray-500">Bedrooms</p>
              <p className="font-semibold text-gray-800">
                {previewData.bedroom}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border">
              <p className="text-xs text-gray-500">Bathrooms</p>
              <p className="font-semibold text-gray-800">
                {previewData.bathroom}
              </p>
            </div>

          </div>

          {/* LOCATION */}
          <div className="p-3 rounded-xl border bg-gray-50">
            <p className="text-xs text-gray-500">Location</p>
            <p className="font-medium text-gray-800">
              {previewData.city || "No city"} | {previewData.address}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Description
            </p>

            <div
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  previewData.postDetail?.desc ||
                  "<p>No description provided</p>",
              }}
            />
          </div>

          {/* EXTRA INFO */}
          <div className="border-t pt-4 grid grid-cols-2 gap-3 text-sm">

            <p><span className="text-gray-500">Utilities:</span> {previewData.postDetail?.utilities}</p>
            <p><span className="text-gray-500">Pet:</span> {previewData.postDetail?.pet}</p>
            <p><span className="text-gray-500">Income:</span> {previewData.postDetail?.income}</p>
            <p><span className="text-gray-500">Size:</span> {previewData.postDetail?.size} sqft</p>

          </div>

        </div>

      </div>
    ) : (
      <div className="h-full flex items-center justify-center text-center text-gray-500 text-sm p-6">
        Fill form to generate preview
      </div>
    )}

  </div>
</div>
  </div>
);
}

export default CreateNewPost;