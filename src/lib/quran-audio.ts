// Surah and reciter lists from QuranicAudio.com (https://github.com/quran/audio.quran.com).
// Their API doesn't send CORS headers, so it's fetched on the server and cached for a day;
// the MP3s themselves are streamed straight from download.quranicaudio.com.

const API = "https://quranicaudio.com/api";
export const AUDIO_BASE = "https://download.quranicaudio.com/quran/";

export type Surah = { id: number; name: string; english: string; arabic: string };
export type Reciter = { id: number; name: string; path: string };

type ApiSurah = { id: number; name: { simple: string; english: string; arabic: string } };
type ApiQari = { id: number; name: string; relative_path: string; section_id: number; home: number };

export async function getQuranAudioCatalog(): Promise<{ surahs: Surah[]; reciters: Reciter[] } | null> {
  try {
    const [surahRes, qariRes] = await Promise.all([
      fetch(`${API}/surahs`, { next: { revalidate: 86400 } }),
      fetch(`${API}/qaris`, { next: { revalidate: 86400 } }),
    ]);
    if (!surahRes.ok || !qariRes.ok) return null;
    const surahs: Surah[] = ((await surahRes.json()) as ApiSurah[]).map((s) => ({
      id: s.id,
      name: s.name.simple,
      english: s.name.english,
      arabic: s.name.arabic,
    }));
    // Section 1 is "Recitations" (full Hafs recitations); `home` marks QuranicAudio's featured reciters.
    const reciters: Reciter[] = ((await qariRes.json()) as ApiQari[])
      .filter((q) => q.section_id === 1 && q.home === 1)
      .map((q) => ({ id: q.id, name: q.name, path: q.relative_path }))
      .sort((a, b) => a.name.localeCompare(b.name));
    if (surahs.length !== 114 || reciters.length === 0) return null;
    return { surahs, reciters };
  } catch (e) {
    console.error("Error fetching QuranicAudio catalog:", e);
    return null;
  }
}
