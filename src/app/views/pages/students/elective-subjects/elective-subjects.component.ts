import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { locale } from '../../../../core/_config/i18n/vi';
import { BehaviorSubject, of } from 'rxjs';
import { TreeItem } from '@progress/kendo-angular-treeview';

@Component({
  selector: 'kt-elective-subjects',
  templateUrl: './elective-subjects.component.html',
  styleUrls: ['./elective-subjects.component.scss']
})
export class ElectiveSubjectsComponent implements OnInit {
  @ViewChild('anchor') public anchor: ElementRef;
  @ViewChild('popup', { read: ElementRef }) public popup: ElementRef;

  VI_LANG = locale.data;
  isCollapsed = false;
  searchForm: FormGroup;
  listKhoi = [];
  listClass = [];
  gridView = [];
  defaultItem = { cateCode: null, cateName: 'Lựa chọn' };
  skip = 0;
  _pageSize = 5;
  pageSizes: Array<number> = [10, 20, 50, 100];
  show = false;
  selectedKeys = ['Chọn lớp'];
  expandedKeys: any[] = [''];

  @HostListener('document:click', ['$event'])
  public documentClick(event: any): void {
    if (!this.contains(event.target)) {
      this.show = false;
    }
  }

  public data: any[] = [
    {
      text: 'Khối 6',
      value: 6,
      items: [
        { text: 'Lớp 6A', value: '6A' },
        { text: 'Lớp 6B', value: '6B' },
        { text: 'Lớp 6C', value: '6C' }
      ]
    },
    {
      text: 'Khối 7', value: 7, items: [
        { text: 'Lớp 7E', value: '6E' },
        { text: 'Lớp 7F', value: '6F' },
        { text: 'Lớp 7G', value: '6G' }
      ]
    }
  ];

  public buildForm() {
    this.searchForm = this.fb.group({
      khoi: new FormControl('',),
      lop: new FormControl('',)
    })
  }
  constructor(private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.buildForm();
  }

  search() {

  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    // this.fetchAll();
  }


  public onToggle(): void {
    this.show = !this.show;
  }

  contains(target: any): boolean {
    return this.anchor.nativeElement.contains(target) ||
      (this.popup ? this.popup.nativeElement.contains(target) : false);
  }

  public hasChildren = (item: any) => item.items && item.items.length > 0;
  public fetchChildren = (item: any) => of(item.items);

  getValue(event) {
    this.show = false;
    console.log(event);
  }

  public handleSelection(item: any): void {
    this.show = false;
    console.log(item.dataItem)
  }
}
