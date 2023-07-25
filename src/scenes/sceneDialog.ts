import { BaseScene } from './baseScene';
export interface SceneProps {
  text: string;
  name: string;
}
export class SceneDialog extends BaseScene {
  private textToDisplay: string;
  private name: string;
  constructor() {
    super('SceneDialog');
  }

  init(data: SceneProps): void {
    this.textToDisplay = data.text;
    this.name = data.name;
  }

  create(): void {
    super.create();

    this.makeAlignGrid(42, 21);

    const greedNumber = 35;
    const dialogBox = this.placeImage(
      'dialog-box',
      { x: 10, y: greedNumber },
      1
    );
    dialogBox.setInteractive();

    dialogBox.on('pointerdown', () => {
      this.scene.stop('SceneDialog');
      this.scene.resume('SceneMain');
    });

    const writingAreaWidth = dialogBox.getBounds().width * 0.9;

    this.placeText(this.textToDisplay, { x: 10, y: greedNumber }, 'DIALOG', {
      align: 'center',
      wordWrap: {
        width: writingAreaWidth,
        useAdvancedWrap: true
      }
    });
    this.placeText(this.name, { x: 6, y: 32 }, 'WHITE');

    // this.aGrid.showNumbers();
  }
  preload(): void {}
  update(): void {}
}
