export {};

declare global {
  interface Window {
    onSpotifyIframeApiReady: any;
  }
}

// window.onSpotifyWebPlaybackSDKReady = window.onSpotifyWebPlaybackSDKReady || {};
