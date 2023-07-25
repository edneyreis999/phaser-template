export class Player {
  private _maxHealth: number;
  private _health: number;
  private _sprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private scene: Phaser.Scene;
  private _speed: number;
  private _isWarrior: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this._sprite = scene.physics.add.image(x, y, 'face');
    this._sprite.setScale(0.25);
    this._sprite.setName('player');

    // this.sprite.body.onCollide = true;
    this._speed = 500;
    this._maxHealth = 100;
    this._health = this._maxHealth;
    this._isWarrior = false;
  }

  public get sprite(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this._sprite;
  }

  public get speed(): number {
    return this._speed;
  }

  public get health() {
    return this._health;
  }
  public set health(value: number) {
    this._health = value;

    // TODO colocar uma condição de morte.
    if (this._health <= 0) {
      this.sprite.body.stop();
    }
  }

  public get maxHealth(): number {
    return this._maxHealth;
  }

  public get isWarrior(): boolean {
    return this._isWarrior;
  }
  public set isWarrior(value: boolean) {
    this._isWarrior = value;
  }

  public update(): void {}
}
