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
  <div className="h-screen overflow-hidden bg-[#f8fafc]">
    <div className="h-full grid grid-cols-1 xl:grid-cols-[1.4fr_420px]">

      {/* LEFT SIDE */}
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">

        <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-5">

          {/* HERO */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">

            {/* IMAGE */}
            <div className="relative h-[340px] md:h-[420px] bg-gray-100">
              <Slider images={post.images || ["/no-image.png"]} />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

              {/* BADGES */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-gray-800">
                  {post.type}
                </span>

                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white">
                  {post.property}
                </span>
              </div>

              {/* PRICE */}
              <div className="absolute bottom-5 left-5 z-10">
                <div className="bg-white/95 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl">
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Price
                  </p>
                  <h2 className="text-2xl font-black text-gray-900">
                    $ {post.price?.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="p-5 lg:p-6 mt-30">

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                {/* LEFT */}
                <div className="flex-1 min-w-0">

                  <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-2 mt-3 text-gray-500">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <img
                        src="/pin.png"
                        alt=""
                        className="w-4 h-4 opacity-60"
                      />
                    </div>

                    <p className="truncate text-sm lg:text-base">
                      {post.address}
                    </p>
                  </div>

                  {/* STATS */}
                  <div className="flex flex-wrap gap-3 mt-5">

                    {[
                      {
                        icon: "/bed.png",
                        value: post.bedroom,
                        label: "Beds",
                      },
                      {
                        icon: "/bath.png",
                        value: post.bathroom,
                        label: "Baths",
                      },
                      {
                        icon: "/size.png",
                        value: post.postDetail?.size || 0,
                        label: "Sqft",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 bg-[#f8fafc] border border-gray-200 px-4 py-3 rounded-2xl"
                      >
                        <img
                          src={item.icon}
                          alt=""
                          className="w-4 h-4 opacity-60"
                        />

                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-none">
                            {item.value}
                          </p>

                          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mt-1">
                            {item.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* USER CARD */}
                <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-4 flex items-center gap-4 min-w-[260px]">

                  <img
                    src={post.user?.avatar || "/noavatar.jpg"}
                    alt=""
                    className="w-14 h-14 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {post.user?.username || "Agent"}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Property Owner
                    </p>
                  </div>

                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-6 pt-6 border-t border-gray-100">

                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
                  Overview
                </h3>

                <div
                  className="text-sm leading-7 text-gray-600 max-w-none
                  [&_p]:mb-3
                  [&_strong]:text-gray-900
                  [&_h1]:text-gray-900
                  [&_h2]:text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      post.postDetail?.desc ||
                        "No description available."
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden xl:flex flex-col h-screen border-l border-gray-200 bg-white">

        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-gray-200">

          {/* QUICK INFO */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-5">

            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-5">
              Quick Info
            </h3>

            <div className="space-y-4">

              {[
                {
                  icon: "/utility.png",
                  title: "Utilities",
                  value:
                    post.postDetail?.utilities === "owner"
                      ? "Owner Pays"
                      : "Tenant Pays",
                },
                {
                  icon: "/pet.png",
                  title: "Pet Policy",
                  value:
                    post.postDetail?.pet === "allowed"
                      ? "Pets Allowed"
                      : "No Pets",
                },
                {
                  icon: "/fee.png",
                  title: "Income",
                  value:
                    post.postDetail?.income || "No Requirements",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-4 h-4 opacity-70"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                      {item.title}
                    </p>

                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEARBY */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-5">

            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-5">
              Nearby
            </h3>

            <div className="space-y-3">

              {[
                {
                  icon: "/school.png",
                  label: "School",
                  value:
                    post.postDetail?.school > 999
                      ? post.postDetail.school / 1000 + " km"
                      : (post.postDetail?.school || 0) + " m",
                },
                {
                  icon: "/pet.png",
                  label: "Bus Stop",
                  value: (post.postDetail?.bus || 0) + " m",
                },
                {
                  icon: "/fee.png",
                  label: "Restaurant",
                  value:
                    (post.postDetail?.restaurant || 0) + " m",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-4 h-4 opacity-60"
                    />

                    <span className="font-semibold text-sm text-gray-800">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-gray-400">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-4">

            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
              Location
            </h3>

            <div className="h-[220px] overflow-hidden rounded-2xl border border-gray-200">
              <Map items={[post]} />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="p-5 border-t border-gray-200 bg-white">

          <div className="flex gap-3">

            <button
              onClick={handleCreateChat}
              className="flex-1 h-14 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-black transition-all duration-200 flex items-center justify-center gap-2"
            >
              <img
                src="/chat.png"
                alt=""
                className="w-4 h-4 brightness-0 invert"
              />
              Message
            </button>

            <button
              onClick={handleSave}
              className={`h-14 px-6 rounded-2xl border transition-all duration-200 flex items-center justify-center
                ${
                  saved
                    ? "bg-amber-400 border-amber-400"
                    : "bg-[#f8fafc] border-gray-200 hover:bg-amber-50"
                }`}
            >
              <img
                src="/save.png"
                alt=""
                className={`w-4 h-4 ${
                  saved ? "brightness-0 invert" : "opacity-70"
                }`}
              />
            </button>
          </div>
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