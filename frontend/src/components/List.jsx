import React from "react";
import Card from "./Card";

const List = ({ post }) => {
  const safePosts = Array.isArray(post) ? post : [];

  return (
    <div className="flex flex-col gap-[50px]">
      {safePosts.length > 0 ? (
        safePosts.map((item) => (
          <Card key={item.id} item={item} />
        ))
      ) : (
        <p className="text-gray-400">No posts found</p>
      )}
    </div>
  );
};

export default List;