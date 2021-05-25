import commander from 'commander';

export abstract class HelperBase {
  private readonly program: commander.Command;

  constructor(
    public readonly version: string,
    public readonly usage: string,
    public readonly examples: string[]
  ) {
    this.program = new commander.Command();
    this.configure();
  }

  protected configure(): void {
    this.program
      .version(this.version)
      .usage(this.usage)
      .on('--help', () => {
        console.log('\nExample:');
        this.examples.map((example) => console.log(example));
      });
  }

  // Specific implementation of the transformation
  abstract transform(input: string | undefined): string;

  private processInput(): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      // Inject arguments to commander
      this.program.parse(process.argv);

      if (this.program.args.length === 0) {
        // Check if text is being piped (i.e. 'pbpaste | lower')
        if (process.stdin.isTTY) resolve('');

        // Read all input data from pipe
        let input = '';

        process.stdin.on('readable', () => {
          let buf;
          while ((buf = process.stdin.read()) !== null) {
            input += buf;
          }
        });

        process.stdin.on('end', () => {
          resolve(input);
        });
      } else {
        // Text to translate is provided as argument(s)
        let input =
          this.program.args.length > 1
            ? this.program.args.join(' ')
            : this.program.args[0];

        resolve(input);
      }
    });
  }

  private displayResult(result: string) {
    console.log(result);
  }

  public async execute(): Promise<void> {
    const input = await this.processInput();
    const result = this.transform(input);
    this.displayResult(result);
  }
}
