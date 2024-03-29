import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  todoForm: FormGroup;
  items: string[] = ['study', 'eat', 'gym'];

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      task: [''],
    });
  }

  //readonly status = ['to do', 'in progress', 'done'];

  addItem(): void {
    const value = this.todoForm.get('task')?.value;
    if (value.trim() !== '') {
      this.items.push(value);
      this.todoForm.reset();
    }
  }

  editItem(index: number): void {}

  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }
}
