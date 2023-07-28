export default anims => {
  anims.create({
    key: 'player_idle',
    frames: anims.generateFrameNumbers('player', {
      start: 54,
      end: 55
    }),
    frameRate: 0.2,
    repeat: -1
  });

  anims.create({
    key: 'player_up',
    frames: anims.generateFrameNumbers('player', {
      start: 90,
      end: 92
    }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'player_down',
    frames: anims.generateFrameNumbers('player', {
      start: 54,
      end: 56
    }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'player_right',
    frames: anims.generateFrameNumbers('player', {
      start: 78,
      end: 80
    }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'player_left',
    frames: anims.generateFrameNumbers('player', {
      start: 66,
      end: 68
    }),
    frameRate: 5,
    repeat: -1
  });
};
