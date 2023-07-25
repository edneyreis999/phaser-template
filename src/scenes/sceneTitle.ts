import { FlatButton } from '../common/ui/flatButton';
import { Align } from '../common/util/align';
import { BaseScene } from './baseScene';

export class SceneTitle extends BaseScene {
  private gameTitle: string;
  private gameStory: string;

  constructor() {
    super('SceneTitle');

    this.gameTitle = 'Jornada Épica';
    this.gameStory = `As lendas contadas pelos ventos podem ter o seu nome. Aventure-se!`;
  }

  preload(): void {}

  create(): void {
    this.setupBaseScene();
    this.setupBackground();
    this.makeAlignGrid(11, 11);
    this.displayTitle();
    this.displayStory();
    this.createStartButton();
    this.setupUI();

    // this.aGrid.showNumbers();
  }

  private setupBaseScene(): void {
    super.create();
  }

  private setupBackground(): void {
    this.setBackground('sky');
  }

  private displayTitle(): void {
    this.placeText(this.gameTitle, 27, 'TITLE_TEXT');
  }

  private displayStory() {
    const ceu = this.placeImage('ceu', { x: 0, y: 6 }, 1);
    Align.center(ceu, this);

    const writingAreaWidth = ceu.getBounds().width;

    this.placeText(this.gameStory, 60, 'CLOCK2', {
      align: 'center',
      wordWrap: {
        width: writingAreaWidth,
        useAdvancedWrap: true
      }
    });
    ceu.postFX.addBlur(1, 0, 0, 1, 0xffffff, 6);
    ceu.setAlpha(0.8);
  }

  private createStartButton(): void {
    const btnStart = new FlatButton({
      scene: this,
      textStyle: 'BUTTON_STYLE',
      key: 'button',
      text: 'INICIAR AVENTURA',
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
