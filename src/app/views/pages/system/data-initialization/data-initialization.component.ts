import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SmasContextService } from '../../../../core/_base/layout';
@Component({
  selector: 'kt-data-initialization',
  templateUrl: './data-initialization.component.html',
  styleUrls: ['./data-initialization.component.scss'],
})
export class DataInitializationComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  itemTitle = 'Để bắt đầu sử dụng phần mềm, hãy cập nhật các dữ liệu dưới đây';
  gridData = [
    {
      title: 'Dữ liệu cán bộ, giáo viên (Hiện có 42 giáo viên)',
      icon: 'k-icon k-i-user k-icon-32',
      edit: '',
    },
    {
      title: 'Dữ liệu tổ bộ môn',
      icon: 'fas fa-users',
      edit: '/system/department',
    },
    {
      title: 'Dữ liệu danh sách lớp học của trường (Hiện có 18 lớp học)',
      icon: 'fas fa-clipboard-list pr-2',
      edit: '/system/class-room',
    },
    {
      title: 'Dữ liệu học sinh toàn trường',
      icon: 'fas fa-child pr-2',
      edit: '',
    },
    {
      title: 'Dữ liệu danh sách môn học của lớp',
      icon: 'fas fa-book pr-1',
      edit: '/system/subject',
    },
  ];
  public alignment = 'justify';
  selectedTab = 0;
  public opened = false;
  currentInput = null;

  constructor(private router: Router, private smasContext: SmasContextService) {}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.checkStep();
  }

  onButtonClick() {
    alert('edit');
  }

  public onTabSelect(e) {
    if (e.index === 0) {
      this.router.navigate(['/system/data-initialization']);
    } else if (e.index === 1) {
      this.router.navigate(['/system/data-initialization/step2']);
    } else if (e.index === 2) {
      this.router.navigate(['/system/data-initialization/step3']);
    }
    this.selectedTab = e.index;
  }

  openApproachTab1() {
    this.router.navigate(['/system/data-initialization/step2']);
    this.selectedTab = 1;
  }

  openApproachTab2() {
    this.router.navigate(['/system/data-initialization/step3']);
    this.selectedTab = 2;
  }

  public open() {
    this.opened = true;
  }

  public close(status: string) {
    this.opened = false;
    this.currentInput = null;
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.currentInput = event.target.files[0].name;
    }
  }

  checkStep() {
    if (this.router.url === '/system/data-initialization') {
      this.selectedTab = 0;
    } else if (this.router.url === '/system/data-initialization/step2') {
      this.selectedTab = 1;
    } else if (this.router.url === '/system/data-initialization/step3') {
      this.selectedTab = 2;
    }
  }
}
