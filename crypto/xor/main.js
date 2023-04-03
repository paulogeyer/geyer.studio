
const prompt = require("prompt-sync")();
const LangDetect = require('./lang_detect');
const OTR = require('./otr');
const ENGLISH_WORDS = load_dictionary("dict.txt");

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
const rangeOfNumbers = (a,b) => [...Array(b+1).keys()].slice(a);

function* ks(n) {
  arr = new Array(n).fill(0);
  arrl = arr.length;

  yield arr;

  while(arr[0] != 256) {
    arr[arrl-1]++;

    for(var i = 0; i < arrl; i++) {
      var idx = arrl-i;

      if(arr[idx]==256) {
	if(idx==arrl) {
	  break;
	  return false;
	} else {
	  arr[idx] = 0;
	  arr[idx-1]++;
	}
      }
    }

    yield arr;
  }
}

function load_dictionary(fname) {
  const fs = require('fs');
  var res = {};
  var data = [];

  try {
    data = fs.readFileSync(fname, 'utf8');
  } catch (err) {
    console.error(err);
  }

  var lines = data.split("\n");

  for(var i = 0; i < lines.length; i++)
    res[lines[i].toUpperCase()] = true;

  return res;
}

s1 = "315c4eeaa8b5f8aaf9174145bf43e1784b8fa00dc71d885a804e5ee9fa40b16349c146fb778cdf2d3aff021dfff5b403b510d0d0455468aeb98622b137dae857553ccd8883a7bc37520e06e515d22c954eba5025b8cc57ee59418ce7dc6bc41556bdb36bbca3e8774301fbcaa3b83b220809560987815f65286764703de0f3d524400a19b159610b11ef3e"

s2 = "0e0b213f26041e480b26217f27342e175d0e070a3c5b103e2526217f27342e175d0e077e263451150104"

s3 = "73626960647f6b206821204f21254f7d694f7624662065622127234f726927756d"

s4 = "foobar baz qux"

function hex_to_bytes(str) {
  var res = [];
  for (var i = 0; i < str.length; i+=2) {
    res.push(parseInt(str.slice(i,i+2), 16));
  }
  return res;
}

function bytes_to_hex(bytes) {
  var res = [];

  for(var i = 0; i < bytes.length; i++)
    res.push((bytes[i] < 16 ? '0' : '')+bytes[i].toString(16));
  return res.join('');
}

function str_to_bytes(str) {
  return str.split('').map(x => x.charCodeAt(0));
}

function bytes_to_str(bytes) {
  var res = [];
  for(var i = 0; i < bytes.length; i++) {
    res.push(String.fromCharCode(bytes[i]));
  }

  return res.join('');
}

function brute_crack(c, max_size=10) {
  var cbytes = str_to_bytes(c);

  for(var key_length = 4; key_length < max_size; key_length++) {
    var kg = ks(key_length);
    var counter = 0;
    console.log("key size: "+key_length);

    while(k = kg.next()) {
      if(k.done)
	break

      try {
	var r = OTR.decode(k.value, cbytes, true);
      } catch {
	console.log("error");
	console.log(k);
      }
      var rstr = bytes_to_str(r);
      var rstr_is_english = new LangDetect(rstr, ENGLISH_WORDS).is_english();
      if(rstr_is_english) {
	console.log("found key: "+k.value);
	console.log("decrypted text: "+rstr);
	if(rstr=="dawn") {
	  return None
	  break
	}
	// var input = prompt("ok?");
	// if(input=="y")
	//   return true;
      }
    }

  }
}

// brute_crack(s2, 11);
// brute_crack("c294814d", 6);

// 09e1c5f70a65ac519458e76ae156

var d = str_to_bytes("dawn");
// var ct = hex_to_bytes("09e1c5f70a65ac519458e7e53f36");
var ct = hex_to_bytes("6c73d5240a948c86981bc294814d");
var pt1 = str_to_bytes("attack at dawn");

var k = OTR.xor(pt1,ct);
// var r = OTR.xor(k,str_to_bytes("dusk"));
console.log(pt1);
console.log(bytes_to_str(OTR.xor(ct,k)));

var pt2 = str_to_bytes("attack at dusk");
var ct4 = OTR.xor(pt2, k);

console.log(bytes_to_hex(ct));
console.log(bytes_to_hex(ct4));
console.log(bytes_to_hex(OTR.xor(ct4,k)));
// console.log(bytes_to_hex(ct));
// console.log(bytes_to_hex(hex_to_bytes("09e1c5f70a65ac519458e7e53f36")));
