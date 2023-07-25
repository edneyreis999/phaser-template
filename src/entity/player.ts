export class Player {
  private _sprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private scene: Phaser.Scene;
  private _speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this._sprite = scene.physics.add.image(x, y, 'face');
    this._sprite.setScale(0.25);
    this._sprite.setTint(0x0000ff);
    this._sprite.setName('player');

    // this.sprite.body.onCollide = true;
    this._speed = 500;
  }

  public get sprite(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this._sprite;
  }

  public get speed(): number {
    return this._speed;
  }

  public update(): void {}
}
