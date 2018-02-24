import {Component, Input, ElementRef, ViewChild} from '@angular/core';

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

  isTopPosition: boolean;

  getCoords() {
    if (!this.element) {
      return {left: '-9999px', top: '-9999px'};
    }

    // this.element.nativeElement.innerHTML = this.prepareData(this.properties.description);
    const modalBottomPosition = this.properties.coords.bottom + this.element.nativeElement.offsetHeight;

    this.isTopPosition = (modalBottomPosition > window.innerHeight);
    let offset = (this.isTopPosition) ? -(this.element.nativeElement.offsetHeight + 35) : 15;

    let modalPosition = window.pageYOffset + this.properties.coords.bottom + offset + this.element.nativeElement.offsetHeight;
    if (!this.isTopPosition) {
     modalPosition -= this.element.nativeElement.offsetHeight;
    }

    let position = 'absolute';
    let top = window.pageYOffset + this.properties.coords.bottom + offset + 'px';
    let bottom = 'auto';
    let left = this.properties.coords.left + 'px';

    if (modalPosition < pageYOffset) {
      position = 'fixed';
      top = '15px';
      bottom = 'auto';
    }
    if (modalPosition > pageYOffset + innerHeight) {
      position = 'fixed';
      top = 'auto';
      bottom = '15px';
    }

    return {
      position,
      top,
      bottom,
      left
    };
  }

  prepareData(data: string) {
    return data.replace(/<div>__localname__<\/div>|(<script[A-zА-я0-9]*>|<\/script>)*/ig, '');
  }

  addClass() {
    const newClass = (this.isTopPosition) ? 'ssl-description--top' : 'ssl-description--bottom';
    this.element.nativeElement.className = `ssl-description ${newClass}`;
  }
}