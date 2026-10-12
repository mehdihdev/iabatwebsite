import { getLiveStatus } from "@/lib/youtube";

// Polled by the LiveBanner component. Cached for 60s so YouTube is hit at most once a minute.
export const revalidate = 60;

export async function GET() {
  return Response.json(await getLiveStatus());
}
