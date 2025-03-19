// icon.service.ts
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})




export class IconService {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.registerIcons();
  }
  private iconsArray = ["grid", "basket", "news", "chart", "image"]

  private registerIcons(): void {
    this.iconsArray.forEach(icon => {
      this.iconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`)
      );
    });
  }
}
