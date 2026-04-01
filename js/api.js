const ITUNES_BASE_URL = 'https://itunes.apple.com/search';


export async function searchTracks(query, limit = 100) {
  if (!query || !query.trim()) return [];
  const params = new URLSearchParams({
    term:   query.trim(),
    entity: 'song',
    limit:  String(limit),
  });

  const url = `${ITUNES_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`iTunes API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data.results) ? data.results : [];

  } catch (err) {
    console.error('[api.js] searchTracks failed:', err);
    return [];
  }
}

export function formatDuration(ms) {
  if (!ms || typeof ms !== 'number') return '—';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function getHighResArtwork(url, size = 600) {
  if (!url) return '';
  return url.replace(/\d+x\d+bb/, `${size}x${size}bb`);
}