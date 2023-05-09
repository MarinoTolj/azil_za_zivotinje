import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";

/**
 * Pics
 */
const center = {
  lat: 43.51193,
  lng: 16.46914,
};

const Map = () => {
  return (
    <>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={20}
        scrollWheelZoom={false}
        className="h-80 mt-10 max-w-2xl mx-3 sm:m-auto sm:mt-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} />
      </MapContainer>
    </>
  );
};

export default Map;
