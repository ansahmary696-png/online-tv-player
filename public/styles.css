<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Online TV</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="app-shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">LIVE</p>
          <h1>Online TV</h1>
        </div>

        <div class="topbar-actions">
          <button id="loginBtn" class="secondary">Admin login</button>
          <button id="logoutBtn" class="ghost hidden">Logout</button>
          <button id="toggleFullscreen" class="primary">Fullscreen</button>
        </div>
      </header>

      <main class="layout">
        <section class="player-panel">
          <video id="videoPlayer" controls playsinline></video>
          <div class="meta-row">
            <div>
              <span class="label">Now playing</span>
              <strong id="currentChannel">Demo Live Stream</strong>
            </div>
            <div>
              <span class="label">Status</span>
              <strong id="playerStatus">Ready</strong>
            </div>
          </div>
        </section>

        <aside class="sidebar">
          <div class="panel">
            <h2>Channels</h2>
            <div id="channelList" class="channel-list"></div>
          </div>

          <div id="adminPanel" class="panel hidden">
            <h2>Admin controls</h2>

            <section class="admin-section">
              <h3>Add stream</h3>
              <form id="streamForm">
                <label>
                  <span>Channel name</span>
                  <input type="text" id="name" placeholder="Sports TV" required />
                </label>

                <label>
                  <span>Category</span>
                  <input type="text" id="category" placeholder="News" />
                </label>

                <label>
                  <span>Stream URL</span>
                  <input type="url" id="url" placeholder="https://example.com/live.m3u8" required />
                </label>

                <button type="submit" class="primary">Save stream</button>
              </form>
            </section>

            <section class="admin-section">
              <h3>Import M3U playlist</h3>
              <form id="m3uForm">
                <label>
                  <span>M3U URL</span>
                  <input type="url" id="m3uUrl" placeholder="https://example.com/playlist.m3u" />
                </label>

                <label>
                  <span>Paste M3U text</span>
                  <textarea id="m3uText" rows="6" placeholder="#EXTM3U\n#EXTINF:-1,Channel 1\nhttps://example.com/channel1.m3u8"></textarea>
                </label>

                <button type="submit" class="primary">Import playlist</button>
              </form>
            </section>
          </div>
        </aside>
      </main>
    </div>

    <div id="loginModal" class="modal hidden">
      <div class="modal-card">
        <div class="modal-header">
          <h2>Admin login</h2>
          <button id="closeLoginModal" class="close-btn" type="button">×</button>
        </div>

        <form id="loginForm">
          <label>
            <span>Username</span>
            <input type="text" id="loginUsername" placeholder="admin" required />
          </label>

          <label>
            <span>Password</span>
            <input type="password" id="loginPassword" placeholder="admin123" required />
          </label>

          <button type="submit" class="primary">Login</button>
        </form>
      </div>
    </div>

    <script src="/app.js"></script>
  </body>
</html>
