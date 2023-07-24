export class NPC {
  private _sprite: Phaser.GameObjects.Sprite;

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this._sprite = scene.add.sprite(x, y, 'face');
  }

  public get sprite(): Phaser.GameObjects.Sprite {
    return this._sprite;
  }
}
