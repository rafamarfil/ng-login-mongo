import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  exports: [],
  declarations: [...DashboardRoutingModule.components],
  providers: [],
})
export class DashboardModule {}
