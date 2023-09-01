import { Component } from '@angular/core';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mood-shifter';
}

// Choose one of the following:
const sdk = SpotifyApi.withUserAuthorization("client-id", "https://localhost:3000", ["scope1", "scope2"]);
//const sdk = SpotifyApi.withClientCredentials("client-id", "secret", ["scope1", "scope2"]);