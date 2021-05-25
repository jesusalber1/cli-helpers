import { HelperBase } from './helperBase';

export class Capitalize extends HelperBase {
  constructor() {
    super('1.0.0', '<text ...>', [
      '\t$ capitalize "text to capitalize"',
      '\t$ capitalize text to capitalize',
      '\t$ pbpaste | capitalize # piped text',
    ]);
  }

  public transform(input: string | undefined): string {
    if (!input) return '';
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}
