import { HelperBase } from './helperBase';

export class Upper extends HelperBase {
  constructor() {
    super('1.0.0', '<text ...>', [
      '\t$ upper "text to uppercase"',
      '\t$ upper text to uppercase',
      '\t$ pbpaste | upper # piped text',
    ]);
  }

  public transform(input: string | undefined): string {
    if (!input) return '';
    return input.toLocaleUpperCase();
  }
}
