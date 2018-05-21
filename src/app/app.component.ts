import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {}

  isActive(strUrl: string) {
    if (!strUrl || strUrl === '/') {
      return !this._router.url || this._router.url === '/';
    } else {
      return this._router.url.indexOf(strUrl) === 0;
    }
  }
}
