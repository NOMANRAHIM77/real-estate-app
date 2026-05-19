import Slider from "../components/Slider";
import Map from "../components/Map";
import { useNavigate, useLoaderData, Await } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState, Suspense, createContext } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

// Preview context - created here and exported so CreateNewPost can import it
export const PreviewDataContext = createContext(null);

function PostDetailContent({ post }) {
  const [saved, setSaved] = useState(post?.isSaved || false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleCreateChat = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (currentUser.id === post.userId) {
      alert("You cannot start a chat room with yourself on your own listing!");
      return;
    }
    try {
      await apiRequest.post("/chats", { receiverId: post.userId });
      navigate("/profile");
    } catch (err) {
      console.error("Failed to create or navigate to chat room:", err);
      alert("Something went wrong initializing the chat channel.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-white md:flex-col md:h-auto md:overflow-visible overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex-[3] h-full overflow-y-auto p-6 md:flex-none md:h-auto md:overflow-visible">
        <div className="pr-[30px] lg:pr-0">

          <Slider images={post.images || ["/no-image.png"]} />

          <div className="mt-8">
            <div className="flex justify-between sm:flex-col sm:gap-5">

              {/* POST INFO */}
              <div className="flex flex-col gap-4">
                <h1 className="font-normal text-3xl text-gray-900">{post.title}</h1>
                <div className="flex items-center gap-[5px] text-[#888] text-sm">
                  <img src="/pin.png" alt="" className="w-4 h-4" />
                  <span>{post.address}</span>
                </div>
                <div className="px-3 py-1 bg-[#fece5170] rounded-md w-max text-xl font-light">
                  $ {post.price}
                </div>
              </div>

              {/* USER CARD */}
              <div className="flex flex-col items-center justify-center gap-3 px-[40px] py-4 rounded-[10px] bg-[#fece5135] font-semibold sm:py-5">
                <img
                  src={post.user?.avatar || "/noavatar.jpg"}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <span>{post.user?.username || "Agent"}</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div
              className="mt-8 text-[#555] leading-7"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail?.desc || "No description available."),
              }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-[2] bg-[#fcf5f3] h-full overflow-y-auto p-6 md:flex-none md:h-auto md:overflow-visible pb-12">
        <div className="flex flex-col gap-6">

          {/* GENERAL */}
          <div>
            <p className="font-bold text-lg mb-3">General</p>
            <div className="flex flex-col gap-4 p-5 bg-white rounded-[10px]">
              <div className="flex items-center gap-[10px]">
                <img src="/utility.png" alt="" className="w-6 h-6 bg-[#fece5135] rounded" />
                <div>
                  <span className="font-bold block text-sm">Utilities</span>
                  <p className="text-xs text-gray-500">
                    {post.postDetail?.utilities === "owner"
                      ? "Owner is responsible"
                      : "Tenant is responsible"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[10px]">
                <img src="/pet.png" alt="" className="w-6 h-6 bg-[#fece5135] rounded" />
                <div>
                  <span className="font-bold block text-sm">Pet Policy</span>
                  <p className="text-xs text-gray-500">
                    {post.postDetail?.pet === "allowed" ? "Pets Allowed" : "Pets not Allowed"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[10px]">
                <img src="/fee.png" alt="" className="w-6 h-6 bg-[#fece5135] rounded" />
                <div>
                  <span className="font-bold block text-sm">Income Policy</span>
                  <p className="text-xs text-gray-500">
                    {post.postDetail?.income || "No requirements"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SIZES */}
          <div>
            <p className="font-bold text-lg mb-3">Sizes</p>
            <div className="flex justify-between gap-2 lg:text-xs">
              <div className="flex items-center gap-2 bg-white p-[10px] rounded-md flex-1 justify-center">
                <img src="/size.png" alt="" className="w-5 h-5" />
                <span>{post.postDetail?.size || 0} sqft</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-[10px] rounded-md flex-1 justify-center">
                <img src="/bed.png" alt="" className="w-5 h-5" />
                <span>{post.bedroom} beds</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-[10px] rounded-md flex-1 justify-center">
                <img src="/bath.png" alt="" className="w-5 h-5" />
                <span>{post.bathroom} bath</span>
              </div>
            </div>
          </div>

          {/* NEARBY */}
          <div>
            <p className="font-bold text-lg mb-3">Nearby Places</p>
            <div className="flex flex-wrap md:flex-nowrap justify-between bg-white rounded-[10px] p-4 gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[80px]">
                <img src="/school.png" alt="" className="w-6 h-6 bg-[#fece5135] rounded" />
                <div>
                  <span className="font-bold text-xs block">School</span>
                  <p className="text-[11px] text-gray-500">
                    {post.postDetail?.school > 999
                      ? post.postDetail.school / 1000 + "km"
                      : (post.postDetail?.school || 0) + "m"} away
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[80px]">
                <img src="/pet.png" alt="" className="w-6 h-6 bg-[#fece5135] rounded" />
                <div>
                  <span className="font-bold text-xs block">Bus Stop</span>
                  <p className="text-[11px] text-gray-500">{post.postDetail?.bus || 0}m away</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[80px]">
                <img src="/fee.png" alt="" className="w-6 h-6 bg-[#fece5135] rounded" />
                <div>
                  <span className="font-bold text-xs block">Restaurant</span>
                  <p className="text-[11px] text-gray-500">{post.postDetail?.restaurant || 0}m away</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div>
            <p className="font-bold text-lg mb-3">Location</p>
            <div className="w-full h-[220px] rounded-xl overflow-hidden shadow-sm">
              <Map items={[post]} />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between gap-4 mt-2">
            <button
              onClick={handleCreateChat}
              className="flex-1 p-4 flex items-center justify-center gap-2 bg-white border border-[#fece51] rounded-md cursor-pointer hover:bg-amber-50/50 transition-all active:scale-[0.98] text-sm font-medium shadow-sm"
            >
              <img src="/chat.png" alt="" className="w-4 h-4" />
              Send Message
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
              className="flex-1 p-4 flex items-center justify-center gap-2 border border-[#fece51] rounded-md cursor-pointer transition-all text-sm font-medium shadow-sm"
            >
              <img src="/save.png" alt="" className="w-4 h-4" />
              {saved ? "Place Saved" : "Save Place"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function PostDetailView() {
  // Check if we are inside the preview context from CreateNewPost
  const previewData = useContext(PreviewDataContext);

  // PREVIEW MODE: render directly with mock data, skip loader entirely
  if (previewData) {
    return <PostDetailContent post={previewData} />;
  }

  // NORMAL MODE: use deferred loader data from React Router
  return <PostDetailViewWithLoader />;
}

function PostDetailViewWithLoader() {
  const data = useLoaderData();

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-gray-500 font-medium">
          Loading listing...
        </div>
      }
    >
      <Await
        resolve={data.postResponse}
        errorElement={
          <div className="flex h-screen items-center justify-center text-red-500 font-medium">
            Failed to load listing. Please try again.
          </div>
        }
      >
        {(response) => <PostDetailContent post={response.data} />}
      </Await>
    </Suspense>
  );
}

export default PostDetailView;