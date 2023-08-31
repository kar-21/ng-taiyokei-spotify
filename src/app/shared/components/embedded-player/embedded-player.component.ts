import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IAppState } from 'src/app/store/states/app.state';
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
  @Input() set setTrackUri(trackUri: string) {
    this.trackUri = this.domSanitizer.bypassSecurityTrustResourceUrl(trackUri);
    this.embedController?.loadUri && this.embedController.loadUri(trackUri);
    this.embedController?.play && this.embedController?.play();
  }

  constructor(private router: Router, private store: Store<IAppState>, private domSanitizer: DomSanitizer) {
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
        const iframeElement = document.querySelector('iframe');
        iframeElement?.setAttribute(
          'allow',
          'autoplay; clipboard-write; encrypted-media *; fullscreen; picture-in-picture'
        );
      };
      IFrameAPI.createController(element, options, callback);
    };
  }
}
