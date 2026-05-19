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
    <div className="flex flex-col xl:flex-row h-screen w-full overflow-hidden">

      {/* LEFT FORM */}
      <div className={`flex-[3] overflow-y-auto h-full px-6 transition-all duration-300 ${showPreview ? "hidden xl:block" : "block"}`}>
        <div className="my-[30px] mb-[100px]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-light text-gray-800">Add New Post</h1>
            <button
              type="button"
              onClick={() => { updatePreviewStructure(); setShowPreview(true); }}
              className="xl:hidden px-4 py-2 bg-gray-800 text-white rounded text-sm font-medium"
            >
              See Visual Preview
            </button>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-wrap justify-between gap-5">

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="title" className="text-sm font-medium text-gray-600">Title</label>
              <input id="title" name="title" type="text" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="price" className="text-sm font-medium text-gray-600">Price</label>
              <input id="price" name="price" type="number" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="address" className="text-sm font-medium text-gray-600">Address</label>
              <input id="address" name="address" type="text" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full h-auto md:h-[320px] flex flex-col gap-1.5 mb-14 md:mb-0 [&_.ql-editor]:h-[200px] [&_.ql-editor]:text-base">
              <label htmlFor="desc" className="text-sm font-medium text-gray-600">Description</label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={(val) => { setValue(val); updatePreviewStructure(val); }}
              />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="city" className="text-sm font-medium text-gray-600">City</label>
              <input id="city" name="city" type="text" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="bedroom" className="text-sm font-medium text-gray-600">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" defaultValue={1} className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="bathroom" className="text-sm font-medium text-gray-600">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" defaultValue={1} className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="latitude" className="text-sm font-medium text-gray-600">Latitude</label>
              <input id="latitude" name="latitude" type="text" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="longitude" className="text-sm font-medium text-gray-600">Longitude</label>
              <input id="longitude" name="longitude" type="text" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="type" className="text-sm font-medium text-gray-600">Type</label>
              <select id="type" name="type" defaultValue="rent" className={`${inputStyle} p-[15px]`} onChange={() => updatePreviewStructure()}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="property" className="text-sm font-medium text-gray-600">Property</label>
              <select id="property" name="property" defaultValue="apartment" className={`${inputStyle} p-[15px]`} onChange={() => updatePreviewStructure()}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="utilities" className="text-sm font-medium text-gray-600">Utilities Policy</label>
              <select id="utilities" name="utilities" defaultValue="owner" className={`${inputStyle} p-[15px]`} onChange={() => updatePreviewStructure()}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="pet" className="text-sm font-medium text-gray-600">Pet Policy</label>
              <select id="pet" name="pet" defaultValue="allowed" className={`${inputStyle} p-[15px]`} onChange={() => updatePreviewStructure()}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="income" className="text-sm font-medium text-gray-600">Income Policy</label>
              <input id="income" name="income" type="text" placeholder="Income Policy" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="size" className="text-sm font-medium text-gray-600">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="school" className="text-sm font-medium text-gray-600">School</label>
              <input min={0} id="school" name="school" type="number" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="bus" className="text-sm font-medium text-gray-600">Bus</label>
              <input min={0} id="bus" name="bus" type="number" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-1.5">
              <label htmlFor="restaurant" className="text-sm font-medium text-gray-600">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" className={inputStyle} onChange={() => updatePreviewStructure()} />
            </div>

            <button type="submit" className="w-full md:w-[30%] p-4 bg-teal-600 text-white font-bold rounded-[5px] hover:bg-teal-700 transition-colors cursor-pointer self-end h-[56px]">
              Publish Post
            </button>

            {error && <span className="w-full text-red-500 text-sm font-medium mt-2">{error}</span>}
          </form>
        </div>
      </div>

      {/* RIGHT PREVIEW PANEL */}
      <div className={`flex-[2] bg-[#fcf5f3] h-full flex flex-col relative border-l border-gray-200 ${showPreview ? "block w-full" : "hidden xl:flex"}`}>
        <div className="p-4 flex gap-4 bg-white border-b border-gray-200 justify-between items-center xl:hidden">
          <span className="font-semibold text-gray-700">Live Post Preview</span>
          <button
            onClick={() => setShowPreview(false)}
            className="px-3 py-1 bg-teal-600 text-white rounded text-xs font-semibold"
          >
            Back to Editor Form
          </button>
        </div>

        <div className="p-4 bg-white border-b border-gray-100 flex flex-col items-center gap-3">
          <div className="w-full flex flex-wrap gap-2 justify-center max-h-[110px] overflow-y-auto">
            {images.length === 0 && (
              <span className="text-xs text-gray-400 py-2">No listing images added yet</span>
            )}
            {images.map((image, index) => (
              <img src={image} key={index} alt="" className="w-16 h-12 object-cover rounded border border-gray-200" />
            ))}
          </div>
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "lamadev",
              uploadPreset: "estate",
              folder: "posts",
            }}
            setState={(updateFn) => {
              setImages((prev) => {
                const nextImages = typeof updateFn === "function" ? updateFn(prev) : updateFn;
                setTimeout(() => updatePreviewStructure(value, nextImages), 50);
                return nextImages;
              });
            }}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {previewData ? (
            <div className="border border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden h-full">
              {/*
                PreviewDataContext.Provider is imported from PostDetailView.
                PostDetailView checks this context first — if it has data,
                it renders PostDetailContent directly without calling useLoaderData.
              */}
              <PreviewDataContext.Provider value={previewData}>
                <PostDetailView />
              </PreviewDataContext.Provider>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-2">
              <p className="text-gray-500 text-sm">
                Fill out the left form attributes to construct mock templates inline.
              </p>
              <button
                type="button"
                onClick={() => updatePreviewStructure()}
                className="px-4 py-2 bg-teal-600 text-white rounded-md font-medium text-xs hover:bg-teal-700 transition-all shadow-sm"
              >
                Force Structure Compilation
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default CreateNewPost;