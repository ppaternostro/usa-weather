import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressComponent } from './component/address/address.component';
import { HeaderComponent } from './component/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddressComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
