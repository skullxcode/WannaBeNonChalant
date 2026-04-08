let musicEl, bottomDock, btnTog, icoP, icoPau;
let sBar, sFill, sThumb;
let tCurr, tTotal, sVol;
let cArt, songTxt, artTxt;
let canvasViz, ctx;

let audioCtx = null;
let eqAnalyser = null;
let nodeSrc = null;
let drawingTimer = null;

let trackPlayingObj = null;
let isScrubbing = false;

const cbStack = [];

export function setupAudio() {
    musicEl = document.getElementById('htmlAudioEl');
    bottomDock = document.getElementById('globalPlayer');
    btnTog = document.getElementById('togglePlayBtn');
    
    if(!btnTog) return;
    
    icoP = btnTog.querySelector('.iconPlay');
    icoPau = btnTog.querySelector('.iconPause');
    
    sBar = document.getElementById('seekTrack');
    sFill = document.getElementById('seekFill');
    sThumb = document.getElementById('seekThumb');
    
    tCurr = document.getElementById('timeCurrent');
    tTotal = document.getElementById('timeTotal');
    sVol = document.getElementById('sliderVol');
    
    cArt = document.getElementById('playingArt');
    songTxt = document.getElementById('currTrackTitle');
    artTxt = document.getElementById('currArtistTitle');
    
    canvasViz = document.getElementById('canvasVis');
    ctx = canvasViz.getContext('2d');
    
    musicEl.volume = parseFloat(sVol.value);
    musicEl.crossOrigin = 'anonymous';
    
    createBinds();
}

export function loadAndPlaySong(trkInfo) {
    if(!trkInfo || !trkInfo.previewUrl) return;
    
    if(trackPlayingObj && trackPlayingObj.trackId === trkInfo.trackId) {
        cyclePlayState();
        return;
    }
    
    fireUpdateStack(trackPlayingObj, trkInfo);
    trackPlayingObj = trkInfo;
    
    cArt.src = trkInfo.artworkUrl100 ? trkInfo.artworkUrl100.replace(/\d+x\d+bb/, '600x600bb') : '';
    songTxt.textContent = trkInfo.trackName || 'Unlabeled';
    artTxt.textContent = trkInfo.artistName || 'Unknown';
    
    updateBarUI(0);
    tCurr.textContent = '0:00';
    tTotal.textContent = '0:30';
    
    bottomDock.dataset.visible = 'true';
    bottomDock.style.display = 'flex';
    
    let finalUrl = trkInfo.previewUrl.replace(/^http:/i, 'https:');
    
    spawnAudioChain();
    
    musicEl.src = finalUrl;
    musicEl.load();
    
    let playTry = musicEl.play();
    if(playTry) playTry.catch(e => {});
}

export function cyclePlayState() {
    if(!musicEl) return;
    
    if(musicEl.paused) {
        if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        musicEl.play().catch(e => {});
    } else {
        musicEl.pause();
    }
}

export const getCurrentSongInfo = () => trackPlayingObj;

export const watchTrackChanges = (action) => {
    if(typeof action === 'function') cbStack.push(action);
};

function createBinds() {
    btnTog.addEventListener('click', cyclePlayState);
    
    musicEl.addEventListener('play', () => {
        icoP.hidden = true; 
        icoPau.hidden = false;
        bottomDock.classList.add('playingActive');
        unpauseEq();
    });
    
    musicEl.addEventListener('pause', () => {
        icoP.hidden = false; 
        icoPau.hidden = true;
        bottomDock.classList.remove('playingActive');
        pauseEq();
    });
    
    musicEl.addEventListener('ended', () => {
        icoP.hidden = false; 
        icoPau.hidden = true;
        updateBarUI(0);
        tCurr.textContent = '0:00';
        pauseEq();
        
        fireUpdateStack(trackPlayingObj, null);
        trackPlayingObj = null;
    });
    
    musicEl.addEventListener('timeupdate', () => {
        if(isScrubbing) return;
        let v = musicEl.duration ? (musicEl.currentTime / musicEl.duration) * 100 : 0;
        updateBarUI(v);
        tCurr.textContent = parseTime(musicEl.currentTime);
    });
    
    musicEl.addEventListener('loadedmetadata', () => {
        tTotal.textContent = parseTime(musicEl.duration);
    });
    
    sVol.addEventListener('input', () => {
        musicEl.volume = parseFloat(sVol.value);
    });
    
    sBar.addEventListener('click', scrubToLine);
    sBar.addEventListener('mousedown', (evt) => { isScrubbing = true; trackMouseLine(evt); });
    document.addEventListener('mousemove', trackMouseLine);
    document.addEventListener('mouseup', letGoScrub);
}

