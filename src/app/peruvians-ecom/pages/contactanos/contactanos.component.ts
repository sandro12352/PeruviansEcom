// src/app/peruvians-ecom/components/contactanos/contactanos.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ContactService, ContactRequest, ContactResponse } from '../../services/contact.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent implements OnInit {
  contactForm: FormGroup;
  
  // Estados de carga y mensajes - igual que en forgot-password
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private meta: Meta,
    private title: Title
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.configurarSEO();
  }

  /**
   * Configura los meta tags SEO para la página de contacto
   */
  private configurarSEO(): void {
    // Configurar título de la página
    this.title.setTitle('Contáctanos - Peruviansecom | Atención al Cliente y Soporte');

    // Meta tags básicos
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Ponte en contacto con el equipo de Peruviansecom. Resolvemos tus dudas sobre productos peruanos, pedidos, envíos y garantías. Atención personalizada para una mejor experiencia de compra.' 
    });

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'contacto peruviansecom, atención al cliente, soporte técnico, consultas productos peruanos, ayuda pedidos, servicio al cliente perú, contactar tienda online' 
    });

    this.meta.updateTag({ 
      name: 'author', 
      content: 'Peruviansecom' 
    });

    this.meta.updateTag({ 
      name: 'robots', 
      content: 'index, follow' 
    });

    // Meta tags Open Graph para redes sociales
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'Contáctanos - Peruviansecom | Estamos Aquí Para Ayudarte' 
    });

    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Nuestro equipo está listo para resolver todas tus consultas sobre productos peruanos, pedidos y envíos. Contáctanos ahora y recibe atención personalizada.' 
    });

    this.meta.updateTag({ 
      property: 'og:type', 
      content: 'website' 
    });

    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://peruviansecom.com/contactanos' 
    });

    this.meta.updateTag({ 
      property: 'og:image', 
      content: 'https://peruviansecom.com/logo.png' 
    });

    this.meta.updateTag({ 
      property: 'og:image:alt', 
      content: 'Formulario de contacto Peruviansecom - Atención al cliente' 
    });

    this.meta.updateTag({ 
      property: 'og:site_name', 
      content: 'Peruviansecom' 
    });

    this.meta.updateTag({ 
      property: 'og:locale', 
      content: 'es_PE' 
    });

    // Meta tags Twitter Card
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    });

    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'Contáctanos - Peruviansecom | Soporte y Atención al Cliente' 
    });

    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Resolvemos tus dudas sobre productos peruanos y pedidos. Contáctanos para recibir atención personalizada.' 
    });

    this.meta.updateTag({ 
      name: 'twitter:image', 
      content: 'https://peruviansecom.com/logo.png' 
    });

    this.meta.updateTag({ 
      name: 'twitter:image:alt', 
      content: 'Atención al cliente Peruviansecom' 
    });

    // Meta tags adicionales para SEO
    this.meta.updateTag({ 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1.0' 
    });

    this.meta.updateTag({ 
      'http-equiv': 'Content-Type', 
      content: 'text/html; charset=utf-8' 
    });

    this.meta.updateTag({ 
      name: 'language', 
      content: 'Spanish' 
    });

    this.meta.updateTag({ 
      name: 'revisit-after', 
      content: '30 days' 
    });

    this.meta.updateTag({ 
      name: 'distribution', 
      content: 'global' 
    });

    this.meta.updateTag({ 
      name: 'rating', 
      content: 'general' 
    });

    // Canonical URL
    this.meta.updateTag({ 
      rel: 'canonical', 
      href: 'https://peruviansecom.com/contactanos' 
    });

    // Meta tags específicos para páginas de contacto
    this.meta.updateTag({ 
      name: 'contact', 
      content: 'support@peruviansecom.com' 
    });

    this.meta.updateTag({ 
      name: 'coverage', 
      content: 'Peru' 
    });

    this.meta.updateTag({ 
      name: 'geo.region', 
      content: 'PE' 
    });

    this.meta.updateTag({ 
      name: 'geo.country', 
      content: 'Peru' 
    });

    this.meta.updateTag({ 
      name: 'geo.placename', 
      content: 'Lima' 
    });

    // Schema.org structured data para contacto
    this.agregarEsquemaContacto();
  }

  /**
   * Agrega datos estructurados Schema.org para la página de contacto
   */
  private agregarEsquemaContacto(): void {
    const schemaContacto = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contáctanos - Peruviansecom",
      "description": "Página de contacto oficial de Peruviansecom para consultas sobre productos peruanos, pedidos y soporte técnico",
      "url": "https://peruviansecom.com/contactanos",
      "mainEntity": {
        "@type": "Organization",
        "name": "Peruviansecom",
        "url": "https://peruviansecom.com",
        "logo": "https://peruviansecom.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+51-XXX-XXX-XXX",
          "contactType": "customer service",
          "availableLanguage": "Spanish",
          "areaServed": "PE"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PE",
          "addressRegion": "Lima",
          "addressLocality": "Lima"
        }
      }
    };

    // Crear elemento script para datos estructurados
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaContacto);
    
    // Verificar si ya existe y reemplazarlo
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const contactData: ContactRequest = this.contactForm.value;

    this.contactService.sendContact(contactData).subscribe({
      next: (response: ContactResponse) => {
        if (response.success) {
          this.successMessage = response.message;
          this.contactForm.reset(); // Limpiar el formulario
          
          // Actualizar meta description cuando el mensaje se envía exitosamente
          this.actualizarSEOPostEnvio();
          
          // Limpiar mensaje después de 5 segundos
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        } else {
          this.errorMessage = response.message || 'Error al enviar el mensaje';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al enviar contacto:', error);
        
        if (error.status === 422 && error.error?.errors) {
          // Mostrar el primer error de validación
          const firstError = Object.values(error.error.errors)[0] as string[];
          this.errorMessage = firstError[0];
        } else {
          this.errorMessage = error.error?.message || 'Error de conexión. Intenta nuevamente.';
        }
        
        this.isLoading = false;
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }

  /**
   * Actualiza el SEO después de enviar el mensaje exitosamente
   */
  private actualizarSEOPostEnvio(): void {
    this.title.setTitle('¡Mensaje Enviado! - Peruviansecom | Te Contactaremos Pronto');
    
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Tu mensaje ha sido enviado exitosamente al equipo de Peruviansecom. Te contactaremos pronto para resolver todas tus consultas sobre productos peruanos.' 
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.contactForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  // Método para cerrar mensajes manualmente - igual que en forgot-password
  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
    
    // Restaurar SEO original si se limpian los mensajes
    if (!this.successMessage) {
      this.configurarSEO();
    }
  }
}