import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitBeneficios'
})
export class SplitBeneficiosPipe implements PipeTransform {

  transform(value: string, separator: string = '\n'): string[] {
    if (!value) return [];

    return value
      .split(separator)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
}
