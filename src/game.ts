import * as Phaser from 'phaser';

import { SceneDialog } from './scenes/sceneDialog';
import { SceneLoad } from './scenes/sceneLoad';
import { SceneMain } from './scenes/sceneMain';
import { SceneOver } from './scenes/sceneOver';
import { SceneTitle } from './scenes/sceneTitle';

let isMobile = navigator.userAgent.indexOf('Mobile');
if (isMobile == -1) {
  isMobile = navigator.userAgent.indexOf('Tablet');
}
let w = window.innerHeight * 0.75;
let h = window.innerHeight;

if (isMobile != -1) {
  w = window.innerWidth;
  h = window.innerHeight;
}

const config = {
  type: Phaser.AUTO,
  width: w,
  height: h,
  parent: 'phaser-game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [SceneLoad, SceneTitle, SceneMain, SceneOver, SceneDialog]
};

new Phaser.Game(config);
