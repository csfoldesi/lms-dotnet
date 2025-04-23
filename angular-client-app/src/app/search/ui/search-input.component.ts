import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lms-search-input',
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="absolute p-1">
      <input
        class="w-full md:w-[400px] pl-9 py-2 rounded-full 
          bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 
          focus:ring-slate-200 text-sm placeholder-gray-400"
        placeholder="Search for a course"
        [formControl]="searchFormControl()"
      />
      <mat-icon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >search</mat-icon
      >
    </div>
  `,
  styles: ``,
})
export class SearchInputComponent {
  searchFormControl = input.required<FormControl>();
}
