let Leap = require('leapjs');
let stdin = process.openStdin();
let Vector = require('./vector');

Leap.loop(function(frame){
  let raw = {
    left: new Array(20).fill(0),
    right:new Array(20).fill(0)
  };
  let fingers = ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'pinky'];
  frame.hands.forEach(hand => {
    let i = 0;
    let normal = hand.palmNormal;
    fingers.forEach(finger =>
      hand[finger].bones.forEach(bone =>
        raw[hand.type][i++] = Leap.vec3.dot(bone.direction(), normal)
      )
    )
  });
  
  data = raw.left.concat(raw.right);
  
  console.log(data);
});
