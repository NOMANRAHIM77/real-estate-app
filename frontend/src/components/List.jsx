import React from "react";
import Card from "./Card";

const List = ({ post }) => {
  const safePosts = Array.isArray(post) ? post : [];

 return (
    <div className="flex flex-col gap-4">
      {safePosts.length > 0 ? (
        safePosts.map((item) => <Card key={item.id} item={item} />)
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-3">🏘️</div>
          <p className="text-gray-500 font-semibold">No properties found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );

};

export default List;




  