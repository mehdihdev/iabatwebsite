// Locations for prayer-time calculation. Durham (the masjid) is the default and uses the
// exact coordinates from the original site. Other Triangle coordinates are the city
// centers from OpenStreetMap Nominatim, rounded to 4 decimals (~10 m). Greensboro (in the
// Triad, not the Triangle) is included for community members there.

export type PrayerLocation = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  // IANA timezone; null until known for a geolocated position.
  tz: string | null;
};

const NC_TZ = "America/New_York";

export const DURHAM: PrayerLocation = { id: "durham", label: "Durham, NC", lat: 35.994, lng: -78.8986, tz: NC_TZ };

export const TRIANGLE_LOCATIONS: PrayerLocation[] = [
  DURHAM,
  { id: "raleigh", label: "Raleigh, NC", lat: 35.7804, lng: -78.6391, tz: NC_TZ },
  { id: "cary", label: "Cary, NC", lat: 35.7874, lng: -78.7812, tz: NC_TZ },
  { id: "chapel-hill", label: "Chapel Hill, NC", lat: 35.9132, lng: -79.0558, tz: NC_TZ },
  { id: "morrisville", label: "Morrisville, NC", lat: 35.8243, lng: -78.83, tz: NC_TZ },
  { id: "apex", label: "Apex, NC", lat: 35.7325, lng: -78.8506, tz: NC_TZ },
  { id: "carrboro", label: "Carrboro, NC", lat: 35.91, lng: -79.0753, tz: NC_TZ },
  { id: "hillsborough", label: "Hillsborough, NC", lat: 36.0754, lng: -79.0994, tz: NC_TZ },
  { id: "wake-forest", label: "Wake Forest, NC", lat: 35.9776, lng: -78.5098, tz: NC_TZ },
  { id: "garner", label: "Garner, NC", lat: 35.7113, lng: -78.6142, tz: NC_TZ },
  { id: "holly-springs", label: "Holly Springs, NC", lat: 35.6513, lng: -78.8336, tz: NC_TZ },
  { id: "fuquay-varina", label: "Fuquay-Varina, NC", lat: 35.5844, lng: -78.7999, tz: NC_TZ },
  { id: "knightdale", label: "Knightdale, NC", lat: 35.7879, lng: -78.4823, tz: NC_TZ },
  { id: "pittsboro", label: "Pittsboro, NC", lat: 35.7201, lng: -79.1772, tz: NC_TZ },
  { id: "greensboro", label: "Greensboro, NC", lat: 36.0726, lng: -79.792, tz: NC_TZ },
];
