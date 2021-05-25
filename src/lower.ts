import { HelperBase } from './helperBase';

export class Lower extends HelperBase {
  constructor() {
    super('1.0.0', '<text ...>', [
      '\t$ lower "TEXT TO LOWERCASE"',
      '\t$ lower TEXT TO LOWERCASE',
      '\t$ pbpaste | lower # piped text',
    ]);
  }

  public transform(input: string | undefined): string {
    if (!input) return '';
    return input.toLocaleLowerCase();
  }
}
