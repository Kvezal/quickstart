import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit  {
  pricelist: any;

  properties: {
    description: string,
    isOpenDescription: boolean,
    coords: {
      top: number,
      bottom: number,
      left: number
    }
  } = {
    description: '',
    isOpenDescription: false,
    coords: {
      top: 0,
      bottom: 0,
      left: 0
    }
  };

  currentElement: any = null;
  currentSsl: any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getPriceList().subscribe(d => {
      this.pricelist = d.pricelist;
    });

    window.addEventListener('scroll', (event) => this.getProperties());
    window.addEventListener('resize', (event) => this.getProperties());
  }

  linkClickHandler(event: any) {
    this.currentElement = (event.target !== this.currentElement) ? event.target : null;
    if (this.currentElement) {
      this.currentSsl = this.pricelist.find((item: any) => item.id === this.currentElement.id);
    }
    this.getProperties();
  }

  getProperties() {
    if (!this.currentElement) {
      this.properties.isOpenDescription = false;
      return;
    }

    const elementCoords = this.currentElement.getBoundingClientRect();

    this.properties = {
      description: this.currentSsl.description_ru || this.currentSsl.description || '',
      isOpenDescription: !!this.currentElement,
      coords: {
        top: elementCoords.top,
        bottom: elementCoords.bottom,
        left: elementCoords.left
      }
    };
  }
}
