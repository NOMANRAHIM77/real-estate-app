import React, { Suspense, useContext } from "react";
import List from "../components/List";
import Chat from "../components/Chat";
import apiRequest from "../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

return (
  <div className="flex flex-col lg:flex-row h-full gap-0">

    {/* LEFT SIDE */}
    <div className="flex-[3] overflow-y-auto pb-16 pr-0 lg:pr-8
      [&::-webkit-scrollbar]:w-1.5
      [&::-webkit-scrollbar-track]:bg-white
      [&::-webkit-scrollbar-thumb]:bg-gray-200
      [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex flex-col gap-8">

        {/* USER INFO CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 flex flex-col gap-5">

            {/* Avatar + Info */}
            <div className="flex items-center gap-5 flex-wrap">
              <div className="relative flex-shrink-0">
                <img
                  src={currentUser?.avatar || "/noavatar.png"}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-gray-200 shadow-sm"
                />
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm" />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p className="text-gray-900 text-xl font-bold truncate">{currentUser?.username}</p>
                <p className="text-gray-400 text-sm break-all">{currentUser?.email}</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-semibold mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Online
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/updateprofile">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#fece51] hover:bg-yellow-400 text-gray-900 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-md hover:scale-105 shadow-sm">
                  ✏️ Edit Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-xl font-semibold text-sm transition-all duration-200 border border-gray-200 hover:border-red-200 hover:scale-105"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* MY LISTINGS */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
              <p className="text-sm text-gray-400 mt-0.5">Properties you've posted</p>
            </div>
            <Link to="/newpost">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#fece51] hover:bg-yellow-400 text-gray-900 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-md hover:scale-105 shadow-sm">
                + New Listing
              </button>
            </Link>
          </div>

          <Suspense fallback={
            <div className="flex items-center gap-3 py-10 text-gray-400 justify-center">
              <div className="w-5 h-5 border-2 border-gray-200 border-t-amber-400 rounded-full animate-spin" />
              <span className="text-sm">Loading listings...</span>
            </div>
          }>
            <Await
              resolve={data.postResponse}
              errorElement={
                <div className="py-4 px-5 bg-red-50 rounded-2xl text-red-500 text-sm border border-red-100">
                  Failed to load listings. Please refresh.
                </div>
              }
            >
              {(response) => {
                const posts = response?.data?.userPosts || response?.data || [];
                return posts.length > 0
                  ? <List post={posts} />
                  : (
                    <div className="py-14 flex flex-col items-center justify-center text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <div className="text-5xl mb-3">🏠</div>
                      <p className="text-gray-700 font-semibold">No listings yet</p>
                      <p className="text-gray-400 text-sm mt-1">Create your first property listing</p>
                    </div>
                  );
              }}
            </Await>
          </Suspense>
        </div>

        {/* SAVED LISTINGS */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Saved Places</h2>
            <p className="text-sm text-gray-400 mt-0.5">Properties you've bookmarked</p>
          </div>

          <Suspense fallback={
            <div className="flex items-center gap-3 py-10 text-gray-400 justify-center">
              <div className="w-5 h-5 border-2 border-gray-200 border-t-amber-400 rounded-full animate-spin" />
              <span className="text-sm">Loading saved places...</span>
            </div>
          }>
            <Await
              resolve={data.postResponse}
              errorElement={
                <div className="py-4 px-5 bg-red-50 rounded-2xl text-red-500 text-sm border border-red-100">
                  Failed to load saved places. Please refresh.
                </div>
              }
            >
              {(response) => {
                const saved = response?.data?.savedPosts || [];
                return saved.length > 0
                  ? <List post={saved} />
                  : (
                    <div className="py-14 flex flex-col items-center justify-center text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <div className="text-5xl mb-3">🔖</div>
                      <p className="text-gray-700 font-semibold">No saved places</p>
                      <p className="text-gray-400 text-sm mt-1">Browse listings and save your favorites</p>
                    </div>
                  );
              }}
            </Await>
          </Suspense>
        </div>

      </div>
    </div>

    {/* RIGHT SIDE — CHAT PANEL */}
    <div className="flex-[2] lg:sticky lg:top-0 lg:h-screen bg-white border-l border-gray-200 shadow-sm flex flex-col">
      <div className="px-5 pt-6 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        <p className="text-sm text-gray-400 mt-0.5">Your conversations</p>
      </div>
      <div className="flex-1 overflow-hidden px-4 py-4">
        <Suspense fallback={
          <div className="flex items-center gap-3 py-8 text-gray-400 justify-center">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-amber-400 rounded-full animate-spin" />
            <span className="text-sm">Loading chats...</span>
          </div>
        }>
          <Await
            resolve={data.chatResponse}
            errorElement={
              <div className="py-4 px-5 bg-red-50 rounded-2xl text-red-500 text-sm border border-red-100">
                Failed to load chats. Please refresh.
              </div>
            }
          >
            {(response) => <Chat chats={response?.data || []} />}
          </Await>
        </Suspense>
      </div>
    </div>

  </div>
);
};

export default Profile;