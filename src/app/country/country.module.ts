import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountryRoutingModule } from './country-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

@NgModule({
  declarations: [SelectorPageComponent],
  imports: [CommonModule, CountryRoutingModule],
})
export class CountryModule {}
