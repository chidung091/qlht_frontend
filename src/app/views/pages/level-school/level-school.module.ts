import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelSchoolComponent } from './level-school.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { TenantService } from '../../../core/auth/_services';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [LevelSchoolComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LevelSchoolComponent,
      },
    ]),
    CommonModule,
    CoreModule,
    NgxSpinnerModule,
  ],
  providers: [TenantService],
})
export class LevelSchoolModule {}
