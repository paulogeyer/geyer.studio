

s1 = "315c4eeaa8b5f8aaf9174145bf43e1784b8fa00dc71d885a804e5ee9fa40b16349c146fb778cdf2d3aff021dfff5b403b510d0d0455468aeb98622b137dae857553ccd8883a7bc37520e06e515d22c954eba5025b8cc57ee59418ce7dc6bc41556bdb36bbca3e8774301fbcaa3b83b220809560987815f65286764703de0f3d524400a19b159610b11ef3e"

s2 = "0e0b213f26041e480b26217f27342e175d0e070a3c5b103e2526217f27342e175d0e077e263451150104"

s3 = "73626960647f6b206821204f21254f7d694f7624662065622127234f726927756d"

function hex_to_bytes(str) {
  var res = [];
  for (var i = 0; i < str.length/2; i++) {
    res.push(parseInt(str.slice(i,i+2), 16));
  }
  return res;
}

function str_to_hex(str) {
  res = "";
  for(var i = 0; i < str.length; i++) {
    
  }

  return res;
}

function bytes_to_str(bytes) {
  var res = [];
  for(var i = 0; i < bytes.length; i++) {
    res.push(String.fromCharCode(bytes[i]));
  }
}

// console.log(hex_to_bytes(s2));
