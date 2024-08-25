import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ng-mf-home-entry',
  template: `<div><h1>Angular</h1></div>`,
})
export class RemoteEntryComponent {}
