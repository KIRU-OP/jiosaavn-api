import { Hono } from 'hono'

export const Home = new Hono()

export const Meteors = ({ number }: { number: number }) => {
  return (
    <>
      {Array.from({ length: number || 20 }, (_, idx) => (
        <span
          key={idx}
          class="meteor animate-[meteorAnimation_3s_linear_infinite] absolute h-1 w-1 rounded-[9999px] shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
            animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`
          }}
        />
      ))}
    </>
  )
}

Home.get('/', (c) => {
  const title = 'JioSaavn API'
  const description =
    'JioSaavn API is an unofficial wrapper written in TypeScript for jiosaavn.com providing programmatic access to a vast library of songs, albums, artists, playlists, and more.'

  return c.html(
    <html>
      <head>
        <title>JioSaavn API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="utf-8" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saavn.dev/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://saavn.dev/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/preview.jpg"
        />
        <meta
          property="twitter:image"
          content="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/preview.jpg"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/favicon.ico"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * { font-family: 'Inter', sans-serif; }
            @keyframes borderAnimation {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes meteorAnimation {
              0% { transform: rotate(215deg) translateX(0); opacity: 1; }
              70% { opacity: 1; }
              100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            .meteor::before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 50px;
              height: 1px;
              background: linear-gradient(90deg, #64748b, transparent);
            }
            .animate-meteor-effect { animation-name: meteorAnimation; }
            .song-card {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 10px 12px;
              border-radius: 10px;
              cursor: pointer;
              transition: background 0.15s;
              border: 1px solid transparent;
              animation: fadeIn 0.3s ease both;
            }
            .song-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.08); }
            .song-card.active { background: rgba(255,125,120,0.12); border-color: rgba(255,125,120,0.3); }
            .song-img {
              width: 48px;
              height: 48px;
              border-radius: 8px;
              object-fit: cover;
              flex-shrink: 0;
              background: #1a1a1a;
            }
            .play-btn {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: rgba(255,125,120,0.15);
              border: 1px solid rgba(255,125,120,0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              transition: all 0.15s;
              color: #ff7d78;
            }
            .play-btn:hover { background: rgba(255,125,120,0.3); transform: scale(1.05); }
            .song-list-wrap {
              max-height: 420px;
              overflow-y: auto;
              scrollbar-width: thin;
              scrollbar-color: rgba(255,125,120,0.3) transparent;
            }
            .song-list-wrap::-webkit-scrollbar { width: 4px; }
            .song-list-wrap::-webkit-scrollbar-thumb { background: rgba(255,125,120,0.3); border-radius: 4px; }
            .player-bar {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 50;
              background: rgba(10,10,10,0.95);
              backdrop-filter: blur(16px);
              border-top: 1px solid rgba(255,255,255,0.08);
              padding: 12px 20px;
              display: none;
              align-items: center;
              gap: 16px;
            }
            .player-bar.visible { display: flex; }
            .progress-bar {
              -webkit-appearance: none;
              appearance: none;
              height: 4px;
              border-radius: 2px;
              background: rgba(255,255,255,0.15);
              outline: none;
              cursor: pointer;
              flex: 1;
            }
            .progress-bar::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: #ff7d78;
              cursor: pointer;
            }
            .loader {
              width: 20px;
              height: 20px;
              border: 2px solid rgba(255,125,120,0.2);
              border-top-color: #ff7d78;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }
            .search-input {
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 10px;
              padding: 10px 16px;
              color: white;
              font-size: 14px;
              width: 100%;
              outline: none;
              transition: border-color 0.2s;
            }
            .search-input:focus { border-color: rgba(255,125,120,0.5); }
            .search-input::placeholder { color: rgba(255,255,255,0.3); }
            .tab-btn {
              padding: 6px 14px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.15s;
              border: 1px solid rgba(255,255,255,0.1);
              color: rgba(255,255,255,0.5);
              background: transparent;
            }
            .tab-btn.active-tab {
              background: rgba(255,125,120,0.15);
              border-color: rgba(255,125,120,0.4);
              color: #ff7d78;
            }
            .empty-state {
              text-align: center;
              padding: 40px 20px;
              color: rgba(255,255,255,0.3);
              font-size: 14px;
            }
            `
          }}
        />
      </head>
      <body class="bg-black mx-auto md:min-h-screen max-w-screen-lg flex flex-col pb-24">
        <main class="mx-auto my-auto flex flex-col space-y-8 px-4 pb-8 md:py-10 relative overflow-y-hidden overflow-x-hidden w-full">
          <Meteors number={15} />

          {/* ── Header ── */}
          <div class="flex flex-row items-center space-x-4 ml-6">
            <svg class="sm:h-12 sm:w-12 h-8 w-8 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#ff7d78"
                d="M3.172 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.172 8.535C4.343 22 6.229 22 10 22h3.376A4.25 4.25 0 0 1 17 16.007V12.25a2.25 2.25 0 0 1 4.5 0a.75.75 0 0 0 .5.707V12c0-4.714 0-7.071-1.172-8.536C19.657 2 17.771 2 14 2h-4C6.229 2 4.343 2 3.172 3.464"
                opacity=".5"
              />
              <path
                fill="#ff7d78"
                fill-rule="evenodd"
                d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m11-.5a.75.75 0 0 1 .75.75a2.25 2.25 0 0 0 2.25 2.25a.75.75 0 0 1 0 1.5a3.734 3.734 0 0 1-2.25-.75v5a2.75 2.75 0 1 1-1.5-2.45v-5.55a.75.75 0 0 1 .75-.75m-.75 8.75a1.25 1.25 0 1 0-2.5 0a1.25 1.25 0 0 0 2.5 0"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-2xl md:text-4xl text-transparent font-bold leading-none bg-clip-text bg-gradient-to-r from-[#ff7d78] to-purple-600">
              JioSaavn API
              <span class="uppercase text-sm ml-3 text-gray-500 font-normal sm:hidden">Unofficial</span>
            </p>
            <p class="hidden sm:block animate-[borderAnimation_3s_linear_infinite] rounded bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
              <span class="block rounded px-1.5 py-0.5 text-xs text-white uppercase tracking-wider">Unofficial</span>
            </p>
          </div>

          {/* ── Bhojpuri Music Player Section ── */}
          <div class="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            {/* Section title */}
            <div class="flex items-center gap-3">
              <span class="text-xl">🎵</span>
              <div>
                <h2 class="text-white font-bold text-lg leading-tight">Bhojpuri Music</h2>
                <p class="text-neutral-500 text-xs mt-0.5">Latest songs • A to Z search • Play instantly</p>
              </div>
            </div>

            {/* Search bar */}
            <div class="flex gap-2">
              <input
                type="text"
                id="searchInput"
                class="search-input"
                placeholder="Search Bhojpuri songs, artists, albums…"
                autocomplete="off"
              />
              <button
                id="searchBtn"
                onclick="doSearch()"
                class="shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff7d78] to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </div>

            {/* Quick filter tabs */}
            <div class="flex flex-wrap gap-2" id="quickFilters">
              {['Latest Bhojpuri', 'Pawan Singh', 'Khesari Lal', 'Neelkamal Singh', 'Shilpi Raj', 'Antra Singh', 'Bhojpuri 2025', 'Bhojpuri Remix'].map((label) => (
                <button
                  key={label}
                  class="tab-btn"
                  onclick={`quickSearch('${label}')`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Results area */}
            <div id="resultsArea">
              <div class="empty-state">
                <p class="text-2xl mb-2">🎶</p>
                <p>Search or tap a filter above to discover Bhojpuri songs</p>
              </div>
            </div>
          </div>

          {/* ── Info Cards ── */}
          <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2 sm:gap-0 relative grid-flow-row">
            <a
              target="_blank"
              class="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="/docs"
            >
              <div class="flex flex-col">
                <span class="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-red-500 text-red-500">
                  Get Started
                </span>
                <span class="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">Explore the Docs</span>
                <div class="text-neutral-500 mt-2">
                  Check out the documentation to learn how to use the JioSaavn API.
                </div>
              </div>
            </a>

            <a
              target="_blank"
              class="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="https://github.com/sumitkolhe/jiosaavn-api"
            >
              <div class="flex flex-col">
                <span class="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-green-500 text-green-500">
                  Open Source
                </span>
                <span class="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">Open Source</span>
                <div class="text-neutral-500 mt-2">Saavn API is open-source. Check out the source code on github.</div>
              </div>
            </a>

            <a
              target="_blank"
              class="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="https://github.com/sumitkolhe/jiosaavn-api/issues"
            >
              <div class="flex flex-col">
                <span class="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-violet-500 text-violet-500">
                  Contribute
                </span>
                <span class="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">Get Involved</span>
                <div class="text-neutral-500 mt-2">
                  Encounter a bug or have a feature suggestion? Report it on GitHub or contribute by submitting a pull
                  request.
                </div>
              </div>
            </a>

            <div class="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4">
              <div class="flex flex-col">
                <span class="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-blue-500 text-blue-500">
                  Contact
                </span>
                <span class="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">Sumit Kolhe</span>
                <div class="text-neutral-500 mt-2">
                  Have a question or need help? Reach out on{' '}
                  <a href="https://github.com/sumitkolhe" target="_blank" rel="noopener noreferrer" class="hover:underline text-indigo-500">GitHub</a>
                  ,{' '}
                  <a href="https://twitter.com/thesumitkolhe" target="_blank" rel="noopener noreferrer" class="hover:underline text-sky-500">Twitter</a>
                  , or{' '}
                  <a href="https://t.me/sumitkolhe" target="_blank" rel="noopener noreferrer" class="hover:underline text-pink-500">Telegram.</a>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ── Sticky Player Bar ── */}
        <div class="player-bar" id="playerBar">
          {/* Thumbnail */}
          <img id="playerThumb" src="" alt="" style="width:44px;height:44px;border-radius:8px;object-fit:cover;flex-shrink:0;display:none;" />
          {/* Song info */}
          <div style="flex:1;min-width:0;overflow:hidden;">
            <p id="playerTitle" style="color:white;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;"></p>
            <p id="playerArtist" style="color:rgba(255,255,255,0.45);font-size:11px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></p>
          </div>
          {/* Controls */}
          <button id="prevBtn" onclick="prevSong()" style="background:none;border:none;color:rgba(255,255,255,0.5);cursor:pointer;font-size:18px;padding:4px;" title="Previous">⏮</button>
          <button id="playPauseBtn" onclick="togglePlay()" style="width:40px;height:40px;border-radius:50%;background:rgba(255,125,120,0.2);border:1px solid rgba(255,125,120,0.5);color:#ff7d78;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;" title="Play/Pause">▶</button>
          <button id="nextBtn" onclick="nextSong()" style="background:none;border:none;color:rgba(255,255,255,0.5);cursor:pointer;font-size:18px;padding:4px;" title="Next">⏭</button>
          {/* Progress */}
          <div style="display:flex;align-items:center;gap:8px;flex:2;min-width:0;">
            <span id="currentTime" style="font-size:11px;color:rgba(255,255,255,0.4);min-width:32px;">0:00</span>
            <input type="range" id="progressBar" class="progress-bar" value="0" min="0" max="100" step="0.1" oninput="seekTo(this.value)" />
            <span id="totalTime" style="font-size:11px;color:rgba(255,255,255,0.4);min-width:32px;">0:00</span>
          </div>
          {/* Volume */}
          <input type="range" id="volumeBar" min="0" max="1" step="0.05" value="1"
            style="-webkit-appearance:none;appearance:none;width:70px;height:3px;border-radius:2px;background:rgba(255,255,255,0.15);outline:none;cursor:pointer;"
            oninput="setVolume(this.value)" title="Volume" />
          {/* Close */}
          <button onclick="closePlayer()" style="background:none;border:none;color:rgba(255,255,255,0.3);cursor:pointer;font-size:16px;padding:4px;" title="Close">✕</button>
          <audio id="audioPlayer" preload="none"></audio>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
// ── State ──────────────────────────────────────────────
let songs = [];
let currentIdx = -1;
const audio = document.getElementById('audioPlayer');

// ── Helpers ────────────────────────────────────────────
function fmtTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function bestImage(images) {
  if (!images) return '';
  if (typeof images === 'string') return images;
  if (Array.isArray(images)) {
    const q = images.find(i => i.quality === '500x500') || images.find(i => i.quality === '150x150') || images[images.length - 1];
    return q ? q.url : '';
  }
  return '';
}

function bestUrl(downloadUrls) {
  if (!downloadUrls) return '';
  if (typeof downloadUrls === 'string') return downloadUrls;
  if (Array.isArray(downloadUrls)) {
    const q = downloadUrls.find(u => u.quality === '320kbps') || downloadUrls.find(u => u.quality === '160kbps') || downloadUrls[0];
    return q ? q.url : '';
  }
  return '';
}

function artistNames(song) {
  if (song.artists?.primary?.length) return song.artists.primary.map(a => a.name).join(', ');
  if (song.primaryArtists) return song.primaryArtists;
  if (song.more_info?.singers) return song.more_info.singers;
  return '';
}

function stripHtml(s) { return s ? s.replace(/<[^>]+>/g, '') : ''; }

// ── Search ─────────────────────────────────────────────
function quickSearch(term) {
  document.getElementById('searchInput').value = term;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
  event.target.classList.add('active-tab');
  doSearch();
}

async function doSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;
  const area = document.getElementById('resultsArea');
  area.innerHTML = '<div style="display:flex;justify-content:center;padding:40px 0;"><div class=\\"loader\\"></div></div>';

  try {
    const res = await fetch('/api/search/songs?query=' + encodeURIComponent(q) + '&limit=30');
    const json = await res.json();
    const list = json?.data?.results || json?.data?.songs?.results || json?.results || [];
    songs = list;
    renderList(list);
  } catch(e) {
    area.innerHTML = '<div class=\\"empty-state\\"><p style=\\"font-size:20px\\">⚠️</p><p>Could not fetch results. Is the API running?</p></div>';
  }
}

function renderList(list) {
  const area = document.getElementById('resultsArea');
  if (!list.length) {
    area.innerHTML = '<div class=\\"empty-state\\"><p style=\\"font-size:20px\\">😔</p><p>No songs found. Try a different search.</p></div>';
    return;
  }
  const wrap = document.createElement('div');
  wrap.className = 'song-list-wrap';
  list.forEach((song, idx) => {
    const img = bestImage(song.image);
    const name = stripHtml(song.name || song.title || '');
    const artist = stripHtml(artistNames(song));
    const dur = fmtTime(song.duration);
    const card = document.createElement('div');
    card.className = 'song-card';
    card.id = 'card-' + idx;
    card.onclick = () => playSong(idx);
    card.innerHTML =
      (img ? '<img class=\\"song-img\\" src=\\"' + img + '\\" alt=\\"' + name + '\\" loading=\\"lazy\\" />' :
             '<div class=\\"song-img\\" style=\\"display:flex;align-items:center;justify-content:center;font-size:20px;color:rgba(255,255,255,0.2);\\">♪</div>') +
      '<div style=\\"flex:1;min-width:0;\\">'+
        '<p style=\\"color:white;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;\\">'+name+'</p>'+
        '<p style=\\"color:rgba(255,255,255,0.45);font-size:12px;margin:4px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\\">'+artist+'</p>'+
      '</div>'+
      '<span style=\\"color:rgba(255,255,255,0.3);font-size:12px;flex-shrink:0;\\">'+dur+'</span>'+
      '<div class=\\"play-btn\\"><svg width=\\"12\\" height=\\"14\\" viewBox=\\"0 0 12 14\\" fill=\\"currentColor\\"><path d=\\"M0 0l12 7-12 7V0z\\"/></svg></div>';
    wrap.appendChild(card);
  });
  area.innerHTML = '';
  area.appendChild(wrap);
}

// ── Playback ───────────────────────────────────────────
async function playSong(idx) {
  currentIdx = idx;
  const song = songs[idx];
  if (!song) return;

  // Mark active card
  document.querySelectorAll('.song-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById('card-' + idx);
  if (card) { card.classList.add('active'); card.scrollIntoView({block:'nearest', behavior:'smooth'}); }

  const name = stripHtml(song.name || song.title || '');
  const artist = stripHtml(artistNames(song));
  const img = bestImage(song.image);

  // Update player UI
  document.getElementById('playerTitle').textContent = name;
  document.getElementById('playerArtist').textContent = artist;
  const thumb = document.getElementById('playerThumb');
  if (img) { thumb.src = img; thumb.style.display = 'block'; } else { thumb.style.display = 'none'; }
  document.getElementById('playerBar').classList.add('visible');
  document.getElementById('playPauseBtn').textContent = '⏳';

  // Fetch stream URL via song details endpoint
  let url = bestUrl(song.downloadUrl || song.download_url);
  if (!url) {
    try {
      const r = await fetch('/api/songs/' + song.id);
      const j = await r.json();
      const s = j?.data?.[0] || j?.data || {};
      url = bestUrl(s.downloadUrl || s.download_url);
    } catch(_) {}
  }

  if (!url) {
    document.getElementById('playPauseBtn').textContent = '▶';
    alert('Stream URL not available for this song.');
    return;
  }

  audio.src = url;
  audio.volume = parseFloat(document.getElementById('volumeBar').value);
  await audio.play().catch(() => {});
  document.getElementById('playPauseBtn').textContent = '⏸';
}

function togglePlay() {
  if (audio.paused) { audio.play(); document.getElementById('playPauseBtn').textContent = '⏸'; }
  else { audio.pause(); document.getElementById('playPauseBtn').textContent = '▶'; }
}

function prevSong() { if (currentIdx > 0) playSong(currentIdx - 1); }
function nextSong() { if (currentIdx < songs.length - 1) playSong(currentIdx + 1); }

function seekTo(val) { if (audio.duration) audio.currentTime = (val / 100) * audio.duration; }
function setVolume(val) { audio.volume = parseFloat(val); }
function closePlayer() {
  audio.pause();
  document.getElementById('playerBar').classList.remove('visible');
  document.querySelectorAll('.song-card').forEach(c => c.classList.remove('active'));
}

// Progress update
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  document.getElementById('progressBar').value = pct;
  document.getElementById('currentTime').textContent = fmtTime(audio.currentTime);
  document.getElementById('totalTime').textContent = fmtTime(audio.duration);
});
audio.addEventListener('ended', () => nextSong());
audio.addEventListener('error', () => { document.getElementById('playPauseBtn').textContent = '▶'; });

// Enter key triggers search
document.getElementById('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

// Auto-load latest Bhojpuri on page load
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').value = 'Latest Bhojpuri';
  doSearch();
});
            `
          }}
        />
      </body>
    </html>
  )
})
