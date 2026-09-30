const videoPlayer = document.getElementById('videoPlayer');
const currentChannel = document.getElementById('currentChannel');
const playerStatus = document.getElementById('playerStatus');
const channelList = document.getElementById('channelList');
const streamForm = document.getElementById('streamForm');
const m3uForm = document.getElementById('m3uForm');
const adminPanel = document.getElementById('adminPanel');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const fullscreenButton = document.getElementById('toggleFullscreen');

const state = {
  streams: [],
  activeStreamId: null,
  token: localStorage.getItem('tv_token') || ''
};

function renderAuth(isLoggedIn) {
  adminPanel.classList.toggle('hidden', !isLoggedIn);
  loginBtn.classList.toggle('hidden', isLoggedIn);
  logoutBtn.classList.toggle('hidden', !isLoggedIn);
}

async function apiFetch(url, options = {}) {
  const headers = { ...(options.headers || {}) };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    state.token = '';
    localStorage.removeItem('tv_token');
    renderAuth(false);
    throw new Error('Authentication required.');
  }

  return response;
}

async function fetchStreams() {
  const response = await fetch('/api/streams');

  if (!response.ok) {
    throw new Error('Unable to fetch streams');
  }

  state.streams = await response.json();
  renderChannels();

  if (state.streams.length && !state.activeStreamId) {
    loadStream(state.streams[0]);
  }
}

function renderChannels() {
  channelList.innerHTML = '';

  state.streams.forEach((stream) => {
    const item = document.createElement('div');
    item.className = 'channel-item' + (stream.id === state.activeStreamId ? ' active' : '');

    const meta = document.createElement('div');
    meta.className = 'channel-meta';
    meta.innerHTML = `
      <span class="channel-name">${stream.name}</span>
      <span class="channel-category">${stream.category || 'General'}</span>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Remove';
    deleteBtn.style.display = state.token ? 'inline-flex' : 'none';
    deleteBtn.addEventListener('click', async (event) => {
      event.stopPropagation();
      await deleteStream(stream.id);
    });

    item.addEventListener('click', () => loadStream(stream));
    item.append(meta, deleteBtn);
    channelList.appendChild(item);
  });
}

function loadStream(stream) {
  state.activeStreamId = stream.id;
  currentChannel.textContent = stream.name;
  playerStatus.textContent = 'Loading...';
  videoPlayer.src = stream.url;
  videoPlayer.load();
  videoPlayer.play().catch(() => {
    playerStatus.textContent = 'Stream ready';
  });
  renderChannels();
}

async function deleteStream(id) {
  const response = await apiFetch(`/api/streams/${id}`, { method: 'DELETE' });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    alert(err.message || 'Unable to remove stream.');
    return;
  }

  state.streams = state.streams.filter((stream) => stream.id !== id);

  if (state.activeStreamId === id) {
    state.activeStreamId = state.streams[0]?.id || null;
    if (state.streams[0]) {
      loadStream(state.streams[0]);
    } else {
      currentChannel.textContent = 'No active stream';
      playerStatus.textContent = 'No stream selected';
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
    }
  }

  renderChannels();
}

async function loginUser(username, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to sign in.');
  }

  state.token = data.token;
  localStorage.setItem('tv_token', data.token);
  renderAuth(true);
  loginModal.classList.add('hidden');
  loginForm.reset();
}

async function logoutUser() {
  if (state.token) {
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    }).catch(() => {});
  }

  state.token = '';
  localStorage.removeItem('tv_token');
  renderAuth(false);
}

streamForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!state.token) {
    loginModal.classList.remove('hidden');
    return;
  }

  const payload = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value || 'General',
    url: document.getElementById('url').value
  };

  const response = await apiFetch('/api/streams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || 'Unable to save stream.');
    return;
  }

  state.streams.push(data);
  streamForm.reset();
  renderChannels();
  loadStream(data);
});

m3uForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!state.token) {
    loginModal.classList.remove('hidden');
    return;
  }

  const m3uText = document.getElementById('m3uText').value.trim();
  const m3uUrl = document.getElementById('m3uUrl').value.trim();

  const response = await apiFetch('/api/import-m3u', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: m3uText || undefined, url: m3uUrl || undefined })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || 'Unable to import playlist.');
    return;
  }

  if (data.imported && data.imported.length) {
    state.streams = [...state.streams, ...data.imported];
    m3uForm.reset();
    renderChannels();
    loadStream(data.imported[0]);
    alert(`Imported ${data.imported.length} streams.`);
  } else {
    alert('No tracks were imported.');
  }
});

loginBtn.addEventListener('click', () => {
  loginModal.classList.remove('hidden');
});

closeLoginModal.addEventListener('click', () => {
  loginModal.classList.add('hidden');
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    await loginUser(username, password);
  } catch (error) {
    alert(error.message || 'Login failed.');
  }
});

logoutBtn.addEventListener('click', async () => {
  await logoutUser();
  renderChannels();
});

videoPlayer.addEventListener('play', () => {
  playerStatus.textContent = 'Playing';
});

videoPlayer.addEventListener('pause', () => {
  playerStatus.textContent = 'Paused';
});

videoPlayer.addEventListener('error', () => {
  playerStatus.textContent = 'Stream unavailable';
});

fullscreenButton.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
});

loginModal.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.classList.add('hidden');
  }
});

renderAuth(Boolean(state.token));
fetchStreams().catch((error) => {
  console.error(error);
  playerStatus.textContent = 'Failed to load streams';
});

if (state.token) {
  fetch('/api/session', {
    headers: { Authorization: `Bearer ${state.token}` }
  }).then((response) => response.json()).then((data) => {
    if (!data.loggedIn) {
      logoutUser();
    }
  }).catch(() => logoutUser());
}
