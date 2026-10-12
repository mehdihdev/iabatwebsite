import type { NextRequest } from "next/server";

// Turns "Locate me" coordinates into a readable place name via OpenStreetMap Nominatim.
// Coordinates are rounded to 2 decimals (~1 km) before leaving our server, which is
// plenty for a city name and keeps the visitor's exact position private.
export async function GET(req: NextRequest) {
  const lat = Number(req.nextUrl.searchParams.get("lat"));
  const lng = Number(req.nextUrl.searchParams.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return Response.json({ label: null }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat.toFixed(2)}&lon=${lng.toFixed(2)}&format=jsonv2&zoom=10&accept-language=en`,
      {
        // Nominatim's usage policy requires an identifying User-Agent.
        headers: { "User-Agent": "IABAT website (https://iabat.org; info@iabat.org)" },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return Response.json({ label: null });
    const { address = {} } = await res.json();
    const place = address.city ?? address.town ?? address.village ?? address.municipality ?? address.county;
    if (!place) return Response.json({ label: null });
    // "Cary, NC" for US locations, "City, Country" elsewhere.
    const region =
      address.country_code === "us" && typeof address["ISO3166-2-lvl4"] === "string"
        ? address["ISO3166-2-lvl4"].replace("US-", "")
        : address.country;
    return Response.json({ label: region ? `${place}, ${region}` : place });
  } catch {
    return Response.json({ label: null });
  }
}
