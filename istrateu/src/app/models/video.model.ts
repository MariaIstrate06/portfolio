export type VideoPlatform = 'youtube' | 'tiktok' | 'instagram' | 'youtube-shorts';

export interface Video {
  title: string;
  role: string;
  platform: VideoPlatform;
  url: string;
  orientation: 'wide' | 'vertical';
  /** Custom thumbnail override — needed for platforms without a predictable thumbnail URL (TikTok/Instagram). */
  thumb?: string;
}
