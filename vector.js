function broadcast(cb, v1, v2){
  let a = [];
  if(v1.length != v2.length)
    throw new TypeError("Vectors are not the same length.");
  for(let i = 0; i < v1.length; i++){
    if(v1[i] == null || v2 == null)
      a.push(null);
    else
      a.push(cb(v1[i], v2[i]));
  }
  return a;
}

module.exports = {
  add: function(v1, v2){
    return broadcast((a,b)=>a+b, v1, v2);
  },
  sub: function(v1, v2){
    return broadcast((a,b)=>a-b, v1, v2);
  },
  max: function(v1, v2){
    return broadcast((a,b)=>Math.max(a,b), v1, v2);
  },
  min: function(v1, v2){
    return broadcast((a,b)=>Math.min(a,b), v1, v2);
  }
};
