import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <div className="flex gap-5 p-4 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
      
      {/* IMAGE CONTAINER */}
      <Link 
        to={`/${item.id}`} 
        className="hidden md:block flex-[2] h-[200px] min-w-[200px] overflow-hidden rounded-lg"
      >
        <img 
          src={item.images?.[0] || "/no-image.png"} 
          alt={item.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* TEXT CONTAINER */}
      <div className="flex-[3] flex flex-col justify-between gap-2.5">
        
        {/* TOP META CONTENT */}
        <div className="flex flex-col gap-2">
          {/* TITLE */}
          <h2 className="text-xl font-semibold text-gray-800 transition-colors duration-200 hover:text-teal-600">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h2>

          {/* ADDRESS */}
          <p className="text-sm flex items-center gap-1 text-gray-500">
            <img src="/pin.png" alt="Location Pin" className="w-4 h-4" />
            <span>{item.address}</span>
          </p>

          {/* PRICE */}
          <p className="text-lg font-medium p-1 px-2.5 rounded-md bg-amber-100 text-amber-800 w-max text-sm">
            $ {item.price}
          </p>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-wrap justify-between items-center gap-3 mt-2">
          {/* FEATURES */}
          <div className="flex gap-4 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <img src="/bed.png" alt="Bedrooms" className="w-4 h-4" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <img src="/bath.png" alt="Bathrooms" className="w-4 h-4" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>

          {/* ICONS */}
          <div className="flex gap-3">
            <div className="border border-gray-300 p-1.5 rounded-md cursor-pointer flex items-center justify-center bg-white hover:bg-gray-50 transition-colors">
              <img src="/save.png" alt="Save Listing" className="w-4 h-4" />
            </div>
            <div className="border border-gray-300 p-1.5 rounded-md cursor-pointer flex items-center justify-center bg-white hover:bg-gray-50 transition-colors">
              <img src="/chat.png" alt="Open Chat" className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Card;
