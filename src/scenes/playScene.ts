import * as Phaser from 'phaser';

import { Bar } from '../common/comps/bar';
import { Align } from '../common/util/align';
import { Boss } from '../entity/boss';
import { Bullet } from '../entity/bullet';
import { Player } from '../entity/player';
import { BaseScene } from './baseScene';

export interface SceneProps {
  name: string;
}

export class PlayScene extends BaseScene {
  private player: Player;
  private boss: Boss;
  private bar: Bar;
  private bar2: Bar;
  private target: Phaser.Math.Vector2;
  enemyBullets: Phaser.Physics.Arcade.Group;
  enemyFiring: Phaser.Time.TimerEvent;

  constructor() {
    super('PlayScene');
  }

  create(): void {
    super.create();

    this.makeAlignGrid(18, 18);
    this.setBackground('dungeon-background-2');

    this.player = this.setupPlayer();
    this.boss = this.setupBoss();
    this.target = new Phaser.Math.Vector2();

    this.setupBossBullets();
    this.createUI();

    this.input?.on('pointerdown', this.handlePointerDown.bind(this));
  }

  handlePointerDown(pointer: Phaser.Input.Pointer): void {
    this.target.set(pointer.x, pointer.y);
    this.physics.moveToObject(
      this.player.sprite,
      this.target,
      this.player.speed
    );
  }

  update(): void {
    this.updatePlayerMovement();
    this.updateBossRotation();
  }

  updatePlayerMovement(): void {
    const tolerance = 4;
    if (this.player.sprite) {
      const distance = Phaser.Math.Distance.BetweenPoints(
        this.player.sprite,
        this.target
      );

      if (this.player.sprite.body.speed > 0 && distance < tolerance) {
        this.player.sprite.body.reset(this.target.x, this.target.y);
      }
    }
  }

  updateBossRotation(): void {
    // rotate boss to face player
    this.boss.sprite.rotation = Phaser.Math.Angle.Between(
      this.boss.sprite.x,
      this.boss.sprite.y,
      this.player.sprite.x,
      this.player.sprite.y
    );
  }

  handlePlayerDamage(
    player:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    bullet:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile
  ): void {
    bullet.destroy();

    const { health, maxHealth } = this.player;
    const { damage } = this.boss;

    this.player.health = Math.max(health - damage, 0);

    const healthPercent = this.player.health / maxHealth;
    this.bar.setPercent(Math.max(healthPercent, 0));

    this.player.sprite.setTint(0xff0000); // Add red tint for damage feedback
    this.time.delayedCall(300, () => {
      this.player.sprite.clearTint(); // Clear tint after 300ms
    });

    if (this.player.health <= 0) {
      this.scene.start('SceneTitle');
    }
  }

  setupBossBullets(): void {
    this.enemyBullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    });

    this.enemyFiring = this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        const bullet = this.enemyBullets
          .get()
          .setActive(true)
          .setVisible(true) as Bullet;
        if (bullet) {
          bullet.fire(this.boss.sprite, this.player.sprite);
        }
      }
    });

    this.physics.add.collider(this.player.sprite, this.enemyBullets, (a, b) => {
      this.handlePlayerDamage(a, b);
    });
  }

  setupBoss(): Boss {
    const boss = new Boss(this, 0, 0);
    this.placeAt(10, 10, boss.sprite);
    return boss;
  }

  setupPlayer(): Player {
    const player = new Player(this, 0, 0);
    this.placeAt(1, 2, player.sprite);
    player.turnWarrior();
    return player;
  }

  createUI(): void {
    const height = (this.sys.game.config.height as number) * 0.1;
    const width = (this.sys.game.config.width as number) * 0.8;

    this.bar2 = new Bar({ scene: this, height, width, color: 0xffffff });
    this.bar = new Bar({ scene: this, height, width });

    Align.centerH(this.bar, this);
    Align.centerH(this.bar2, this);
    this.bar.setPercent(1);
  }

  preload(): void {}
}
