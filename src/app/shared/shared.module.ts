import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { NotFoundComponent } from './pages/not-found/not-found.component';

const DIRECTIVES = [];
const PAGES = [NotFoundComponent];
const PIPES = [];
const UICOMPONENTS = [];

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, ...PAGES],
  declarations: [...PAGES],
  providers: [],
})
export class SharedModule {}
