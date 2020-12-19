import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  showTooltip(e: MouseEvent, tooltipDir): void {
    const element = e.target as HTMLElement;
    if (
      (element.nodeName === 'TD' ||
        element.nodeName === 'A' ||
        element.nodeName === 'TH') &&
      element.offsetWidth < element.scrollWidth
    ) {
      tooltipDir.toggle(element);
    } else {
      tooltipDir.hide();
    }
  }
}
