import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  countriesByRegion: SmallCountry[] = [];
  bordersByCountry: SmallCountry[] = [];
  onRegionChangeListener: AbstractControl | null = null;

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }

  get regions(): Region[] {
    return this.countryService.regions;
  }

  private onRegionChange(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => (this.bordersByCountry = [])),
        switchMap((region) => this.countryService.getCountryByRegion(region))
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries;
      });
  }

  private onCountryChange(): void {
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),

        filter((value: string) => value.length > 0),

        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode)
        ),
        switchMap((country) =>
          this.countryService.getCountryBordersByCodes(country.borders)
        )
      )
      .subscribe((countries) => {
        this.bordersByCountry = countries;
      });
  }
}
