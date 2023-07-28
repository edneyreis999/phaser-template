import * as Phaser from 'phaser';

import { Background } from '../common/comps/background';
import { Controller } from '../common/mc/controller';
import { EventDispatcher } from '../common/mc/eventDispatcher';
import { Model } from '../common/mc/model';
import { SoundPanel } from '../common/ui/soundPanel';
import { TextObj } from '../common/ui/textObj';
import { TextStyles } from '../common/ui/textStyles';
import { Align } from '../common/util/align';
import { AlignGrid } from '../common/util/alignGrid';
import { MediaManager } from '../common/util/mediaManager';

export abstract class BaseScene extends Phaser.Scene {
  mm: MediaManager;
  controller: Controller;
  model: Model;
  emitter: EventDispatcher;
  textStyles: TextStyles;
  gw: number;
  gh: number;
  aGrid: AlignGrid;
  soundPanel: SoundPanel;

  constructor(key: string) {
    super(key);
  }

  abstract preload(): void;

  create(): void {
    this.mm = MediaManager.getInstance({ scene: this });
    this.controller = Controller.getInstance();
    this.model = Model.getInstance();
    this.emitter = EventDispatcher.getInstance();
    this.textStyles = TextStyles.getInstance(this.sys.game.config.width);
    this.gw = this.sys.game.config.width as number;
    this.gh = this.sys.game.config.height as number;
  }

  setBackground(key: string): Background {
    return new Background({ scene: this, key: key });
  }

  placeImage(
    key: string,
    pos: { x: number; y: number } | number,
    scale: number,
    physics = false
  ): Phaser.GameObjects.Sprite {
    const image = physics
      ? this.physics.add.sprite(0, 0, key)
      : this.add.sprite(0, 0, key);

    if (typeof pos === 'number') {
      this.aGrid.placeAtIndex(pos, image);
    } else {
      this.aGrid.placeAt(pos.x, pos.y, image);
    }
    if (scale != -1) Align.scaleToGameW(image, scale, this);
    return image;
  }

  placeText(
    text: string,
    pos: { x: number; y: number } | number,
    style: string,
    options
  ): TextObj {
    const fixedStyle = this.textStyles.getStyle(style);
    const textStyle = {
      ...fixedStyle,
      style: { ...fixedStyle.style, ...options }
    };
    const textObj = new TextObj({
      scene: this,
      text: text,
      textStyle: textStyle
    });
    if (typeof pos === 'number') {
      this.aGrid.placeAtIndex(pos, textObj);
    } else {
      this.aGrid.placeAt(pos.x, pos.y, textObj);
    }
    return textObj;
  }

  placeAtIndex(pos: number, item): void {
    this.aGrid.placeAtIndex(pos, item);
  }

  placeAt(xx: number, yy: number, item): void {
    this.aGrid.placeAt(xx, yy, item);
  }

  makeAlignGrid(r = 11, c = 11): void {
    this.aGrid = new AlignGrid({ scene: this, rows: r, cols: c });
  }

  makeGear(): void {
    const gear = this.add.image(0, 0, 'gear');
    Align.scaleToGameW(gear, 0.1, this);
    this.aGrid.placeAtIndex(110, gear);
    gear.setInteractive();
    gear.on('pointerdown', this.toggleSoundPanel.bind(this));
  }

  makeSoundPanel(): void {
    this.soundPanel = new SoundPanel({ scene: this });
    Align.center(this.soundPanel, this);
    this.soundPanel.visible = false;
    this.soundPanel.depth = 2000;
  }

  toggleSoundPanel(): void {
    this.soundPanel.visible = !this.soundPanel.visible;
  }

  getStyle(style: string) {
    return this.textStyles.getStyle(style);
  }

  abstract update(): void;
}
