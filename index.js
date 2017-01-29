let Leap = require('leapjs');
let child_process = require('child_process');
let Vector = require('./vector');

let talker = child_process.fork('../signbot-talk/index');

Leap.loop(function(frame){
  const dataLengthPerHand = 5;
  
  let raw = {
    left: [],
    right: []
  };
  let fingers = ['indexFinger', 'middleFinger', 'ringFinger', 'pinky'];
  frame.hands.forEach(hand => {
    //raw[hand.type].push(hand.direction[0], hand.palmNormal[1], hand.palmNormal[2]);
    raw[hand.type].push(1.1 - 1.6*Leap.vec3.dot(hand['thumb'].direction, Leap.vec3.normalize([],Leap.vec3.cross([],hand.direction, hand.palmNormal))));
    fingers.forEach(finger =>
      raw[hand.type].push(1.3 - 1.4*Leap.vec3.dot(hand[finger].direction, hand.direction))
    );
  });
  
  data = (raw.left.length? raw.left : new Array(dataLengthPerHand).fill(0))
    .concat(raw.right.length? raw.right : new Array(dataLengthPerHand).fill(0));
  
  talker.send(data);
  
  let str = (data[0]<0?"":"+") +  data[0].toFixed(2);
  for(let i = 1; i < data.length; i++)
    str += " " + (data[i]<0?"":"+") + data[i].toFixed(2);
  console.log(str);
  console.log();
});
