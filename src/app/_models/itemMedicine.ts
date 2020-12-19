import {Medicine} from './medicine';

export class ItemMedicine {
  Page?: string
  Totalpages? : number
  Medicine: Medicine[];
  message?: string
  success?: boolean
}
