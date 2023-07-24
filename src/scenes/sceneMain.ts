import { NPC } from '../entity/NPC';
import { BaseScene } from './baseScene';

export class SceneMain extends BaseScene {
  constructor() {
    super('SceneMain');
  }

  preload(): void {}

  create(): void {
    this.setUpBaseScene();
    this.setupBackground();
    this.createAlignGrid();
    this.showGridNumbers();
    this.createUI();
    this.setupNpc();
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

  private setupBackground(): void {
    this.setBackground('dungeon-background-2');
  }

  private setupNpc(): void {
    const npc = new NPC(this, 0, 0);
  }

  private setupPlayer(): void {}

  update(): void {}
}
