import { formatDuration, getHighResArtwork } from './api.js';
import { isTrackLiked } from './storage.js';

const tracksGrid = document.getElementById('trackListings');
const emptyMessage = document.getElementById('noDataFound');
const topResultsBar = document.getElementById('resultsTopBar');
const heroDiv = document.getElementById('emptyHeroDiv');
const countLabel = document.getElementById('trackCountLabel');
const queryLabelTxt = document.getElementById('queryLabel');

export const renderTracks = (dataList, queryText, evts, currentId = null) => {
    heroDiv.hidden = true;
    tracksGrid.innerHTML = '';
    
    if(!dataList || dataList.length === 0) {
        emptyMessage.hidden = false;
        topResultsBar.hidden = true;
        return;
    }
    
    emptyMessage.hidden = true;
    topResultsBar.hidden = false;
    countLabel.innerText = `${dataList.length} tracks`;
    queryLabelTxt.innerText = `found for "${queryText}"`;
    
    let fragmentObj = document.createDocumentFragment();
    
    dataList.forEach(trk => {
        let cardHTML = makeCard(trk, evts, currentId);
        fragmentObj.appendChild(cardHTML);
    });
    
    tracksGrid.appendChild(fragmentObj);
};

export function updatePlayingNode(oldId, newId) {
    if (oldId) {
        let prevCard = tracksGrid.querySelector(`[data-tid="${oldId}"]`);
        if (prevCard) prevCard.classList.remove('playing');
    }
    if (newId) {
        let currCard = tracksGrid.querySelector(`[data-tid="${newId}"]`);
        if (currCard) currCard.classList.add('playing');
    }
}

export function syncHeartIcon(tid, isLi) {
    let btnRef = tracksGrid.querySelector(`button[data-fav-id="${tid}"]`);
    if(btnRef) {
        btnRef.classList.toggle('liked', isLi);
        let svgIcon = btnRef.querySelector('svg');
        if(svgIcon) svgIcon.style.fill = isLi ? 'currentColor' : 'none';
    }
}

const favModal = document.getElementById('likesModal');
const likesWrapper = document.getElementById('likesListWrapper');

export const renderFavorites = (favoritesArr, handlers) => {
    likesWrapper.innerHTML = '';
    if(favoritesArr.length === 0) {
        likesWrapper.innerHTML = `<p style="padding: 20px; color:#aaa; text-align:center;">No likes yet. Add some flavor to your list!</p>`;
        return;
    }
    
    let wrap = document.createDocumentFragment();
    favoritesArr.forEach(trkInfo => {
        let rw = document.createElement('div');
        rw.className = 'favRow';
        
        let artSrc = getHighResArtwork(trkInfo.artworkUrl100, 100);
        let durationStr = formatDuration(trkInfo.trackTimeMillis);
        
        rw.innerHTML = `
            <img class="favArt" src="${artSrc}" />
            <div class="favRowInfo">
                <div style="font-size:15px; font-weight:600;">${safeString(trkInfo.trackName)}</div>
                <div style="font-size:12px; color:#aaa; margin-top:3px;">${safeString(trkInfo.artistName)} - ${durationStr}</div>
            </div>
            <button class="btnFilter _playBtn" style="padding:6px 10px;font-size:12px;">Play</button>
            <button class="btnFilter _remBtn" style="color:#ff6b81; padding:6px 10px;font-size:12px;">✕</button>
        `;
        
        rw.querySelector('._playBtn').addEventListener('click', () => handlers.onPlay(trkInfo));
        rw.querySelector('._remBtn').addEventListener('click', () => {
            handlers.onRemove(trkInfo.trackId);
            rw.remove();
        });
        
        wrap.appendChild(rw);
    });
    
    likesWrapper.appendChild(wrap);
};

export const showModal = () => { 
    favModal.hidden = false; 
    document.body.style.overflow = 'hidden'; 
};

export const hideModal = () => { 
    favModal.hidden = true; 
    document.body.style.overflow = ''; 
};

export const updateBadge = (amount) => {
    let bdg = document.getElementById('favCounter');
    
    if (amount > 99) bdg.textContent = '99+';
    else bdg.textContent = amount;
    
    bdg.style.display = (amount > 0) ? 'inline-block' : 'none';
};

export const showWelcome = () => {
    heroDiv.hidden = false;
    emptyMessage.hidden = true;
    topResultsBar.hidden = true;
    tracksGrid.innerHTML = '';
};

export const showLoader = () => document.getElementById('searchLoadingData')?.classList.add('active');
export const hideLoader = () => document.getElementById('searchLoadingData')?.classList.remove('active');

function makeCard(song, boundEvents, curPId) {
    let isFaved = isTrackLiked(song.trackId);
    let theImg = getHighResArtwork(song.artworkUrl100);
    
    let elDOM = document.createElement('div');
    elDOM.className = 'trackCard';
    if(curPId === song.trackId) elDOM.classList.add('playing');
    
    elDOM.dataset.tid = song.trackId;
    
    let expBadge = '';
    if(song.trackExplicitness === 'explicit') {
        expBadge = '<span style="background:#e74c3c; padding:2px 5px; border-radius:4px; font-size:10px; margin-left:6px; color:#fff;">E</span>';
    }
    
    elDOM.innerHTML = `
        <div style="position:relative;">
            <img src="${theImg}" class="albumImage" loading="lazy" />
            <button class="favBtn ${isFaved?'liked':''}" data-fav-id="${song.trackId}" style="position:absolute; top:8px; right:8px; background:rgba(0,0,0,0.6); border:none; padding:6px; border-radius:50%; cursor:pointer;">
                <svg viewBox="0 0 24 24" fill="${isFaved?'currentColor':'none'}" stroke="${isFaved?'#ff4757':'#ccc'}" width="18" height="18" stroke-width="1.8">
                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            </button>
        </div>
        <div class="tInfo">
            <span class="tName">${safeString(song.trackName)}</span>
            <span class="tArtist">${safeString(song.artistName)}</span>
            <div style="font-size:12px; color:#888; margin-top:8px; display:flex; align-items:center;">
                ${formatDuration(song.trackTimeMillis)} ${expBadge}
            </div>
        </div>
    `;
    
    elDOM.addEventListener('click', (ev) => {
        if(ev.target.closest('.favBtn')) return;
        boundEvents.onPlay(song);
    });
    
    let btnHeart = elDOM.querySelector('.favBtn');
    btnHeart.onclick = (e) => {
        e.stopPropagation();
        boundEvents.onLike(song);
    };
    
    return elDOM;
}

function safeString(text) {
    if(!text) return '';
    let tmp = document.createElement('div');
    tmp.textContent = text;
    return tmp.innerHTML;
}