import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressComponent } from './component/address/address.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddressComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
