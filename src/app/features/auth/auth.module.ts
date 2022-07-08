import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  imports: [AuthRoutingModule],
  exports: [],
  declarations: [...AuthRoutingModule.components],
  providers: [],
})
export class AuthModule {}
