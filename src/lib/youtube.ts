import { YOUTUBE_CHANNEL_ID } from "@/lib/site";

export type Lecture = { id: string; title: string; published: string; url: string; thumbnail: string };

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

function decodeXml(s: string) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

// Latest uploads from the IABAT YouTube channel's public RSS feed (refreshed hourly).
// Returns an empty list if YouTube can't be reached, so the page still renders.
export async function getLatestLectures(limit = 3): Promise<Lecture[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return xml
      .split("<entry>")
      .slice(1)
      .map((entry) => {
        const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
        const title = decodeXml(entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
        const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
        return {
          id,
          title,
          published,
          url: `https://www.youtube.com/watch?v=${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      })
      .filter((l) => l.id && l.title)
      .slice(0, limit);
  } catch (e) {
    console.error("Error fetching YouTube feed:", e);
    return [];
  }
}

export type LiveStatus = { live: false } | { live: true; videoId: string; title: string; url: string };

// YouTube has no key-less API for "is this channel live?", so this reads the channel's
// public /live page: when a stream is on air it resolves to that video, whose
// videoDetails carry "isLive":true. Anything unexpected is treated as not live.
export async function getLiveStatus(): Promise<LiveStatus> {
  try {
    const res = await fetch(`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}/live`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return { live: false };
    const html = await res.text();

    const start = html.indexOf('"videoDetails":{');
    if (start === -1) return { live: false };
    const details = html.slice(start, start + 8000);
    const match = details.match(/^"videoDetails":\{"videoId":"([\w-]{11})","title":"((?:[^"\\]|\\.)*)"/);
    if (
      !match ||
      !details.includes(`"channelId":"${YOUTUBE_CHANNEL_ID}"`) ||
      !details.includes('"isLive":true') ||
      details.includes('"isUpcoming":true')
    ) {
      return { live: false };
    }
    const [, videoId, rawTitle] = match;
    return {
      live: true,
      videoId,
      title: JSON.parse(`"${rawTitle}"`),
      url: `https://www.youtube.com/watch?v=${videoId}`,
    };
  } catch (e) {
    console.error("Error checking YouTube live status:", e);
    return { live: false };
  }
}
