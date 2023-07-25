import * as Phaser from 'phaser';

export class Align {
  static scaleToGameW(obj, per: number, scene: Phaser.Scene): void {
    const { width } = scene.game.config;
    obj.displayWidth = (width as number) * per;
    obj.scaleY = obj.scaleX;
  }

  static scaleToGameH(obj, per: number, scene: Phaser.Scene): void {
    const { height } = scene.game.config;
    obj.displayHeight = (height as number) * per;
    obj.scaleX = obj.scaleY;
  }

  static centerH(obj, scene: Phaser.Scene): void {
    const { width } = scene.game.config;
    obj.x = (width as number) / 2 - obj.displayWidth / 2;
  }

  static centerV(obj, scene: Phaser.Scene): void {
    const { height } = scene.game.config;
    obj.y = (height as number) / 2 - obj.displayHeight / 2;
  }

  static center2(obj, scene: Phaser.Scene): void {
    const { width, height } = scene.game.config;
    obj.x = (width as number) / 2 - obj.displayWidth / 2;
    obj.y = (height as number) / 2 - obj.displayHeight / 2;
  }

  static center(obj, scene: Phaser.Scene): void {
    const { width, height } = scene.game.config;
    obj.x = (width as number) / 2;
    obj.y = (height as number) / 2;
  }

  static centerX(scene: Phaser.Scene): number {
    const { width } = scene.game.config;
    return (width as number) / 2;
  }

  static getYPer(scene: Phaser.Scene, per: number): number {
    const { height } = scene.game.config;
    return (height as number) * per;
  }

  static getXPer(scene: Phaser.Scene, per: number): number {
    const { width } = scene.game.config;
    return (width as number) * per;
  }

  static scaleImageToSize(image, sizeX, sizeY) {
    const scaleWidth = sizeX / image.width;
    const scaleHeight = sizeY / image.height;
    let scale = scaleWidth;
    if (scale > scaleHeight) scale = scaleHeight;
    image.setScale(scale);
  }
  static scaleImageToWidth(image, sizeX) {
    const scaleWidth = sizeX / image.width;
    const scale = scaleWidth;
    image.setScale(scale);
  }
  static alignToTopLeft(obj) {
    obj.x = obj.displayWidth / 2;
    obj.y = obj.displayHeight / 2;
  }
  static alignToTopRight(obj, scene) {
    obj.x = scene.sys.game.config.width - obj.displayWidth / 2;
    obj.y = obj.displayHeight / 2;
  }
  static alignToLBottomLeft(obj, scene) {
    obj.x = obj.displayWidth / 2;
    obj.y = scene.sys.game.config.height - obj.displayHeight / 2;
  }
  static alignToLBottomRight(obj, scene) {
    obj.x = scene.game.config.width - obj.displayWidth / 2;
    obj.y = scene.game.config.height - obj.displayHeight / 2;
  }
}
