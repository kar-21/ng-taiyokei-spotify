import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-embedded-player',
  templateUrl: './embedded-player.component.html',
  styleUrls: ['./embedded-player.component.scss'],
})
export class EmbeddedPlayerComponent {
  trackUri = '';
  embedController: any = ''
  @Input() set setTrackUri(trackUri: string) {
    this.trackUri = trackUri;
    this.embedController?.loadUri(trackUri)
  }

  constructor() {
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      let element = document.getElementById('embed-iframe');
      console.log('>>>>>> element', element);
      let options = {
        uri: 'spotify:episode:6I3ZzCxRhRkNqnQNo8AZPV',
      };
      let callback = (EmbedController: any) => {
        this.embedController = EmbedController;
      };
      IFrameAPI.createController(element, options, callback);
    };
  }
}
