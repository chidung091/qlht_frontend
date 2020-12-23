import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BillService} from "../../_services/bill.service";
import {GridDataResult} from "@progress/kendo-angular-grid";
import {SanPham} from "../../_models/bill";

@Component({
  selector: 'kt-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  dataDetail:SanPham[];
  @Input() selectedItem: any;
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public _NgbActiveModal: NgbActiveModal,
              private billService: BillService,
             ) {
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.close('thanh cong');
  }

  onSubmit() {
    this.loadingDelete.next(true);
    this.billService.getDetailProduct(this.selectedItem._id).subscribe(data => {
      this.dataDetail = data.Billinfodetail
      // this.dataDetail = ({
      //   data : data.Billinfodetail
      // })
      console.log(data)
      console.log(data.Userinfor)
      this.isLoading$.next(true);
      this.loadingDelete.next(false);
    }, error => this.loadingDelete.next(false))
  }

}
