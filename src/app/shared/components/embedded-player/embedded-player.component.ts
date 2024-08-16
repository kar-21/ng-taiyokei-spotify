import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-embedded-player',
  templateUrl: './embedded-player.component.html',
  styleUrls: ['./embedded-player.component.scss'],
})
export class EmbeddedPlayerComponent {
  trackUri: SafeUrl = '';
  embedController: any = '';
  routePath = '';
  token = '';
  loading = true;
  @Input() set setTrackUri(trackUri: string) {
    this.trackUri = this.domSanitizer.bypassSecurityTrustResourceUrl(trackUri);
    this.embedController?.loadUri && this.embedController.loadUri(trackUri);
    this.embedController?.play && this.embedController?.play();
  }

  constructor(
    private router: Router,
    private domSanitizer: DomSanitizer
  ) {
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
        const iframeElement = document.querySelector('iframe');
        iframeElement?.setAttribute(
          'allow',
          'autoplay; clipboard-write; encrypted-media *; fullscreen; picture-in-picture'
        );
        this.embedController = EmbedController;
        EmbedController.addListener('ready', () => {
          this.loading = false;
        });
      };
      IFrameAPI.createController(element, options, callback);
    };
  }
}
