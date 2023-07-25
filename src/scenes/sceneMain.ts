import * as Phaser from 'phaser';

import { NPC } from '../entity/npc';
import { Player } from '../entity/player';
import { BaseScene } from './baseScene';

export class SceneMain extends BaseScene {
  private player: Player;
  private npc: NPC;
  private portal: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private target: Phaser.Math.Vector2;

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
    this.npc = this.setupNpc();
    this.player = this.setupPlayer();
    this.target = new Phaser.Math.Vector2();
    this.portal = this.setupPortal();

    this.input?.on('pointerdown', pointer => {
      this.target.x = pointer.x;
      this.target.y = pointer.y;

      this.physics.moveToObject(
        this.player.sprite,
        this.target,
        this.player.speed
      );
    });

    const npcColider: Phaser.Physics.Arcade.Collider =
      this.physics.add.collider(
        this.player.sprite,
        this.npc.sprite,
        (player, npc) => {
          this.scene.launch('SceneDialog', {
            text: this.npc.dialogo,
            name: this.npc.name
          });
          this.scene.pause();
          this.physics.world.removeCollider(npcColider);
          this.player.sprite.body.stop();
          this.player.isWarrior = true;
        }
      );

    this.physics.add.overlap(this.player.sprite, this.portal, () => {
      if (!this.player.isWarrior) {
        return;
      }
      this.scene.start('PlayScene');
    });
  }
  setupPortal() {
    const portal = this.physics.add.image(0, 0, 'face');
    portal.setAlpha(0.5);
    portal.setScale(0.8);
    this.placeAt(0, 0, portal);
    portal.setVisible(false);
    return portal;
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

  private setupNpc(): NPC {
    const npc = new NPC(this, 0, 0);
    this.placeAt(5, 2, npc.sprite);

    return npc;
  }

  private setupPlayer(): Player {
    const player = new Player(this, 0, 0);
    this.placeAt(5, 5, player.sprite);

    return player;
  }

  update(): void {
    //  4 is our distance tolerance, i.e. how close the source can get to the target
    //  before it is considered as being there. The faster it moves, the more tolerance is required.
    const tolerance = 4;

    // const tolerance = 200 * 1.5 / this.game.loop.targetFps;

    const distance = Phaser.Math.Distance.BetweenPoints(
      this.player.sprite,
      this.target
    );

    if (this.player.sprite.body.speed > 0) {
      // this.distanceText.setText(`Distance: ${distance}`);

      if (distance < tolerance) {
        this.player.sprite.body.reset(this.target.x, this.target.y);
      }
    }
  }
}
