import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HonourAchivementService } from '../../honour-achivement-sevice/honour-achivement.service';

@Component({
  selector: 'kt-delete-collective-competition',
  templateUrl: './delete-collective-competition.component.html',
  styleUrls: ['./delete-collective-competition.component.scss']
})
export class DeleteCollectiveCompetitionComponent implements OnInit {

  listIds: string[] = [];
  isDisabled: boolean = false;
  loading: boolean = false;

  @ViewChild('focus') focus : ElementRef

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private api: HonourAchivementService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  ngOnInit(): void {
  }

  close() {
    this._NgbActiveModal.close()
  }

  onSubmit() {
    this.loading = true;
    this.isDisabled = true;
    this.api.deleteS(this.listIds).subscribe(() => {
      this._NgbActiveModal.close('ok');
      this.toastr.success('Xóa thành công.');
      this.loading = false;
      this.isDisabled = false;
    }, error => {
      this.loading = false;
      this.isDisabled = false;
    })
  }

}
