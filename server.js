const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const streamsFile = path.join(dataDir, 'streams.json');

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(streamsFile)) {
    fs.writeFileSync(
      streamsFile,
      JSON.stringify(
        [
          {
            id: 'demo-1',
            name: 'Demo Live Stream',
            category: 'General',
            url: 'https://test-streams.mux.dev/x36xhzz/x3aisokq.m3u8'
          }
        ],
        null,
        2
      )
    );
  }
}

function readStreams() {
  ensureDataFile();
  const file = fs.readFileSync(streamsFile, 'utf8');
  return JSON.parse(file);
}

function writeStreams(streams) {
  ensureDataFile();
  fs.writeFileSync(streamsFile, JSON.stringify(streams, null, 2));
}

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'TV stream server is healthy.' });
});

app.get('/api/streams', (req, res) => {
  try {
    const streams = readStreams();
    res.json(streams);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load streams.', error: error.message });
  }
});

app.post('/api/streams', (req, res) => {
  try {
    const { name, url, category = 'General' } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: 'Name and URL are required.' });
    }

    const streams = readStreams();
    const newStream = {
      id: `stream-${Date.now()}`,
      name: String(name).trim(),
      url: String(url).trim(),
      category: String(category).trim() || 'General'
    };

    streams.push(newStream);
    writeStreams(streams);
    res.status(201).json(newStream);
  } catch (error) {
    res.status(500).json({ message: 'Unable to save stream.', error: error.message });
  }
});

app.delete('/api/streams/:id', (req, res) => {
  try {
    const streams = readStreams();
    const filtered = streams.filter((stream) => stream.id !== req.params.id);

    if (filtered.length === streams.length) {
      return res.status(404).json({ message: 'Stream not found.' });
    }

    writeStreams(filtered);
    res.json({ message: 'Stream deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete stream.', error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TV streaming app is running at http://localhost:${PORT}`);
});
