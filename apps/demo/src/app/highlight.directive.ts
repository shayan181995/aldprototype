import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[demoHighlight]',
})
export class HighlightDirective {
  @Input() demoHighlight = '';

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  //Handling user events

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight('yellow');
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight('');
  // }

  // private highlight(color: string) {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }

  //Passing variables
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.demoHighlight || 'red');
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
