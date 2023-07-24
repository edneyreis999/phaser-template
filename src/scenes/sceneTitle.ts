import { FlatButton } from '../common/ui/flatButton';
import { BaseScene } from './baseScene';

export class SceneTitle extends BaseScene {
  constructor() {
    super('SceneTitle');
  }

  preload(): void {}

  create(): void {
    this.setupBaseScene();
    this.setupBackground();
    this.setupGrid();
    this.displayTitle();
    this.createStartButton();
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

  private createStartButton(): void {
    const btnStart = new FlatButton({
      scene: this,
      textStyle: 'BUTTON_STYLE',
      key: 'button',
      text: 'START GAME',
      callback: this.startGame.bind(this)
    });
    this.aGrid.placeAtIndex(104, btnStart);
  }

  private setupUI(): void {
    super.makeSoundPanel();
    super.makeGear();
  }

  private startGame(): void {
    this.scene.start('SceneMain');
  }

  update(): void {}
}
