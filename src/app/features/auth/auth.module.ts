import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth.routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [AuthRoutingModule, SharedModule],
  exports: [],
  declarations: [...AuthRoutingModule.components],
  providers: [],
})
export class AuthModule {}
