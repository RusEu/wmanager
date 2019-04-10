import { Vue, Component, Watch } from 'vue-property-decorator'

const exec = require('child_process').exec;

function execute(command: any, callback: any) {
    exec(command, (error: any, stdout: any, stderr: any) => { 
        callback(stdout); 
    });
};

export enum Command {
  SHOW = 's',
}

export interface Result {
  name: string;
  selected?: boolean;
}

@Component
export default class MyComponent extends Vue {

  @Watch('value')
  onValueChanged(val: string, oldVal: string) {
    return !oldVal && Object.values(Command).includes(val)
      ? this.setCommand(val as Command)
      : this.filterResults(val);
  }

  public command?: string;
  public value: string = '';
  public results: Result[] = [];

  private _results: Result[] = [];
  private index: number = -1;

  mounted() {
    (this.$refs.value as any).focus();
  }

  onShow (): void {
    execute('wmctrl -l', (output: any) => {
        const regExp: RegExp = new RegExp(/([0-9a-z]+)\s{0,2}(-?[0-9])\s([a-zA-Z0-9\@\-])+(\s[a-zA-Z0-9\@\-]+:)?\s(.*)/)
        this.results = output
            .replace(/(\r\n|\n|\r)/gm, "\\/")
            .split('\\/')
            .map((item: string) => {
                const match: string[] = item.match(regExp) || [];
                return {name: match.splice(-1)[0], selected: false};
            })
            .filter((result: Result) => !!result.name);
        this._results = this.results;
    });
  }

  keyMonitor(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown":
        if (this.index < this.results.length) this.index++;
        break;
      
      case "ArrowUp":
        if (this.index > 0) this.index--;
        break;

      case "Enter":
        const selected = this.results[this.index].name;
        this.executeCommand(selected);
        break;
      
      default:
        return;

    }

    this.results = this.results.map((item, index) => index === this.index 
      ? {...item, selected: true}
      : {...item, selected: false})

  }

  private executeCommand(result: string) {
      console.log(result);
      return execute(`wmctrl -a ${result}`, (output: void) => console.log(output)); 
  }

  private filterResults(value: string) {
    this.index = -1;
    console.log(this.results, value);
    this.results = this._results
      .filter((result: Result) => !!result.name)
      .filter((result: Result) => result.name.match(new RegExp(value, 'gi')));
  }

  private setCommand(value: Command) {
    this.command = value;
    this.value = '';
    this.onShow();
  }

}