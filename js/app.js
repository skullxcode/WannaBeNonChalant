import { searchTracks } from './api.js';
import { renderTracks, showLoader, hideLoader, showInitialState } from './uiRenderer.js';

const searchInput = document.getElementById('searchInput');
const explicitToggle = document.getElementById('explicitToggle');

let masterTracks = [];
let hideExplicit = false;

function init() {
  searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    
    if (!query) {
      masterTracks = [];
      showInitialState();
      return;
    }

    showLoader();
    masterTracks = await searchTracks(query);
    hideLoader();
    updateDisplay();
  });

  explicitToggle.addEventListener('click', () => {
    hideExplicit = !hideExplicit;
    if (hideExplicit) {
      explicitToggle.textContent = 'Show Explicit';
    } else {
      explicitToggle.textContent = 'Hide Explicit';
    }
    updateDisplay();
  });
}

function updateDisplay() {
  if (masterTracks.length === 0) {
    renderTracks([]);
    return;
  }

  let filtered = masterTracks.filter(track => {
    if (hideExplicit) {
      return track.trackExplicitness !== 'explicit' && track.collectionExplicitness !== 'explicit';
    }
    return true;
  });

  renderTracks(filtered);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}