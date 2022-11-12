import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { loadRemoteModule } from '@angular-architects/module-federation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('placeHolder', { read: ViewContainerRef, static: true }) viewContainer!: ViewContainerRef;

  title = 'host';
  private _mobileQueryListener!: () => void;
  mobileQuery!: MediaQueryList;

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  opened(){
    return this.mobileQuery.matches ? '' : 'opened';
  }

  async onStats() {
    this.viewContainer.clear();
    const Comp = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/statsRemoteEntry.js',
      exposedModule: './Component',
    });
    this.viewContainer.createComponent(Comp.Component);
  }
}
