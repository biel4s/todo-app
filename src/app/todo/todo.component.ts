import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export interface ItemsModel {
  task: string;
  isEditing: boolean;
}

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
  @ViewChild('editInputField') editInputField: ElementRef | undefined;

  todoForm: FormGroup;
  items: ItemsModel[] = [
    { task: 'Study', isEditing: false },
    { task: 'Eat', isEditing: false },
    { task: 'Gym', isEditing: false },
  ];

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      task: [''],
    });
  }

  addItem(): void {
    const value = this.todoForm.get('task')?.value;
    if (value.trim() !== '') {
      this.items = [...this.items, {task: value, isEditing: false}]
      this.todoForm.reset();
    }
  }

  editItem(index: number): void {
    this.items.forEach((item: ItemsModel, i: number): void => {
      if (i !== index) {
        item.isEditing = false;
      }
    })

    this.items[index].isEditing = !this.items[index].isEditing;
    setTimeout((): void => {
      this.editInputField?.nativeElement.focus();
    }, 0);
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }
}
