import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <div className="flex gap-5">
      {/* IMAGE CONTAINER */}
      <Link 
        to={`/${item.id}`} 
        className="hidden md:block flex-[2] h-[200px]"
      >
        <img 
          src={item.images[0]} 
          alt={item.title} 
          className="w-full h-full object-cover rounded-lg"
        />
      </Link>

      {/* TEXT CONTAINER */}
      <div className="flex-[3] flex flex-col justify-between gap-2.5">
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-[#444] transition-all duration-400 ease-in-out hover:text-black hover:scale-[1.01]">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>

        {/* ADDRESS */}
        <p className="text-sm flex items-center gap-1 text-[#888]">
          <img src="/pin.png" alt="" className="w-4 h-4" />
          <span>{item.address}</span>
        </p>

        {/* PRICE */}
        <p className="text-xl font-light p-1 rounded-md bg-[#fece5170] w-max">
          $ {item.price}
        </p>

        {/* BOTTOM SECTION */}
        <div className="flex justify-between gap-2.5">
          {/* FEATURES */}
          <div className="flex gap-5 text-sm">
            <div className="flex items-center gap-1 bg-whitesmoke p-1 rounded-md">
              <img src="/bed.png" alt="" className="w-4 h-4" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="flex items-center gap-1 bg-whitesmoke p-1 rounded-md">
              <img src="/bath.png" alt="" className="w-4 h-4" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>

          {/* ICONS */}
          <div className="flex gap-5">
            <div className="border border-[#999] px-1 py-0.5 rounded-md cursor-pointer flex items-center justify-center hover:bg-lightgray">
              <img src="/save.png" alt="" className="w-4 h-4" />
            </div>
            <div className="border border-[#999] px-1 py-0.5 rounded-md cursor-pointer flex items-center justify-center hover:bg-lightgray">
              <img src="/chat.png" alt="" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;