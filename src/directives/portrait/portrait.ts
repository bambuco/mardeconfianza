import { Directive, HostListener } from '@angular/core';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the PortraitDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[portrait]', // Attribute selector
  host: {
  	"[style.width.px]": "width",
  	"[style.margin-left.px]": "marginLeft",
  	"[style.left.%]": "50"
  }
})
export class PortraitDirective {

	width: number;
	marginLeft: number;

  constructor(
		private platform: Platform
	) {
  }

  ngOnInit() {
  	this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize($event=null) {
    setTimeout(() => {
      const height = this.platform.height();
      const width = Math.min(this.platform.width(), height);
      const marginLeft = -1*width/2;
      this.width = width;
      this.marginLeft = marginLeft;
    }, 100);
    return true;
  }


}
