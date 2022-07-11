import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../../core/guards/auth.guards';

@NgModule({
  imports: [AuthRoutingModule, SharedModule],
  exports: [],
  declarations: [...AuthRoutingModule.components],
  providers: [AuthGuard],
})
export class AuthModule {}
