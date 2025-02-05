import { Component } from '@angular/core';

@Component({
  selector: 'app-mycars', // Додаємо селектор для компонента
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.scss'],
  standalone: false
})
export class MycarsComponent {
  isMenuOpen = false; // Додаємо змінну для керування станом меню

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Функція для перемикання меню
  }
}
