import { Bar } from '../common/comps/bar';
import { ColorBurst } from '../common/effects/colorBurst';
import { Flare } from '../common/effects/flare';
import { StarBurst } from '../common/effects/starBurst';
import { Align } from '../common/util/align';
import { BaseScene } from './baseScene';

export class SceneLoad extends BaseScene {
  private common: string;
  private imagePath: string;
  private audioPath: string;
  private bar: Bar;
  private bar2: Bar;

  constructor() {
    super('SceneLoad');
  }

  preload() {
    this.setPaths();
    this.createLoadingBars();

    this.loadAssets();
  }

  create() {
    this.scene.start('SceneTitle');
  }

  update(): void {
    throw new Error('Method not implemented.');
  }

  private setPaths(): void {
    this.common = './assets/';
    this.imagePath = this.common + 'images/';
    this.audioPath = this.common + 'audio/';
  }

  private createLoadingBars(): void {
    this.bar2 = new Bar({
      scene: this,
      height: (this.sys.game.config.height as number) * 0.1,
      width: (this.sys.game.config.width as number) * 0.8,
      color: 0xffffff
    });
    this.bar = new Bar({
      scene: this,
      height: (this.sys.game.config.height as number) * 0.1,
      width: (this.sys.game.config.width as number) * 0.8
    });
    Align.center(this.bar, this);
    Align.center(this.bar2, this);
    this.load.on('progress', this.onProgress, this);
  }

  private onProgress(value: number): void {
    const per = Math.floor(value * 100);
    this.bar.setPercent(per);
  }

  private loadAssets(): void {
    const iconArray = [
      'gear',
      'musicOff',
      'musicOn',
      'sfxOn',
      'sfxOff',
      'iconLock',
      'iconHome',
      'iconNext',
      'iconPrev'
    ];
    iconArray.forEach(icon => this.loadIcon(icon));

    const pngArray = ['panelBack', 'title', 'face', 'dialog-box'];
    pngArray.forEach(png => this.loadPng(png));

    const jpgArray = ['sky', 'dungeon-background-2'];
    jpgArray.forEach(jpg => this.loadJpg(jpg));

    this.loadToggle(1);
    this.loadToggle(2);
    this.loadButton('button', 1, 2);

    StarBurst.preload(this, this.common + 'images/effects/stars.png');
    ColorBurst.preload(this, this.common + 'images/effects/colorStars.png');
    Flare.preload(this, this.common + 'images/effects/flare.png');

    this.load.image('holder', this.common + 'images/ui/backs/holder.jpg');
  }

  private loadButton(key: string, style: number, number: number): void {
    this.load.image(key, `${this.imagePath}ui/buttons/${style}/${number}.png`);
  }

  private loadIcon(key: string): void {
    this.load.image(key, `${this.imagePath}ui/icons/${key}.png`);
  }

  private loadToggle(key: number): void {
    this.load.image(`toggle${key}`, `${this.imagePath}ui/toggles/${key}.png`);
  }

  private loadJpg(key: string, mainPath = '') {
    if (mainPath == '') {
      mainPath = this.imagePath;
    }
    this.load.image(key, mainPath + key + '.jpg');
  }
  private loadPng(key: string, mainPath = '') {
    if (mainPath == '') {
      mainPath = this.imagePath;
    }
    this.load.image(key, mainPath + key + '.png');
  }
  private loadWav(key: string, mainPath = '') {
    if (mainPath == '') {
      mainPath = this.audioPath;
    }
    this.load.audio(key, mainPath + key + '.wav');
  }
  private loadMp3(key: string, mainPath = '') {
    if (mainPath == '') {
      mainPath = this.audioPath;
    }
    this.load.audio(key, mainPath + key + '.mp3');
  }
}
