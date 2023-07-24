import { FlatButton } from '../common/ui/flatButton';
import { BaseScene } from './baseScene';

export class SceneOver extends BaseScene {
  constructor() {
    super('SceneOver');
  }

  preload(): void {
    throw new Error('Method not implemented.');
  }

  create(): void {
    this.setupBaseScene();
    this.setupBackground();
    this.setupGrid();
    this.displayTitle();
    this.createPlayAgainButton();
    this.setupUI();
  }

  private setupBaseScene(): void {
    super.create();
  }

  private setupBackground(): void {
    this.setBackground('sky');
  }

  private setupGrid(): void {
    this.makeAlignGrid(11, 11);
  }

  private displayTitle(): void {
    this.placeText('Game Title', 27, 'TITLE_TEXT');
  }

  private createPlayAgainButton(): void {
    const btnNext = new FlatButton({
      scene: this,
      textStyle: 'BUTTON_STYLE',
      key: 'button',
      text: 'Play Again',
      callback: this.playAgain.bind(this)
    });
    this.aGrid.placeAtIndex(104, btnNext);
  }

  private setupUI(): void {
    super.makeSoundPanel();
    super.makeGear();
  }

  private playAgain(): void {
    this.scene.start('SceneMain');
  }

  update(): void {
    throw new Error('Method not implemented.');
  }
}