const updateBarUI = (percentVal) => {
    let capped = Math.max(0, Math.min(100, percentVal));
    sFill.style.width = capped + '%';
    sThumb.style.left = capped + '%';
};

function scrubToLine(ev) {
    if(!musicEl.duration) return;
    let bnds = sBar.getBoundingClientRect();
    let p = Math.max(0, Math.min(1, (ev.clientX - bnds.left) / bnds.width));
    musicEl.currentTime = p * musicEl.duration;
    updateBarUI(p * 100);
}

function trackMouseLine(ev) {
    if(!isScrubbing || !musicEl.duration) return;
    let bnds = sBar.getBoundingClientRect();
    let p = Math.max(0, Math.min(1, (ev.clientX - bnds.left) / bnds.width));
    updateBarUI(p * 100);
    tCurr.textContent = parseTime(p * musicEl.duration);
}

function letGoScrub(ev) {
    if(!isScrubbing) return;
    isScrubbing = false;
    
    if(!musicEl.duration) return;
    
    let bnds = sBar.getBoundingClientRect();
    let p = Math.max(0, Math.min(1, (ev.clientX - bnds.left) / bnds.width));
    musicEl.currentTime = p * musicEl.duration;
}

function spawnAudioChain() {
    if(audioCtx) {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        return;
    }
    
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        nodeSrc = audioCtx.createMediaElementSource(musicEl);
        eqAnalyser = audioCtx.createAnalyser();
        
        eqAnalyser.fftSize = 64;
        eqAnalyser.smoothingTimeConstant = 0.8;
        
        nodeSrc.connect(eqAnalyser);
        eqAnalyser.connect(audioCtx.destination);
    } catch(err) {
        audioCtx = null;
    }
}

function unpauseEq() {
    if(!eqAnalyser) return;
    pauseEq();
    loopDrawTick();
}

function pauseEq() {
    if(drawingTimer) {
        cancelAnimationFrame(drawingTimer);
        drawingTimer = null;
    }
    if(ctx) ctx.clearRect(0, 0, canvasViz.width, canvasViz.height);
}

function loopDrawTick() {
    if(!eqAnalyser) return;
    drawingTimer = requestAnimationFrame(loopDrawTick);
    
    let binSz = eqAnalyser.frequencyBinCount;
    let tmpArr = new Uint8Array(binSz);
    eqAnalyser.getByteFrequencyData(tmpArr);
    
    ctx.clearRect(0, 0, canvasViz.width, canvasViz.height);
    
    const qty = 24; 
    const padding = 2;
    const cw = (canvasViz.width - padding * (qty - 1)) / qty;
    
    for(let o=0; o<qty; o++) {
        let fetchIndex = Math.floor((o / qty) * binSz * 0.7);
        let curVal = tmpArr[fetchIndex];
        let calcH = Math.max(2, (curVal / 255) * canvasViz.height * 0.95);
        
        let startX = o * (cw + padding);
        let startY = canvasViz.height - calcH;
        let trans = 0.4 + (curVal / 255) * 0.6;
        
        ctx.fillStyle = `rgba(144, 202, 249, ${trans})`;
        ctx.beginPath();
        if(ctx.roundRect) {
            ctx.roundRect(startX, startY, cw, calcH, 2);
        } else {
            ctx.rect(startX, startY, cw, calcH);
        }
        ctx.fill();
    }
}

function parseTime(s) {
    if(!s || isNaN(s)) return '0:00';
    let mins = Math.floor(s / 60);
    let strSecs = Math.floor(s % 60);
    return mins + ':' + (strSecs < 10 ? '0' + strSecs : strSecs);
}

function fireUpdateStack(n1, n2) {
    cbStack.forEach(fn => fn(n1, n2));
}