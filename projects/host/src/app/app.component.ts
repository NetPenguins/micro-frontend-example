import { ApplicationRef, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, createComponent, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { loadRemoteModule } from '@angular-architects/module-federation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('stats', { read: ViewContainerRef, static: true }) statsContainer!: ViewContainerRef;
  @ViewChild('roster', { read: ViewContainerRef, static: true }) rosterContainer!: ViewContainerRef;
  
  title = 'host';
  private _mobileQueryListener!: () => void;
  mobileQuery!: MediaQueryList;
  
  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private resolver: ComponentFactoryResolver) {
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
    await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/statsRemoteEntry.js',
      exposedModule: './Component',
    }).then((stats) => {
      this.statsContainer.clear();
      const compRef = this.statsContainer.createComponent(stats.AppComponent);
    }).catch(e => console.error(e));
    
    await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './Component',
    }).then((roster) => {
      this.rosterContainer.clear();
      const rosterfactory = this.resolver.resolveComponentFactory(roster.AppComponent)
      roster = this.rosterContainer.createComponent(roster.AppComponent);
    }).catch(e => console.error(e));     
  }
}
