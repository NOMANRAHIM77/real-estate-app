import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="flex h-full w-full">
      {/* LIST CONTAINER */}
      <div className="flex-[3] h-full">
        <div className="h-full pr-4 md:pr-[50px] flex flex-col gap-[50px] overflow-y-auto pb-[50px]">
          <Filter />
          
          <Suspense fallback={<p className="animate-pulse text-gray-500">Loading listings...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p className="text-red-500">Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>

      {/* MAP CONTAINER */}
      <div className="hidden md:block flex-[2] h-full bg-[#fcf5f3]">
        <Suspense fallback={<p className="p-5 text-gray-500">Loading map...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p className="p-5 text-red-500">Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;