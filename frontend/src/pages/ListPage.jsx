import React, { Suspense } from "react";
import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";
import { useLoaderData, Await } from "react-router-dom"; 

const ListPage = () => {
  const data = useLoaderData(); 

  return (
    <div className="flex h-full">

      {/* LEFT */}
      <div className="flex-[3] h-full overflow-y-auto">
        <div className="flex flex-col gap-12 pr-2 pb-10">
          <Filter />

          <Suspense fallback={<p>Loading posts...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p className="text-red-500">Error loading posts!</p>}
            >
              {(response) => {
  const posts = response.data;

  return posts?.length > 0 ? (
    posts.map((item) => <Card key={item.id} item={item} />)
  ) : (
    <p className="text-gray-500">No posts found</p>
  );
}
              }
            </Await>
          </Suspense>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex flex-[2] bg-[#fcf5f3] items-center justify-center">
        <Suspense fallback={null}>
          <Await resolve={data.postResponse}>
            {(response) => <Map items={response.data} />}
          </Await>
        </Suspense>
      </div>

    </div>
  );
};

export default ListPage;