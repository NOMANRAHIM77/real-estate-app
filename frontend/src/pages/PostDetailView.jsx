import Slider from "../components/Slider";
import Map from "../components/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

function PostDetailView() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post?.isSaved || false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Safeguard in case loader encounters an unexpected payload status
  if (!post) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500 font-medium">
        Loading listing parameters...
      </div>
    );
  }

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="flex h-full md:flex-col md:overflow-scroll bg-white">
      
      {/* LEFT CONTENT PANEL */}
      <div className="flex-[3] h-full overflow-y-scroll md:flex-none md:h-max md:mb-[50px]">
        <div className="pr-[50px] lg:pr-20 md:pr-0">
          <Slider images={post.images || ["/no-image.png"]} />
          
          <div className="mt-[50px]">
            {/* META TOP BAR */}
            <div className="flex justify-between sm:flex-col sm:gap-5">
              <div className="flex flex-col gap-5">
                <h1 className="font-normal text-3xl text-gray-900">{post.title}</h1>
                <div className="flex gap-1.5 items-center text-gray-400 text-sm">
                  <img src="/pin.png" alt="Location" className="w-4 h-4" />
                  <span>{post.address}</span>
                </div>
                <div className="p-1.5 bg-[#fece51]/40 rounded-md w-max text-xl font-light text-gray-900">
                  $ {post.price}
                </div>
              </div>
              
              {/* OWNER CARD */}
              <div className="flex flex-col items-center justify-center gap-5 px-[50px] sm:py-5 rounded-[10px] bg-[#fece51]/20 font-semibold text-gray-800">
                <img 
                  src={post.user?.avatar || "/noavatar.jpg"} 
                  alt={post.user?.username} 
                  className="w-[50px] h-[50px] rounded-full object-cover" 
                />
                <span>{post.user?.username || "Agent"}</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div
              className="mt-[50px] text-[#555] leading-6 space-y-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail?.desc || "No description provided."),
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR PANEL */}
      <div className="flex-[2] bg-[#fcf5f3] h-full overflow-y-scroll md:flex-none md:h-max md:mb-[50px]">
        <div className="px-5 py-0 md:p-5 flex flex-col gap-5 [&_img]:w-6 [&_img]:h-6">
          
          <p className="font-bold text-lg text-gray-800 mb-1">General</p>
          
          <div className="flex flex-col gap-5 py-5 px-2.5 bg-white rounded-[10px] shadow-sm">
            {/* UTILITIES */}
            <div className="flex items-center gap-2.5">
              <img src="/utility.png" alt="" className="bg-[#fece51]/20 rounded p-0.5" />
              <div className="text-xs">
                <span className="font-bold text-gray-700">Utilities</span>
                <p className="text-sm text-gray-500">
                  {post.postDetail?.utilities === "owner" ? "Owner is responsible" : "Tenant is responsible"}
                </p>
              </div>
            </div>
            
            {/* PETS */}
            <div className="flex items-center gap-2.5">
              <img src="/pet.png" alt="" className="bg-[#fece51]/20 rounded p-0.5" />
              <div className="text-xs">
                <span className="font-bold text-gray-700">Pet Policy</span>
                <p className="text-sm text-gray-500">
                  {post.postDetail?.pet === "allowed" ? "Pets Allowed" : "Pets not Allowed"}
                </p>
              </div>
            </div>

            {/* INCOME */}
            <div className="flex items-center gap-2.5">
              <img src="/fee.png" alt="" className="bg-[#fece51]/20 rounded p-0.5" />
              <div className="text-xs">
                <span className="font-bold text-gray-700">Income Policy</span>
                <p className="text-sm text-gray-500">{post.postDetail?.income || "No strict requirements"}</p>
              </div>
            </div>
          </div>

          <p className="font-bold text-lg text-gray-800 mb-1">Sizes</p>
          <div className="flex justify-between lg:text-xs gap-2">
            <div className="flex flex-1 items-center justify-center gap-2 bg-white p-2.5 rounded-[5px] shadow-sm">
              <img src="/size.png" alt="" className="w-5 h-5" />
              <span className="text-sm text-gray-600 font-medium">{post.postDetail?.size || 0} sqft</span>
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 bg-white p-2.5 rounded-[5px] shadow-sm">
              <img src="/bed.png" alt="" className="w-5 h-5" />
              <span className="text-sm text-gray-600 font-medium">{post.bedroom} beds</span>
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 bg-white p-2.5 rounded-[5px] shadow-sm">
              <img src="/bath.png" alt="" className="w-5 h-5" />
              <span className="text-sm text-gray-600 font-medium">{post.bathroom} baths</span>
            </div>
          </div>

          <p className="font-bold text-lg text-gray-800 mb-1">Nearby Places</p>
          <div className="flex justify-between py-5 px-2.5 bg-white rounded-[10px] shadow-sm gap-2">
            <div className="flex flex-col items-center text-center gap-1 flex-1">
              <img src="/school.png" alt="" className="bg-[#fece51]/20 rounded p-1" />
              <span className="font-bold text-xs text-gray-700">School</span>
              <p className="text-xs text-gray-500">
                {post.postDetail?.school > 999 ? (post.postDetail.school / 1000) + "km" : (post.postDetail?.school || 0) + "m"} away
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-1 flex-1">
              <img src="/pet.png" alt="" className="bg-[#fece51]/20 rounded p-1" />
              <span className="font-bold text-xs text-gray-700">Bus Stop</span>
              <p className="text-xs text-gray-500">{post.postDetail?.bus || 0}m away</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1 flex-1">
              <img src="/fee.png" alt="" className="bg-[#fece51]/20 rounded p-1" />
              <span className="font-bold text-xs text-gray-700">Restaurant</span>
              <p className="text-xs text-gray-500">{post.postDetail?.restaurant || 0}m away</p>
            </div>
          </div>

          <p className="font-bold text-lg text-gray-800 mb-1">Location</p>
          <div className="w-full h-[200px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <Map items={[post]} />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between gap-4 mt-2">
            <button className="flex-1 py-4 flex items-center justify-center gap-2 bg-white border border-[#fece51] text-gray-700 font-medium rounded-[5px] cursor-pointer hover:bg-gray-50 transition-colors">
              <img src="/chat.png" alt="" className="w-4 h-4" />
              Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
              className="flex-1 py-4 flex items-center justify-center gap-2 border border-[#fece51] text-gray-700 font-medium rounded-[5px] cursor-pointer transition-colors"
            >
              <img src="/save.png" alt="" className="w-4 h-4" />
              {saved ? "Saved" : "Save Place"}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default PostDetailView;