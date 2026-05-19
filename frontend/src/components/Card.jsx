import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex flex-col lg:flex-row">

        {/* IMAGE */}
        <Link
          to={`/${item.id}`}
          className="relative lg:w-[320px] w-full h-[240px] lg:h-auto overflow-hidden bg-gray-100"
        >
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

          {/* Type Badge */}
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-teal-700 shadow-sm">
            {item.type}
          </span>
        </Link>

        {/* CONTENT */}
        <div className="flex flex-col justify-between flex-1 p-6">

          <div className="space-y-4">

            {/* TITLE */}
            <div className="flex items-start justify-between gap-4">
              <Link to={`/${item.id}`} className="min-w-0">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight line-clamp-2 hover:text-teal-600 transition-colors duration-200">
                  {item.title}
                </h2>
              </Link>

              {/* PRICE */}
              <div className="flex-shrink-0">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold px-4 py-2 rounded-2xl shadow-md text-sm">
                  $ {item.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <img
                  src="/pin.png"
                  alt=""
                  className="w-4 h-4 opacity-60"
                />
              </div>

              <p className="text-sm md:text-base truncate">
                {item.address}
              </p>
            </div>

            {/* DESCRIPTION (Optional if available) */}
            {item.desc && (
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {item.desc}
              </p>
            )}
          </div>

          {/* BOTTOM */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-gray-100">

            {/* SPECS */}
            <div className="flex items-center gap-3 flex-wrap">

              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-200 hover:border-teal-200 hover:bg-teal-50 transition-all duration-200">
                <img
                  src="/bed.png"
                  alt=""
                  className="w-4 h-4 opacity-70"
                />
                <span className="text-sm font-semibold text-gray-700">
                  {item.bedroom} Bedrooms
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-200 hover:border-teal-200 hover:bg-teal-50 transition-all duration-200">
                <img
                  src="/bath.png"
                  alt=""
                  className="w-4 h-4 opacity-70"
                />
                <span className="text-sm font-semibold text-gray-700">
                  {item.bathroom} Bathrooms
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">

              <button className="w-11 h-11 rounded-2xl border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 flex items-center justify-center shadow-sm">
                <img
                  src="/save.png"
                  alt="Save"
                  className="w-4 h-4 opacity-70"
                />
              </button>

              <button className="w-11 h-11 rounded-2xl border border-gray-200 bg-white hover:bg-teal-50 hover:border-teal-300 transition-all duration-200 flex items-center justify-center shadow-sm">
                <img
                  src="/chat.png"
                  alt="Chat"
                  className="w-4 h-4 opacity-70"
                />
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;