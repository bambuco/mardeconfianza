import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Generated class for the RepeatDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[repeat]' // Attribute selector
})
export class RepeatDirective {

  @Input('repeat') set count(c:number) {
    this.viewContainer.clear();
    const last = c-1;
    for(var i=0;i<c;i++) {
      const even = i % 2 == 0;
      this.viewContainer.createEmbeddedView(this.templateRef, {
        index: i,
        last: last==i,
        first: i == 0,
        even: even,
        odd: !even
      });
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
  }

}