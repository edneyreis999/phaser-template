export class NPC {
  private _sprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private scene: Phaser.Scene;
  private _dialogo: string;
  private _name: string;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this._sprite = scene.physics.add.image(x, y, 'face').setImmovable(true);
    this._sprite.setScale(0.25);
    this._sprite.setTint(0x00ffff);
    this._sprite.setName('npc');

    this.sprite.body.onCollide = true;

    //   Esta é a Espada do Destino. A chave para derrotar o último boss. Proteja nosso mundo, valente guerreiro!`;
    this._name = 'Mentor';
    this._dialogo = `Você já é um guerreiro. Vença a escuridão!`;
  }

  public get sprite(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this._sprite;
  }

  public get dialogo(): string {
    return this._dialogo;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
}
