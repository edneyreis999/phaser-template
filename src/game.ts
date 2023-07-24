import * as Phaser from 'phaser';

import { SceneLoad } from './scenes/sceneLoad';
import { SceneMain } from './scenes/sceneMain';
import { SceneOver } from './scenes/sceneOver';
import { SceneTitle } from './scenes/sceneTitle';

let isMobile = navigator.userAgent.indexOf('Mobile');
if (isMobile == -1) {
  isMobile = navigator.userAgent.indexOf('Tablet');
}
let w = 480;
let h = 640;

if (isMobile != -1) {
  w = window.innerWidth;
  h = window.innerHeight;
}

const config = {
  type: Phaser.AUTO,
  width: w,
  height: h,
  parent: 'phaser-game',
  scene: [SceneLoad, SceneTitle, SceneMain, SceneOver]
};

new Phaser.Game(config);
