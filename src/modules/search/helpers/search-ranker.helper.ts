/**
 * Search Result Ranker
 *
 * Re-ranks JioSaavn search results to consistently return
 * original tracks above covers, karaoke, and recreations.
 *
 * Problem: JioSaavn's default search order frequently puts
 * cover/recreated versions above originals.
 *
 * Solution: Score each song on 6 factors and re-sort.
 */

interface RankableSong {
  name: string
  playCount?: number | null
  language?: string
  artists?: {
    primary?: Array<{ name: string }>
  }
}

/**
 * Main function — pass in raw search results, get back re-ranked results.
 * Drop-in: same array in, same array out, better order.
 */
export function rankSearchResults<T extends RankableSong>(songs: T[], query: string, preferredLang?: string): T[] {
  if (!songs || songs.length === 0) return []

  const q = query.trim().toLowerCase()

  const scored = songs.map((song) => ({ song, score: computeScore(song, q, preferredLang) }))
  scored.sort((a, b) => b.score - a.score)

  return scored.map(({ song }) => song)
}

function computeScore(song: RankableSong, query: string, preferredLang?: string): number {
  const title = (song.name || '').toLowerCase().trim()
  const primaryArtists = (song.artists?.primary ?? []).map((a) => a.name).join(', ')
  const artist = primaryArtists.toLowerCase().trim()
  const lang = (song.language || '').toLowerCase().trim()
  const plays = song.playCount ?? 0

  let score = 0
  score += popularityScore(plays) // 0 to +80 pts
  score += coverPenalty(title) // -100 to 0 pts
  score += titleMatchScore(title, query) // 0 to +60 pts
  score += artistMatchScore(artist, query) // 0 to +25 pts
  score += originalBonus(title) // 0 to +20 pts
  score += languageScore(lang, preferredLang) // 0 to +15 pts
  return score
}

// ── Factor 1: Popularity ──────────────────────────────────────────
// Originals have millions of plays. Covers rarely do.
function popularityScore(playCount: number): number {
  if (playCount >= 500_000_000) return 80
  if (playCount >= 100_000_000) return 72
  if (playCount >= 50_000_000) return 64
  if (playCount >= 10_000_000) return 56
  if (playCount >= 5_000_000) return 48
  if (playCount >= 1_000_000) return 38
  if (playCount >= 500_000) return 28
  if (playCount >= 100_000) return 18
  if (playCount >= 10_000) return 8
  if (playCount >= 1_000) return 2
  if (playCount > 0) return -10 // very low = likely obscure/fake
  return 0
}

// ── Factor 2: Cover / Fake Detection ─────────────────────────────
// Hard keywords = definitely not original → -100
// Soft keywords = probably not original → -30
function coverPenalty(title: string): number {
  const HARD = [
    'cover',
    'recreation',
    'recreated',
    'remake',
    'tribute',
    'karaoke',
    'fan made',
    'fan-made',
    'unofficial',
    'piano cover',
    'guitar cover',
    'cover version',
    'recreated version',
    'instrumental version'
  ]
  for (const kw of HARD) {
    if (title.includes(kw)) return -100
  }

  const SOFT = ['lofi', 'slowed', 'reverb', '8d audio', 'nightcore', 'sped up', 'bass boosted', 'mashup']
  for (const kw of SOFT) {
    if (title.includes(kw)) return -30
  }

  return 0
}

// ── Factor 3: Title Match ─────────────────────────────────────────
function titleMatchScore(title: string, query: string): number {
  // Strip common noise like "(Official Music Video)"
  const clean = title
    .replaceAll(/\(official.*?\)/gi, '')
    .replace(/official.*$/i, '')
    .trim()

  if (clean === query) return 60 // exact match
  if (clean.startsWith(query)) return 50 // starts with
  if (clean.includes(query)) return 40 // contains

  // Word-level matching
  const qWords = query.split(/\s+/).filter((w) => w.length > 1)
  const matched = qWords.filter((w) => clean.includes(w))
  const ratio = qWords.length > 0 ? matched.length / qWords.length : 0

  if (ratio >= 1) return 30
  if (ratio >= 0.75) return 20
  if (ratio >= 0.5) return 10
  if (ratio >= 0.25) return 3
  return 0
}

// ── Factor 4: Artist Match ────────────────────────────────────────
function artistMatchScore(artist: string, query: string): number {
  if (!artist) return 0
  const first = artist.split(',')[0].trim()
  if (query.includes(first)) return 25
  if (artist.split(',').some((a) => query.includes(a.trim()))) return 15
  const words = artist.split(/[\s,]+/).filter((w) => w.length > 2)
  return words.filter((w) => query.includes(w)).length * 8
}

// ── Factor 5: Official / Original Markers ────────────────────────
function originalBonus(title: string): number {
  if (title.includes('official music video')) return 20
  if (title.includes('official video')) return 20
  if (title.includes('official audio')) return 15
  if (title.includes('official')) return 10
  if (title.includes('original')) return 8
  return 0
}

// ── Factor 6: Language Preference ────────────────────────────────
function languageScore(songLang: string, preferredLang?: string): number {
  if (!preferredLang || !songLang) return 0
  if (songLang === preferredLang) return 15
  if (songLang === 'english') return 5
  return 0
}

/**
 * Deduplication — removes near-duplicate songs
 * (e.g. "Shape of You" and "Shape of You (Official Audio)" by same artist)
 * Keeps the version with higher play count.
 */
export function deduplicateResults<T extends RankableSong>(songs: T[]): T[] {
  const seen = new Map<string, T>()

  for (const song of songs) {
    const titleKey = song.name
      .toLowerCase()
      .replaceAll(/\(.*?\)/g, '')
      .replace(/official.*$/i, '')
      .trim()

    const artistKey = (song.artists?.primary?.[0]?.name ?? '').toLowerCase().trim()

    const key = `${titleKey}::${artistKey}`
    const existing = seen.get(key)

    const newPlays = song.playCount ?? 0
    const existingPlays = existing?.playCount ?? 0

    if (!existing || newPlays > existingPlays) {
      seen.set(key, song)
    }
  }

  return Array.from(seen.values())
}
