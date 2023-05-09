import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

/**
 * Pics
 */
const iconCenter = {
  lat: 43.51209,
  lng: 16.469075,
};

const mapCenter = {
  lat: 43.51193,
  lng: 16.46914,
};

const iconMarker = icon({
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png ",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const Map = () => {
  return (
    <>
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={20}
        scrollWheelZoom={false}
        className="h-80 mt-10 max-w-2xl mx-3 sm:m-auto sm:mt-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={iconCenter} icon={iconMarker} />
      </MapContainer>
    </>
  );
};

export default Map;
