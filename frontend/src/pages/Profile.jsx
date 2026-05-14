import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      {/* DETAILS SECTION */}
      <div className="flex-[3] overflow-y-auto pb-12 md:pb-0 h-full">
        <div className="px-4 md:pr-12 flex flex-col gap-12">
          
          {/* USER INFO TITLE */}
          <div className="flex items-center justify-between mt-8">
            <h1 className="text-3xl font-light">User Information</h1>
            <Link to="/profile/update">
              <button className="px-6 py-3 bg-[#fece51] cursor-pointer hover:bg-[#e6b947] transition-colors rounded-md">
                Update Profile
              </button>
            </Link>
          </div>

          {/* INFO CONTENT */}
          <div className="flex flex-col gap-5">
            <span className="flex items-center gap-5">
              Avatar:
              <img 
                src={currentUser.avatar || "/noavatar.jpg"} 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
            </span>
            <span className="flex items-center gap-5">
              Username: <b className="font-semibold">{currentUser.username}</b>
            </span>
            <span className="flex items-center gap-5">
              E-mail: <b className="font-semibold">{currentUser.email}</b>
            </span>
            <button 
              onClick={handleLogout}
              className="w-max bg-teal-600 text-white px-5 py-2.5 rounded-md cursor-pointer hover:bg-teal-700 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* MY LIST SECTION */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-light">My List</h1>
            <Link to="/add">
              <button className="px-6 py-3 bg-[#fece51] cursor-pointer hover:bg-[#e6b947] transition-colors rounded-md">
                Create New Post
              </button>
            </Link>
          </div>
          
          <Suspense fallback={<p className="animate-pulse">Loading posts...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p className="text-red-500">Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          {/* SAVED LIST SECTION */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-light">Saved List</h1>
          </div>
          
          <Suspense fallback={<p className="animate-pulse">Loading saved posts...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p className="text-red-500">Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>

      {/* CHAT SECTION */}
      <div className="flex-[2] bg-[#fcf5f3] h-full md:h-full">
        <div className="px-5 h-full">
          <Suspense fallback={<p className="p-5">Loading chats...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p className="p-5 text-red-500">Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data}/>}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;