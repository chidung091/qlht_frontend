import { Component, OnInit } from '@angular/core';
import {sampleProducts} from './products';

interface ColumnSetting {
  field: string;
  title: string;
  format?: string;
  type: 'text' | 'numeric' | 'boolean' | 'date';
}

@Component({
  selector: 'kt-ministry',
  templateUrl: './ministry.component.html',
  styleUrls: ['./ministry.component.scss']
})
export class MinistryComponent implements OnInit {

  public gridData: any[] = sampleProducts;

  public columns: ColumnSetting[] = [
    {
      field: 'ProductName',
      title: 'Product Name',
      type: 'text'
    },
    {
      field: 'UnitPrice',
      format: '{0:c}',
      title: 'Unit Price',
      type: 'numeric'
    },
    {
      field: 'FirstOrderedOn',
      format: '{0:d}',
      title: 'First Ordered',
      type: 'date'
    },
    {
      field: 'FirstOrderedOn',
      format: '{0:d}',
      title: 'First Ordered',
      type: 'date'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }


  checkAllGVCN(event, dataItem) {
    console.log('event',event,'dataItem',dataItem);
  }

  checkColum(event,column,data) {
    const x = event.target.checked;
    console.log('event',x,'column',column,'dataitem',data);
  }
}
