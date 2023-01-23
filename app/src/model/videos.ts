interface PromoVideoId {
  title: string;
  videoId: string;
}

export interface PromoVideo {
  title: string;
  videoUrl: string;
  embedUrl: string;
}

const getEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}`;

const getVideoUrl = (videoId: string) => `https://youtu.be/${videoId}`;

const PROMO_VIDEO_MAIN: PromoVideoId = {
  title: "Introductions to some of the contributors to Google's Dev Library",
  videoId: "l2Yxy_6pOAs?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
};

const PROMO_VIDEO_PLAYLIST: PromoVideoId[] = [
  {
    title: "Interview with Natalie Godec, contributor to Google's Dev Library",
    videoId: "YjKgg_aqHUw?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title: "Interview with Shai Reznik, contributor to Google's Dev Library",
    videoId: "XnemWL1Ru6k?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title:
      "Interview with Anna (Domashych) Leushchenko, contributor to Google's Dev Library",
    videoId: "6nls0arzRrk?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title: "Interview with Doug Duhaime, contributor to Google's Dev Library",
    videoId: "JfekADinZ1U?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title: "Interview with Shweta Bhatt, contributor to Google's Dev Library",
    videoId: "qzd8KyyzfeI?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title:
      "Interview with Vanessa Aristizabal, contributor to Google's Dev Library",
    videoId: "Qd1A6JnEcuA?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
];

export const getPromoVideoMain = (): PromoVideo => ({
  title: PROMO_VIDEO_MAIN.title,
  videoUrl: getVideoUrl(PROMO_VIDEO_MAIN.videoId),
  embedUrl: getEmbedUrl(PROMO_VIDEO_MAIN.videoId),
});

export const getPromoVideoPlaylist = (): PromoVideo[] =>
  PROMO_VIDEO_PLAYLIST.map((video: PromoVideoId) => ({
    title: video.title,
    videoUrl: getVideoUrl(video.videoId),
    embedUrl: getEmbedUrl(video.videoId),
  }));