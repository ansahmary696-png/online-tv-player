const videoPlayer = document.getElementById('videoPlayer');
const currentChannel = document.getElementById('currentChannel');
const playerStatus = document.getElementById('playerStatus');
const channelList = document.getElementById('channelList');
const streamForm = document.getElementById('streamForm');
const fullscreenButton = document.getElementById('toggleFullscreen');

let streams = [];
let activeStreamId = null;

async function fetchStreams() {
  const res = await fetch('/api/streams');
  if (!res.ok) {
    throw new Error('Unable to fetch streams');
  }

  streams = await res.json();
  renderChannels();

  if (streams.length && !activeStreamId) {
    const firstStream = streams[0];
    loadStream(firstStream);
  }
}

function renderChannels() {
  channelList.innerHTML = '';

  streams.forEach((stream) => {
    const item = document.createElement('div');
    item.className = 'channel-item' + (stream.id === activeStreamId ? ' active' : '');

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
  activeStreamId = stream.id;
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
  const res = await fetch(`/api/streams/${id}`, { method: 'DELETE' });

  if (!res.ok) {
    alert('Unable to remove stream.');
    return;
  }

  streams = streams.filter((stream) => stream.id !== id);

  if (activeStreamId === id) {
    activeStreamId = streams[0]?.id || null;
    if (streams[0]) {
      loadStream(streams[0]);
    } else {
      currentChannel.textContent = 'No active stream';
      playerStatus.textContent = 'No stream selected';
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
    }
  }

  renderChannels();
}

streamForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value || 'General',
    url: document.getElementById('url').value
  };

  const res = await fetch('/api/streams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || 'Unable to save stream.');
    return;
  }

  streams.push(data);
  streamForm.reset();
  renderChannels();
  loadStream(data);
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

fetchStreams().catch((error) => {
  console.error(error);
  playerStatus.textContent = 'Failed to load streams';
});
