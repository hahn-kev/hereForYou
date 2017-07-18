import { Directive, ElementRef, OnInit, NgZone } from '@angular/core';
import { NgModel } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Directive({
  selector: '[appMapsAutocomplete]'
})
export class MapsAutocompleteDirective implements OnInit {
  private autoComplete: google.maps.places.Autocomplete
  constructor(private element: ElementRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ngModel?: NgModel) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.autoComplete = new google.maps.places.Autocomplete(
        this.element.nativeElement,
        { types: [] }
      );
      if (this.ngModel) {
        this.autoComplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place = this.autoComplete.getPlace();
            this.ngModel.viewToModelUpdate(this.element.nativeElement.value);
          });

        });
      }
    });
  }

}
