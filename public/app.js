* {
  box-sizing: border-box;
}

:root {
  --bg: #0b1020;
  --panel: #151d31;
  --panel-alt: #1d2944;
  --line: rgba(255, 255, 255, 0.09);
  --soft-text: #c8d4f6;
  --text: #f4f7ff;
  --primary: #6ae0ff;
  --primary-strong: #18b9ff;
  --danger: #ff5a5f;
  --shadow: rgba(0, 0, 0, 0.35);
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #0d1324 0%, #1a223a 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
  padding: 24px;
}

button, input, textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.hidden {
  display: none !important;
}

.app-shell {
  max-width: 1400px;
  margin: 0 auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--primary);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  font-weight: 700;
}

h1, h2, h3, p {
  margin: 0;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(300px, 420px);
  gap: 24px;
}

.player-panel,
.panel,
.modal-card {
  background: rgba(21, 29, 49, 0.9);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 18px 45px var(--shadow);
}

.player-panel {
  padding: 18px;
}

video {
  display: block;
  width: 100%;
  background: #000;
  min-height: 460px;
  border-radius: 12px;
  aspect-ratio: 16 / 9;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  color: var(--soft-text);
}

.label {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
  color: var(--soft-text);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.panel {
  padding: 18px;
}

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.channel-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: var(--panel-alt);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.channel-item:hover {
  border-color: rgba(106, 224, 255, 0.7);
  transform: translateY(-1px);
}

.channel-item.active {
  border-color: var(--primary);
  background: rgba(24, 185, 255, 0.12);
}

.channel-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.channel-name {
  font-weight: 700;
}

.channel-category {
  font-size: 0.82rem;
  color: var(--soft-text);
}

.delete-btn {
  background: rgba(255, 90, 95, 0.15);
  border: 1px solid rgba(255, 90, 95, 0.4);
  color: #ffdfe0;
  border-radius: 8px;
  padding: 7px 10px;
  cursor: pointer;
}

.admin-section {
  margin-top: 18px;
}

.admin-section h3 {
  margin-bottom: 12px;
  color: var(--primary);
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--soft-text);
  font-size: 0.9rem;
}

input,
textarea {
  width: 100%;
  background: #0b1222;
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px 14px;
  resize: vertical;
}

textarea {
  min-height: 120px;
}

button.primary,
button.secondary,
button.ghost {
  border: none;
  border-radius: 10px;
  padding: 12px 18px;
  font-weight: 700;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

button.primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-strong) 100%);
  color: #031b2b;
}

button.secondary {
  background: rgba(106, 224, 255, 0.15);
  border: 1px solid rgba(106, 224, 255, 0.4);
  color: var(--text);
}

button.ghost {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  border: 1px solid var(--line);
}

button:hover {
  opacity: 0.96;
  transform: translateY(-1px);
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(3, 8, 17, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  width: min(420px, 100%);
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 1.7rem;
  line-height: 1;
  cursor: pointer;
}

@media (max-width: 980px) {
  .layout {
    grid-template-columns: 1fr;
  }

  video {
    min-height: 280px;
  }
}
