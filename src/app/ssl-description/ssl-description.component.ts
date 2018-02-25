import {AfterViewChecked, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-ssl-description',
  templateUrl: './ssl-description.component.html',
  styleUrls: ['./ssl-description.component.css']
})

export class SslDescriptionComponent implements AfterViewChecked{
  @ViewChild('SSLDescription') modal: ElementRef;

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

  ngAfterViewChecked() {
    this.getCoords(this.modal.nativeElement);
    this.addClass(this.modal.nativeElement);
  }

  getCoords(modal: HTMLDivElement) {
    const modalBottomPosition = this.properties.coords.bottom + modal.offsetHeight;

    this.isTopPosition = (modalBottomPosition > window.innerHeight);
    let offset = (this.isTopPosition) ? -(modal.offsetHeight + 35) : 15;

    let modalPosition = window.pageYOffset + this.properties.coords.bottom + offset;
    if (this.isTopPosition) {
      modalPosition += modal.offsetHeight;
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

    modal.style.position = position;
    modal.style.top = top;
    modal.style.bottom = bottom;
    modal.style.left = left;
  }

  prepareData() {
    const regEx = new RegExp(/<div>__localname__<\/div>/, 'ig');
    return this.properties.description.replace(regEx, '');
  }

  addClass(modal: HTMLDivElement) {
    const newClass = (this.isTopPosition) ? 'ssl-description--top' : 'ssl-description--bottom';
    modal.className = `ssl-description ${newClass}`;
  }
}