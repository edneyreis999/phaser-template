import { BaseScene } from './baseScene';
export interface SceneProps {
  text: string;
}
export class SceneDialog extends BaseScene {
  private textToDisplay: string;
  constructor() {
    super('SceneDialog');
  }

  init(data: SceneProps): void {
    console.log('init data');
    console.log(data);
    this.textToDisplay = data.text;
  }

  create(): void {
    super.create();

    this.makeAlignGrid(42, 21);

    // const image = this.add.image(0, 0, 'dialog-box').setOrigin(0.5, 1);
    // this.placeAt(5, 11, image);
    const greedNumber = 35;
    this.placeImage('dialog-box', { x: 10, y: greedNumber }, 1);

    this.placeText(this.textToDisplay, { x: 10, y: greedNumber }, 'DIALOG');
  }
  preload(): void {}
  update(): void {}
}
