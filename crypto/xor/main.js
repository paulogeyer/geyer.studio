
const LangDetect = require('./lang_detect');
const OTR = require('./otr');
const ENGLISH_WORDS = load_dictionary("dict.txt");

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
const rangeOfNumbers = (a,b) => [...Array(b+1).keys()].slice(a);

const nlst = rangeOfNumbers(0,255);

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
  for (var i = 0; i < str.length/2; i++) {
    res.push(parseInt(str.slice(i,i+2), 16));
  }
  return res;
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
  var idx = [];
  var cbytes = str_to_bytes(c);

  for(var key_length = 1; key_length < max_size; key_length++) {
    idx = idx.concat([nlst]);
    ks = cartesian(...idx);

    for(var kid = 0; kid < ks.length; kid++) {
      var r = OTR.decode(ks[kid], cbytes, true);
      var rstr = bytes_to_str(r);
      var rstr_is_english = new LangDetect(rstr).is_english();
      if(rstr_is_english) {
	console.log("found key: "+ks[kid]);
	return true;
      }
    }

    console.log(ks[0]);
  }
}

// console.log(hex_to_bytes(s2));
// console.log(nlst[nlst.length-1]);

brute_crack(s1, 11);
