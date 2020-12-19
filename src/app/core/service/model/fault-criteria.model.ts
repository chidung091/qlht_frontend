import { GroupFaultCriteriaTypeModel } from './group-fault-criteria-type.model.';

export interface FaultCriteriaModel {
  id?: string;
  creationTime?: string;
  // tenNhomLoiViPham?: string;
  name?: string;
  // nhomLoiViPhamId?: string;
  minusMark?: number;
  description?: string;
  absenceFault?: number;
}
