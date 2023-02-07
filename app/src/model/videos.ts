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
  title: "Get Started with Google Dev Library and Hear from the Authors",
  videoId: "XrIuuJ6YFzY?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
};

const PROMO_VIDEO_PLAYLIST: PromoVideoId[] = [
  {
    title: "Meet Dev Library Google Cloud Author : Natalie Godec",
    videoId: "YjKgg_aqHUw?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title: "Meet Dev Library Angular Author : Shai Reznik",
    videoId: "XnemWL1Ru6k?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title: "Meet Dev Library Flutter Author : Anna (Domashych) Leushchenko",
    videoId: "6nls0arzRrk?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title: "Meet Dev Library ML Author: Doug Duhaime",
    videoId: "JfekADinZ1U?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title: "Meet Dev Library ML Author:Shweta Bhatt",
    videoId: "qzd8KyyzfeI?list=PLOU2XLYxmsIJ590o0oAKUBJTrhAp6A2eJ",
  },
  {
    title: "Meet Dev Library Angular Author : Vanessa Aristizabal",
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
