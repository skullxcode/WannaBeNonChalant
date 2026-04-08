import { searchTracks } from './api.js';
import { setupAudio, loadAndPlaySong, getCurrentSongInfo, watchTrackChanges } from './audioController.js';
import { renderTracks, updatePlayingNode, syncHeartIcon, renderFavorites, showModal, hideModal, updateBadge, showWelcome } from './uiRenderer.js';
import { toggleLike, getLikedTracks, unlikeTrack } from './storage.js';

const searchInputBox = document.getElementById('searchInput');
const sortDropdown = document.getElementById('sortByItems');
const filterExplicitBtn = document.getElementById('explicitToggleBtn');
const favBtn = document.getElementById('likesBtn');
const closeBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('likesModal');

let allLoadedTracks = [];
let currentSearchTerm = '';
let hideEData = false;
let sortMethod = 'default';
let searchTimeout;

function bootUp() {
    setupAudio();
    
    watchTrackChanges((oldTrack, newTrack) => {
        let pId = oldTrack ? oldTrack.trackId : null;
        let nId = newTrack ? newTrack.trackId : null;
        updatePlayingNode(pId, nId);
    });

    updateBadge(getLikedTracks().length);

    searchInputBox.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        let txt = searchInputBox.value.trim();
        
        if(txt === '') {
            allLoadedTracks = [];
            currentSearchTerm = '';
            showWelcome();
            updateUrlParam('');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            fetchMusic(txt);
        }, 450);
    });

    sortDropdown.addEventListener('change', () => {
        sortMethod = sortDropdown.value;
        refreshView();
    });

    filterExplicitBtn.addEventListener('click', () => {
        hideEData = !hideEData;
        filterExplicitBtn.dataset.active = hideEData ? 'true' : 'false';
        
        if(hideEData) {
            filterExplicitBtn.style.color = '#90caf9';
            filterExplicitBtn.style.borderColor = '#90caf9';
        } else {
            filterExplicitBtn.style.color = 'white';
            filterExplicitBtn.style.borderColor = '#444';
        }
        
        refreshView();
    });

    favBtn.addEventListener('click', () => {
        let savedArr = getLikedTracks();
        renderFavorites(savedArr, {
            onPlay: (t) => { 
                loadAndPlaySong(t); 
                hideModal(); 
            },
            onRemove: (tid) => {
                unlikeTrack(tid);
                syncHeartIcon(tid, false);
                updateBadge(getLikedTracks().length);
            }
        });
        showModal();
    });

    closeBtn.addEventListener('click', hideModal);
    
    modalOverlay.addEventListener('click', (ev) => {
        if(ev.target === modalOverlay) hideModal();
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && !modalOverlay.hidden) hideModal();
    });

    checkUrlForSearch();
}

async function fetchMusic(q) {
    currentSearchTerm = q;
    let l = document.getElementById('searchLoadingData');
    if(l) l.style.display = 'block';
    
    updateUrlParam(q);
    
    let res = await searchTracks(q);
    allLoadedTracks = res;
    
    if(l) l.style.display = 'none';
    refreshView();
}

function refreshView() {
    if(allLoadedTracks.length === 0 && currentSearchTerm === '') return;
    
    let readyTracks = allLoadedTracks;
    
    if(hideEData) {
        readyTracks = allLoadedTracks.filter(x => x.trackExplicitness !== 'explicit');
    }
    
    readyTracks = applySortLogic(readyTracks, sortMethod);
    
    let activeS = getCurrentSongInfo();
    renderTracks(readyTracks, currentSearchTerm, {
        onPlay: (trk) => {
            if(!trk.previewUrl) {
                return;
            }
            loadAndPlaySong(trk);
        },
        onLike: (trk) => {
            let res = toggleLike(trk);
            syncHeartIcon(trk.trackId, res.liked);
            updateBadge(res.count);
        }
    }, activeS ? activeS.trackId : null);
}

const applySortLogic = (list, meth) => {
    let cloned = [...list];
    
    if(meth === 'duration') {
        return cloned.sort((valA, valB) => (valA.trackTimeMillis||0) - (valB.trackTimeMillis||0));
    } else if (meth === 'release') {
        return cloned.sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (meth === 'alpha') {
        return cloned.sort((a,b) => (a.trackName||'').localeCompare(b.trackName||''));
    }
    
    return cloned;
};

const updateUrlParam = (termVal) => {
    let ref = new URL(window.location.href);
    if(termVal) {
        ref.searchParams.set('q', termVal);
    } else {
        ref.searchParams.delete('q');
    }
    window.history.pushState({ query: termVal }, '', ref.toString());
};

function checkUrlForSearch() {
    let qs = new URLSearchParams(window.location.search).get('q');
    if(qs && qs.trim() !== '') {
        searchInputBox.value = qs.trim();
        fetchMusic(qs.trim());
    }
}

window.addEventListener('popstate', (e) => {
    let queryFallback = e.state?.query || new URLSearchParams(window.location.search).get('q') || '';
    searchInputBox.value = queryFallback;
    
    if(queryFallback !== '') {
        fetchMusic(queryFallback);
    } else {
        allLoadedTracks = [];
        currentSearchTerm = '';
        showWelcome();
    }
});

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootUp);
} else {
    bootUp();
}