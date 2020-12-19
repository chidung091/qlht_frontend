import {NgModule} from '@angular/core';
import {ViolationComponent} from './violation/violation.component';
import {RouterModule, Routes} from '@angular/router';
import {ViolationModule} from './violation/violation.module';
import {PraiseDisciplineModule} from './prais-discipline/praise-discipline.module';
import {ExperienceTypeComponent} from './experience-type/experience-type.component';
import {ExpWorkComponent} from './exp-work/exp-work.component';
import {ExamViolationTypeComponent} from './exam-violation-type/exam-violation-type.component';
import {EmulationCriteriaComponent} from './emulation-criteria/emulation-criteria.component';
import {RewardFinalComponent} from './reward-final/reward-final.component';
import {FaultCriteriaComponent} from './fault-criteria/fault-criteria.component';
import {FaultCriteriaModule} from './fault-criteria/fault-criteria.module';
import {ConcurrentWorkTypeComponent} from './concurrent-work-type/concurrent-work-type.component';
import {ConcurrentWorkTypeModule} from './concurrent-work-type/concurrent-work-type.module';
import {NgxsModule} from '@ngxs/store';
import {ExperienceTypeState} from '../../../core/service/states/experience-type.state';
import {RewardFinalState} from '../../../core/service/states/reward-final.state';
import {EmulationCriteriaState} from '../../../core/service/states/emulation-criteria.state';
import {ExamViolationTypeState} from '../../../core/service/states/exam-violation-type.state';
import {ConcurrentWorkTypeState} from '../../../core/service/states/concurrent-work-type.state';
import {FaultCriteriaState} from '../../../core/service/states/fault-criteria.state';
import {PraiseDisciplineTypeState} from '../../../core/service/states/praise-discipline-type.state';
import {SearchModule} from './search/search.module';
import {ExpWorkModule} from './exp-work/exp-work.module';
import {ExperienceTypeModule} from './experience-type/experience-type.module';
import {RewardFinalModule} from './reward-final/reward-final.module';
import {ExamViolationTypeModule} from "./exam-violation-type/exam-violation-type.module";
import {EmulationCriteriaModule} from "./emulation-criteria/emulation-criteria.module";

const routes: Routes = [
  {
    path: 'violation',
    component: ViolationComponent
  },
  {
    path: 'praise-discipline',
    loadChildren: () => import('./prais-discipline/praise-discipline.module').then(m => m.PraiseDisciplineModule),
  },
  {
    path: 'experience-type',
    component: ExperienceTypeComponent
  },
  {
    path: 'exp-work',
    component: ExpWorkComponent
  },
  {
    path: 'exam-violation-type',
    component: ExamViolationTypeComponent
  },
  {
    path: 'emulation-criteria',
    component: EmulationCriteriaComponent
  },
  {
    path: 'reward-final',
    component: RewardFinalComponent
  },
  {
    path: 'fault-criteria',
    component: FaultCriteriaComponent
  },
  {
    path: 'concurrent-work-type',
    component: ConcurrentWorkTypeComponent
  }
]

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    RouterModule.forChild(routes),
    ViolationModule,
    PraiseDisciplineModule,
    FaultCriteriaModule,
    ConcurrentWorkTypeModule,
    NgxsModule.forFeature([
      ExperienceTypeState,
      RewardFinalState,
      EmulationCriteriaState,
      ExamViolationTypeState,
      ConcurrentWorkTypeState,
      FaultCriteriaState,
      PraiseDisciplineTypeState
    ]),
    SearchModule,
    ExpWorkModule,
    ExperienceTypeModule,
    RewardFinalModule,
    ExamViolationTypeModule,
    EmulationCriteriaModule,
  ]
})
export class CategoriesModule {
}
