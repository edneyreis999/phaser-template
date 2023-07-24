import { BaseScene } from './baseScene';

export class SceneMain extends BaseScene {
  constructor() {
    super('SceneMain');
  }

  preload(): void {}

  create(): void {
    this.setUpBaseScene();
    this.createAlignGrid();
    this.showGridNumbers();
    this.createUI();
  }

  private setUpBaseScene(): void {
    super.create();
  }

  private createAlignGrid(): void {
    this.makeAlignGrid(11, 11);
  }

  private showGridNumbers(): void {
    this.aGrid.showNumbers();
  }

  private createUI(): void {
    super.makeSoundPanel();
    super.makeGear();
  }

  update(): void {}
}
