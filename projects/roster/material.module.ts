import {NgModule} from '@angular/core';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {OverlayModule} from '@angular/cdk/overlay';
import {DialogModule} from '@angular/cdk/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    DialogModule,
  ]
})
export class MaterialExampleModule {}
