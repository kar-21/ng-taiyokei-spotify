import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-embedded-player',
  templateUrl: './embedded-player.component.html',
  styleUrls: ['./embedded-player.component.scss'],
})
export class EmbeddedPlayerComponent {
  trackUri = '';
  embedController: any = '';
  routePath = '';
  @Input() set setTrackUri(trackUri: string) {
    this.trackUri = trackUri;
    this.embedController?.loadUri(trackUri);
    this.embedController?.play();
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routePath = event.url;
      }
    });
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      let element = document.getElementById('embed-iframe');
      let options = {
        uri: 'spotify:episode:6I3ZzCxRhRkNqnQNo8AZPV',
        height: '80',
      };
      let callback = (EmbedController: any) => {
        this.embedController = EmbedController;
      };
      IFrameAPI.createController(element, options, callback);
    };
  }
}
