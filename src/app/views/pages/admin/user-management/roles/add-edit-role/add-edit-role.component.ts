import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { Roles } from '../../../model/roles';
import { RoleService } from '../../../service-management/role.service';
import { locale } from '../../../../../../core/_config/i18n/vi';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'kt-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit, OnDestroy {
  VI_LANG = locale.data;

  rolesForm: FormGroup;
  @Input() selectedItem: any;
  submitted = false;
  loading = false;
  dsRoleChild: Roles[];

  public status = [
    { text: 'Hoạt động', value: true },
    { text: 'Không hoạt động', value: false },
  ];
  public hethong = [
    { text: 'SMAS 4.0', value: 'SMAS' }
  ];

  isDisabled: boolean = false;
  public opened = true;
  parentRoleName = '';
  defaultParentRole = { remark: 'Admin', id: null };
  @Input() title: any;
  @Input() actionType: any;
  @ViewChild("vaitrogoc") vaitrogoc: DropDownListComponent;

  constructor(
    public _NgbActiveModal: NgbActiveModal,
    private fb: FormBuilder,
    private api: RoleService,
    private notiService: NotiService
  ) {
  }

  get f() {
    return this.rolesForm.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.vaitrogoc.focus()
    }, 10)
  }

  ngOnInit(): void {
    this.loading = true;
    this.api
      .getAllParent()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(data => {
        if (this.selectedItem) {
          let dsRoleDefaut = [] as Roles[];
          dsRoleDefaut = data
          this.dsRoleChild = dsRoleDefaut.filter(x => (x.id != this.selectedItem.id));
        } else {
          this.dsRoleChild = data
        }
        console.log(this.dsRoleChild)
      }
      );

    this.rolesForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9_-]*$/)]),
      remark: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.maxLength(250)]),
      isActive: new FormControl({ value: true, disabled: true }),
      parentRoleId: new FormControl('')
    });
    if (this.selectedItem) {
      this.rolesForm.get('isActive').enable();
      this.rolesForm.get('name').setValue(this.selectedItem.name);
      this.rolesForm.get('remark').setValue(this.selectedItem.remark);
      this.rolesForm.get('description').setValue(this.selectedItem.description);
      this.rolesForm.get('isActive').setValue(this.selectedItem.isActive);
      this.rolesForm.get('parentRoleId').setValue(this.selectedItem.parentRole);
      this.parentRoleName = this.selectedItem.parentRoleName;
    }
  }

  public cancel() {
    this._NgbActiveModal.close();
  }

  public open() {
    this.opened = true;
  }

  trimSpace(formName: string) {
    if (formName) {
      this.rolesForm.get(formName).setValue(
        this.rolesForm.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  changeParentRole(r) {
    this.dsRoleChild.forEach(x => {
      if (x.id === r) {
        this.parentRoleName = x.name
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.rolesForm.invalid) {
      return;
    }
    this.isDisabled = true;
    this.loading = true;
    if (this.selectedItem) {
      let IdentityRole = {
        concurrencyStamp: this.selectedItem.concurrencyStamp,
        name: this.rolesForm.value.name,
        isDefault: true,
        isPublic: true,
        remark: this.rolesForm.value.remark,
        description: this.rolesForm.value.description,
        isActive: this.rolesForm.value.isActive,
        parentRoleId: this.rolesForm.value.parentRoleId,
        parentRoleName: this.parentRoleName,
      }
      this.api.update(this.selectedItem.id, IdentityRole).subscribe(() => {
        this.notiService.updateSuccess();
        this._NgbActiveModal.close('Thành công');
        this.loading = false;
        this.isDisabled = false;
      }, error => {
        this.loading = false;
        this.isDisabled = false;
      })
    } else {
      let IdentityRole = {
        name: this.rolesForm.value.name,
        isDefault: true,
        isPublic: true,
        remark: this.rolesForm.value.remark,
        description: this.rolesForm.value.description,
        isActive: this.rolesForm.value.isActive,
        parentRoleId: this.rolesForm.value.parentRoleId,
        parentRoleName: this.parentRoleName,
      }
      this.api.create(IdentityRole).subscribe(() => {
        this.notiService.createSuccess();
        this._NgbActiveModal.close('Thành công');
        this.loading = false;
        this.isDisabled = false;
      }, error => {
        this.loading = false;
        this.isDisabled = false;
      })
    }
  }

  ngOnDestroy(): void {
    this.loading = false;
    this.isDisabled = false;
  }
}
