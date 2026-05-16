import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        {/* .popupContainer */}
        <div className="flex gap-5 min-w-[200px]">
          
          <img 
            src={item.images?.[0] || "/no-image.png"} 
            alt={item.title} 
            className="w-16 h-12 object-cover rounded-[5px]"
          />
          
          {/* .textContainer */}
          <div className="flex flex-col justify-between gap-1">
            <Link 
              to={`/${item.id}`} 
              className="font-bold text-gray-900 hover:underline text-sm leading-tight"
            >
              {item.title}
            </Link>
            <span className="text-xs text-gray-500">
              {item.bedroom} bedroom
            </span>
            <b className="text-sm text-gray-900 font-semibold">
              $ {item.price}
            </b>
          </div>

        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;