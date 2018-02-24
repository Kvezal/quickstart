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
      top: -9999,
      bottom: -9999,
      left: -9999
    }
  };

  currentElement: any = null;
  currentSsl: any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getPriceList().subscribe(d => {
      this.pricelist = d.pricelist;
    });
    setInterval(() => {
      this.getProperties();
    }, 100);
  }

  linkClickHandler(event: any) {
    this.currentElement = (event.target !== this.currentElement) ? event.target : null;
    if (this.currentElement) {
      this.currentSsl = this.pricelist.find((item: any) => item.id === this.currentElement.id);
    }
    this.getProperties();
  }

  getProperties() {
    let coords = {
      top: -9999,
      bottom: -9999,
      left: -9999
    };

    if (!!this.currentElement) {
      const elementCoords = this.currentElement.getBoundingClientRect();
      coords = {
        top: elementCoords.top,
        bottom: elementCoords.bottom,
        left: elementCoords.left
      };
    }

    this.properties = {
      description: this.currentSsl.description_ru || this.currentSsl.description || '',
      isOpenDescription: !!this.currentElement,
      coords
    };
  }
}
