import { DetailCommentBookComponent } from './detail-comment-book/detail-comment-book.component';
import { Routes, RouterModule } from '@angular/router';
import { CommentBookComponent } from './comment-book.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { PopupModule } from '@progress/kendo-angular-popup';
//import { IconsModule } from '@progress/kendo-angular-icons';


// @ts-ignore
const StudentCommentBookRoutes : Routes = [
  {
    path:'',
    component: CommentBookComponent,
    children: [
      {
        path:'detail-comment-book/:id',
        component: DetailCommentBookComponent
      },
      {
        path: 'detail-comment-book',
        component: DetailCommentBookComponent
      },
      {
        path: '', redirectTo: 'detail-comment-book', pathMatch: 'full'
      }
    ]
  }
];

// @ts-ignore
@NgModule({
  declarations: [
   CommentBookComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    GridModule,
    DateInputsModule,
    PartialsModule,
    InputsModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    DropDownsModule,
    TooltipModule,
    NgbTooltipModule,
    TreeViewModule,
    PopupModule,
    //IconsModule
    [RouterModule.forChild(StudentCommentBookRoutes)]
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CommentBookModule { }
