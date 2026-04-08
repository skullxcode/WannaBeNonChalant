const LIKES_KEY = 'wbnc_liked_tracks';

export const getLikedTracks = () => {
    try {
        let storedInfo = localStorage.getItem(LIKES_KEY);
        if (storedInfo) {
            return JSON.parse(storedInfo);
        }
        return [];
    } catch(err) {
        return [];
    }
};

export const isTrackLiked = (id) => {
    let saved = getLikedTracks();
    for (let track of saved) {
        if (track.trackId === id) return true;
    }
    return false;
};

export function likeTrack(t) {
    let currentFavorites = getLikedTracks();
    let isDuplicate = false;
    for(let i=0; i<currentFavorites.length; i++) {
        if(currentFavorites[i].trackId === t.trackId) {
            isDuplicate = true;
            break;
        }
    }
    
    if(isDuplicate) return false;
    
    currentFavorites.push(t);
    saveList(currentFavorites);
    return true;
}

export function unlikeTrack(id) {
    let currentFavorites = getLikedTracks();
    let indexFound = currentFavorites.findIndex(item => item.trackId === id);
    
    if (indexFound > -1) {
        currentFavorites.splice(indexFound, 1);
        saveList(currentFavorites);
        return true;
    }
    
    return false;
}

export const toggleLike = (trackData) => {
    let currentlyLiked = isTrackLiked(trackData.trackId);
    
    if (currentlyLiked) {
        unlikeTrack(trackData.trackId);
    } else {
        likeTrack(trackData);
    }
    
    return {
        liked: !currentlyLiked,
        count: getLikedTracks().length
    };
};

export const clearAllLiked = () => {
    localStorage.removeItem(LIKES_KEY);
};

function saveList(dataArray) {
    try {
        localStorage.setItem(LIKES_KEY, JSON.stringify(dataArray));
    } catch(err) {}
}