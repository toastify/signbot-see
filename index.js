let Leap = require('leapjs');
let child_process = require('child_process');
let Vector = require('./vector');
let Data = require('../signbot-data/data');

let talker = child_process.fork('../signbot-talk/index');

Leap.loop(function(frame){
  const dataLengthPerHand = 5;
  
  let data = {
    left: { fingers: [] },
    right: { fingers: [] }
  };
  let fingers = ['indexFinger', 'middleFinger', 'ringFinger', 'pinky'];
  frame.hands.forEach(hand => {
    //data[hand.type].fingers.push(hand.direction[0], hand.palmNormal[1], hand.palmNormal[2]);
    data[hand.type].fingers.push(1.1 - 1.6*Leap.vec3.dot(hand['thumb'].direction, Leap.vec3.normalize([],Leap.vec3.cross([],hand.direction, hand.palmNormal))));
    fingers.forEach(finger =>
      data[hand.type].fingers.push(1.3 - 1.4*Leap.vec3.dot(hand[finger].direction, hand.direction))
    );
  });
  
  talker.send(data);
  console.log(Data.getMatch(data));
});
