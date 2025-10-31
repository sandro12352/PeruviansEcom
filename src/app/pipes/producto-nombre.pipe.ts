import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productoNombre'
})
export class ProductoNombrePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Convertir a minúsculas y limpiar
    let clean = value.toLowerCase().trim();

    // Palabras que indican el inicio de una descripción
    const stopWords = [
      'piel', 'cabello', 'rostro', 'articulaciones', 'fuertes', 'sano', 'fortalece',
      'natural', 'mente', 'activa', 'energía', 'vitamina', 'firme','mejora','duerme',
      'corazón', 'salud', 'colesterol', 'digestión', 'defensas'
    ];

    // Separar palabras
    const words = clean.split(' ');

    const nameWords: string[] = [];

    for (const word of words) {
      // Si empieza con número o coincide con una palabra descriptiva, cortamos
      if (/^\d/.test(word) || stopWords.includes(word)) break;
      nameWords.push(word);
    }

    // Capitalizar solo las palabras del nombre
    const capitalized = nameWords.map(w =>
      w.charAt(0).toUpperCase() + w.slice(1)
    );

    return capitalized.join(' ');
  }
}
