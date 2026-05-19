import { useState } from "react";
import { useNavigate } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // 🛠️ FIX: Dynamic URL generation builds query parameters ONLY if they contain actual data values
    const params = new URLSearchParams();
    if (query.type) params.append("type", query.type);
    if (query.city.trim()) params.append("city", query.city.trim());
    if (query.minPrice) params.append("minPrice", query.minPrice);
    if (query.maxPrice) params.append("maxPrice", query.maxPrice);

    navigate(`/list?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      
      <div className="flex">
        {types.map((type) => (
          <button
            key={type}
            type="button"
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

      
      <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row border border-gray-400 justify-between gap-0 h-auto md:h-16">
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
          placeholder="Min Price"
          onChange={handleChange}
          className="p-4 md:p-2 border-b md:border-b-0 md:border-r border-gray-400 w-full md:w-52 outline-none"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          placeholder="Max Price"
          onChange={handleChange}
          className="p-4 md:p-2 border-b md:border-b-0 md:border-r border-gray-400 w-full md:w-52 outline-none"
        />
        
        <button type="submit" className="flex-1 bg-[#fece51] flex items-center justify-center cursor-pointer hover:bg-[#e6b947] transition-colors p-4 md:p-0">
          <img src="/search.png" alt="Search" className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;