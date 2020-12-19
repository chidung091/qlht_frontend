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
import { getRoles } from 'src/app/core/auth/_selectors/config.selectors';
import { AppState } from 'src/app/core/reducers';

@Directive({
  selector: '[ktHasRole]',
})
export class HasRoleDirective implements OnInit, OnDestroy, OnChanges {
  subscription: Subscription;

  @Input('ktHasRole') condition: string;

  isVisible = false;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private store: Store<AppState>
  ) {}

  ngOnChanges({ condition }: SimpleChanges): void {
    if ((condition || { currentValue: null }).currentValue) {
      this.check();
    }
  }

  ngOnInit() {
    if (this.templateRef && !this.condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  private check() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.store
      .select(getRoles(this.condition))
      .subscribe((isRole) => {
        if (this.templateRef && isRole) {
          this.vcRef.clear();
          this.vcRef.createEmbeddedView(this.templateRef);
        } else if (this.templateRef && !isRole) {
          this.vcRef.clear();
        } else if (!isRole && !this.templateRef) {
          this.renderer.removeChild(
            (this.elRef.nativeElement as HTMLElement).parentElement,
            this.elRef.nativeElement
          );
        }
      });
  }

  ngOnDestroy() {if (this.subscription) this.subscription.unsubscribe();}
}
