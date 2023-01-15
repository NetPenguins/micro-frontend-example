import { ChangeDetectorRef, Component, ComponentFactoryResolver, HostBinding, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { getManifest, loadRemoteModule } from '@angular-architects/module-federation';
import { CustomManifest, CustomRemoteConfig } from './utils/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('stats', { read: ViewContainerRef, static: true }) statsContainer!: ViewContainerRef;
  @HostBinding('class') className = '';

  remotes: CustomRemoteConfig[] = [];
  remoteComps: any[] = [];
  title = 'host';
  private _mobileQueryListener!: () => void;
  mobileQuery!: MediaQueryList;
  
  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private resolver: ComponentFactoryResolver) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.className = this.className == '' ? 'darkMode' : 'darkMode'
  }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    const manifest = getManifest<CustomManifest>();
    this.remotes = Object.values(manifest);
  }

  toggleTheme() {
    this.className = this.className == '' ? 'darkMode' : ''
  }

  opened(){
    return this.mobileQuery.matches ? '' : 'opened';
  }

  async onStats() {
    console.debug("GRABBING REMOTES");
    console.debug(this.remotes);
    this.remoteComps.forEach(c => {
      c.destroy();
    })
    this.remotes.map(async remote => {
      //Load in remote component
      console.debug(remote)
      await loadRemoteModule({
        type: 'module',
        remoteEntry: remote.remoteEntry,
        exposedModule: remote.exposedModule,
      }).then((module) => {
        const compRef = this.statsContainer.createComponent(module[remote.ngModuleName]);
        this.remoteComps.push(compRef);
      }).catch((e) => {
        console.error(`Unable to load element: ${e}`);
        document.getElementById('statsel')?.remove();
      });
    })
  
  }
}
