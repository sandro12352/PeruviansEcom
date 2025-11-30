import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-emergente',
  templateUrl: './modal-emergente.component.html',
  styleUrl: './modal-emergente.component.css'
})
export class ModalEmergenteComponent {
    isVisible = false;
    @ViewChild('modalContent', { static: false }) modalContent?: ElementRef;

    ngOnInit(): void {
      // Mostrar el modal automáticamente al cargar
        this.isVisible = true;
    }

    closeModal() {
      this.isVisible = false;
    }

    onOverlayClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Solo cerrar si el clic fue fuera del modal
    if (this.modalContent && !this.modalContent.nativeElement.contains(target)) {
      this.closeModal();
    }
  }
    
}
