import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  isOpen = signal<boolean>(false);

  setIsOpen(value: boolean) {
    this.isOpen.set(value);
  }


}
