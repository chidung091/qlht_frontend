import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getGrantedPolicy } from '../../../core/auth/_selectors/config.selectors';
import { AppState } from '../../../core/reducers';

@Directive({
  selector: '[ktPermission]',
})
export class PermissionDirective implements OnInit, OnDestroy, OnChanges {

  subscription: Subscription;

  @Input('ktPermission') condition: string;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private store: Store<AppState>
  ) {}


  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private check() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.store.select(getGrantedPolicy(this.condition)).subscribe(isGranted => {
      if (this.templateRef && isGranted) {
        this.vcRef.clear();
        this.vcRef.createEmbeddedView(this.templateRef);
      } else if (this.templateRef && !isGranted) {
        this.vcRef.clear();
      } else if (!isGranted && !this.templateRef) {
        this.renderer.removeChild(
          (this.elRef.nativeElement as HTMLElement).parentElement,
          this.elRef.nativeElement,
        );
      }
    })
  }

  ngOnInit() {
    if (this.templateRef && !this.condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  ngOnChanges({ condition }: SimpleChanges) {
    if ((condition || { currentValue: null }).currentValue) {
      this.check();
    }
  }
}
