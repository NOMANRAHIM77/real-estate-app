import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  // Reusable styling class bundle for the inputs and selects
  const inputStyle = "w-full md:w-[100px] p-2.5 border border-[#e0e0e0] rounded-[5px] text-sm outline-none";

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <h1 className="font-light text-2xl">
        Search results for <b className="font-semibold">{searchParams.get("city")}</b>
      </h1>

      {/* TOP SECTION */}
      <div className="w-full">
        <div className="flex flex-col gap-[2px]">
          <label htmlFor="city" className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
            className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-sm outline-none"
          />
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-[2px] flex-1 min-w-[120px] md:flex-none">
          <label htmlFor="type" className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
            className={inputStyle}
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="flex flex-col gap-[2px] flex-1 min-w-[120px] md:flex-none">
          <label htmlFor="property" className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
            className={inputStyle}
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="flex flex-col gap-[2px] flex-1 min-w-[120px] md:flex-none">
          <label htmlFor="minPrice" className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
            className={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-[2px] flex-1 min-w-[120px] md:flex-none">
          <label htmlFor="maxPrice" className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
            className={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-[2px] flex-1 min-w-[120px] md:flex-none">
          <label htmlFor="bedroom" className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
            className={inputStyle}
          />
        </div>

        {/* SEARCH BUTTON */}
        <button 
          onClick={handleFilter} 
          className="w-full md:w-[100px] h-[42px] flex items-center justify-center border-none cursor-pointer bg-[#fece51] hover:bg-[#e4b844] transition-colors rounded-[5px]"
        >
          <img src="/search.png" alt="search" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Filter;