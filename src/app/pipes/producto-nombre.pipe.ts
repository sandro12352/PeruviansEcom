import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productoNombre'
})
export class ProductoNombrePipe implements PipeTransform {

  transform(value:string): string {
    if (!value) return '';

    // Convertir todo a minúsculas y luego capitalizar cada palabra
    const clean = value.toLowerCase();

    // Separar por espacios
    const words = clean.split(' ');

    // Filtrar palabras hasta que aparece un número o algo que parezca descripción
    const nameWords = [];
    for (const word of words) {
      if (/^\d/.test(word)) break; // si empieza con número, cortamos
      nameWords.push(word);
    }

    // Capitalizar cada palabra
    const capitalized = nameWords.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    );

    return capitalized.join(' ');
  }

}
