export const dexterUrl = 'https://naka.cx/player?id=926&title=Dexter%3A+Resurrection&type=tv&poster=%2FteZOzBZhugzh7UfW6xuPp4wJ5oU.jpg&season=2&episode=3&backdrop=%2F8J0SjKToFBbg8dKpocVOCsrC77C.jpg';

export const categories = { anime: 'Animé', movie: 'Film', series: 'Série' };

export const selection = [
  { id: 'naka-926', type: 'series', title: 'Dexter: Resurrection', meta: 'S02 · E03', source: 'Naka.cx', image: './art/dexter.jpg', href: dexterUrl, mode: 'player', aliases: 'dexter resurrection résurrection' },
  { id: 'nakanime-3486', type: 'anime', title: 'Uncle’s Obsession with Cute Things', meta: 'S01 · E08', source: 'Nakanime', image: './art/uncle.jpg', href: 'https://nakanime.tv/anime/3486/season/1/episode/8', mode: 'player', aliases: 'oji kawaii cute things' },
  { id: 'tmdb-603', type: 'movie', title: 'Matrix', meta: '1999', source: 'TMDB', image: './art/matrix.jpg', href: 'https://www.themoviedb.org/movie/603-the-matrix', mode: 'reference', aliases: 'the matrix' },
  { id: 'nakanime-1002', type: 'anime', title: 'Naruto Shippuden', meta: 'S01 · E324', source: 'Nakanime', image: './art/naruto.webp', href: 'https://nakanime.tv/anime/1002/season/1/episode/324', mode: 'player', aliases: 'naruto shippuuden shippūden' },
];

export function normalize(value) {
  return String(value ?? '').normalize('NFD').replace(/\\p{M}/gu, '').toLowerCase()
    .replace(/[^\\p{L}\\p{N}]+/gu, ' ').trim();
}

export const safeHosts = new Set(['naka.cx', 'nakanime.tv', 'anilist.co', 'www.tvmaze.com', 'tvmaze.com', 'anilist.co', 'fr.wikipedia.org', 'en.wikipedia.org', 'www.themoviedb.org']);
export function safeLink(value) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password && !url.port && safeHosts.has(url.hostname)) return url.href;
  } catch {}
  return null;
}
