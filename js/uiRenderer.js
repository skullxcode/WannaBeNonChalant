import { formatDuration, getHighResArtwork } from './api.js';

const trackGrid = document.getElementById('trackGrid');
const emptyState = document.getElementById('emptyState');
const resultsBar = document.getElementById('resultsBar');
const resultsCount = document.getElementById('resultsCount');
const heroState = document.getElementById('heroState');

export function renderTracks(tracks) {
  trackGrid.innerHTML = '';

  if (tracks.length === 0) {
    emptyState.hidden = false;
    resultsBar.hidden = true;
    heroState.hidden = true;
    return;
  }

  emptyState.hidden = true;
  resultsBar.hidden = false;
  heroState.hidden = true;
  resultsCount.textContent = tracks.length + ' tracks found';

  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    const card = createTrackCard(track);
    trackGrid.appendChild(card);
  }
}

export function showLoader() {
  heroState.innerHTML = '<h2>Loading...</h2>';
  heroState.hidden = false;
  emptyState.hidden = true;
  resultsBar.hidden = true;
}

export function hideLoader() {
  // Loader is hidden when renderTracks is called
}

export function showInitialState() {
  heroState.innerHTML = '<h2>Search for music</h2>';
  heroState.hidden = false;
  emptyState.hidden = true;
  resultsBar.hidden = true;
  trackGrid.innerHTML = '';
}


function createTrackCard(track) {
  const artwork = getHighResArtwork(track.artworkUrl100);
  const duration = formatDuration(track.trackTimeMillis);
  const isExplicit = track.trackExplicitness === 'explicit' || track.collectionExplicitness === 'explicit';

  const card = document.createElement('div');
  card.className = 'track-card';
  
  let explicitLabel = '';
  if (isExplicit) {
    explicitLabel = '<span class="explicit-badge">E</span>';
  }

  card.innerHTML = '<img src="' + artwork + '" alt="' + track.trackName + '" class="track-image">' +
                   '<div class="track-info">' +
                   '<h3 class="track-name">' + track.trackName + '</h3>' +
                   '<p class="track-artist">' + track.artistName + '</p>' +
                   '<p class="track-duration">' + duration + ' ' + explicitLabel + '</p>' +
                   '</div>';

  return card;
}
