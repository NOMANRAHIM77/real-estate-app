import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

function Map({ items = [] }) {

  // Filter only valid coordinates
  const validItems = items.filter(
    (item) =>
      item?.latitude &&
      item?.longitude &&
      !isNaN(parseFloat(item.latitude)) &&
      !isNaN(parseFloat(item.longitude))
  );

  // Default fallback center
  const defaultCenter = [52.4797, -1.90269];

  // Dynamic center
  const center =
    validItems.length === 1
      ? [
          parseFloat(validItems[0].latitude),
          parseFloat(validItems[0].longitude),
        ]
      : defaultCenter;

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full h-full rounded-[20px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validItems.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;