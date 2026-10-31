export interface TrackFiles {
  raw?: string;
  production?: string;
  mix?: string;
}

export interface Track {
  title: string;
  artist: string;
  kind: 'mine' | 'others';
  tags: string[];
  files: TrackFiles;
  spotify?: string;
}
