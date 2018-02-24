import {Component, Input, ElementRef, ViewChild, Output} from '@angular/core';

@Component({
  selector: 'app-ssl-description',
  templateUrl: './ssl-description.component.html',
  styleUrls: ['./ssl-description.component.css']
})

export class SslDescriptionComponent {
  @ViewChild('SSLDescription') element: ElementRef;

  @Input() properties: {
    description: string,
    isOpenDescription: boolean,
    coords: {
      top: number,
      bottom: number,
      left: number
    }
  };

  getCoords() {
    if (!this.element) {
      return {left: '-9999px', top: '-9999px'};
    }

    this.element.nativeElement.innerHTML = this.prepareData(this.properties.description);
    const modalBottomPosition = this.properties.coords.bottom + this.element.nativeElement.offsetHeight;

    let offset = 15;
    let isTopPosition = false;
    if (modalBottomPosition > window.innerHeight) {
      offset = -(this.element.nativeElement.offsetHeight + 35);
      isTopPosition = true;
    }
    this.addClass(isTopPosition);

    let modalPosition = window.pageYOffset + this.properties.coords.bottom + offset + this.element.nativeElement.offsetHeight;
    if (!isTopPosition) {
     modalPosition -= this.element.nativeElement.offsetHeight;
    }

    if (modalPosition < pageYOffset) {
      this.element.nativeElement.style.top = '15px';
      this.element.nativeElement.style.bottom = 'auto';
      this.element.nativeElement.style.left = this.properties.coords.left + 'px';
      this.element.nativeElement.style.position = 'fixed';
      return;
    }
    if (modalPosition > pageYOffset + innerHeight) {
      this.element.nativeElement.style.top =  'auto';
      this.element.nativeElement.style.bottom = '15px';
      this.element.nativeElement.style.left = this.properties.coords.left + 'px';
      this.element.nativeElement.style.position = 'fixed';
      return;
    }

    this.element.nativeElement.style.top =  window.pageYOffset + this.properties.coords.bottom + offset + 'px';
    this.element.nativeElement.style.bottom = 'auto';
    this.element.nativeElement.style.left = this.properties.coords.left + 'px';
    this.element.nativeElement.style.position = 'absolute';
  }

  addClass(state: boolean) {
    const newClass = (state) ? 'ssl-description--top' : 'ssl-description--bottom';
    this.element.nativeElement.className = `ssl-description ${newClass}`;
  }

  prepareData(data: string) {
    return data.replace(/<div>__localname__<\/div>|(<script[A-zА-я0-9]*>|<\/script>)*/ig, '');
  }
}