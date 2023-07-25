export class Boss {
  private _sprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private scene: Phaser.Scene;
  private _speed: number;
  private _damage: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this._sprite = scene.physics.add.image(x, y, 'face');
    this._sprite.setScale(0.5);
    this._sprite.setTint(0x000000);
    this._sprite.setName('boss');

    // this.sprite.body.onCollide = true;
    this._speed = 500;
    this._damage = 30;
  }

  public update(): void {}

  public get sprite(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this._sprite;
  }

  public get speed(): number {
    return this._speed;
  }

  public get damage(): number {
    return this._damage;
  }
}
