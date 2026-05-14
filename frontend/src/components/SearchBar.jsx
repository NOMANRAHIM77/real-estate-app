import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col">
      {/* TYPE SWITCHER */}
      <div className="flex">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`px-8 py-4 border border-b-0 border-gray-400 cursor-pointer capitalize transition-all first:rounded-tl-md last:rounded-tr-md ${
              query.type === type 
                ? "bg-black text-white" 
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* SEARCH FORM */}
      <form className="flex flex-col md:flex-row border border-gray-400 justify-between gap-0 h-auto md:h-16">
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="p-4 md:p-2 border-b md:border-b-0 md:border-r border-gray-400 w-full md:w-52 outline-none"
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
          className="p-4 md:p-2 border-b md:border-b-0 md:border-r border-gray-400 w-full md:w-52 outline-none"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
          className="p-4 md:p-2 border-b md:border-b-0 md:border-r border-gray-400 w-full md:w-52 outline-none"
        />
        
        <Link
          className="flex-1 bg-[#fece51] flex items-center justify-center cursor-pointer hover:bg-[#e6b947] transition-colors p-4 md:p-0"
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button type="button" className="w-full h-full flex items-center justify-center">
            <img src="/search.png" alt="Search" className="w-6 h-6" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;