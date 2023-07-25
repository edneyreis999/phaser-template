export class NPC {
  private _sprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private scene: Phaser.Scene;
  private _dialogo: string;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this._sprite = scene.physics.add.image(x, y, 'face').setImmovable(true);
    this._sprite.setScale(0.25);
    this._sprite.setTint(0x00ff00);
    this._sprite.setName('npc');

    this.sprite.body.onCollide = true;

    // this._dialogo = `
    //   Esta é a Espada do Destino. A chave para derrotar o último boss. Proteja nosso mundo, valente guerreiro!`;
    this._dialogo = `
    Aqui está, guerreiro! Use-a para enfrentar o último boss e restaurar a paz em nosso reino!
    Aqui está, guerreiro! Use-a para enfrentar o último boss e restaurar a paz em nosso reino!
    Aqui está, guerreiro! Use-a para enfrentar o último boss e restaurar a paz em nosso reino!
    Aqui está, guerreiro! Use-a para enfrentar o último boss e restaurar a paz em nosso reino!`;
  }

  public get sprite(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this._sprite;
  }

  public get dialogo(): string {
    return this._dialogo;
  }
}
