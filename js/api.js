const ITUNES_API_URL = 'https://itunes.apple.com/search';

export const searchTracks = async (queryText, maxItems = 100) => {
    if (!queryText || queryText.trim() === '') {
        return [];
    }

    let params = new URLSearchParams({
        term: queryText.trim(),
        entity: 'song',
        limit: maxItems.toString(),
    });

    try {
        let reqUrl = ITUNES_API_URL + '?' + params.toString();
        const resp = await fetch(reqUrl);

        if (!resp.ok) {
            throw new Error("iTunes API failed with status: " + resp.status);
        }

        const json = await resp.json();
        
        if (json.results && Array.isArray(json.results)) {
            return json.results;
        }
        return [];
    } catch (err) {
        return [];
    }
};

export function formatDuration(ms) {
    if (typeof ms !== 'number' || !ms) {
        return '--:--';
    }
    let totalSecs = Math.floor(ms / 1000);
    let mins = Math.floor(totalSecs / 60);
    let secs = totalSecs % 60;
    
    if (secs < 10) secs = "0" + secs;
    return mins + ":" + secs;
}

export function getHighResArtwork(url, size) {
    let imgSize = size ? size : 600;
    if (!url) return '';
    return url.replace(/\d+x\d+bb/, imgSize + 'x' + imgSize + 'bb');
}