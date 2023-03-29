
class OTR {

  static str_to_bytes(str) {
    return str.split('').map(x => x.charCodeAt(0));
  }

  static bytes_to_str(bytes) {
    return bytes.map(x => String.fromCharCode(x)).join('');
  }

  static hex_to_bytes(h) {
    var res = [];

    for(var i = 0; i < h.length/2; i++) {
      res.push(parseInt(h.split(i,i+2), 16));
    }

    return res;
  }

  static xor(k,m) {
    var res = [];

    for(var i = 0; i < m.length; i++) {
      res.push(k[i]^m[i]);
    }
    return res;
  }    

  static encode(k,m) {
    return this.xor(k,m);
  }

  static decode(k,c) {
    return this.xor(k,c);
  }
}

s1 = "foo bar";
s1_bytes = OTR.str_to_bytes(s1);
k = "asdbqwe";
k_bytes = OTR.str_to_bytes(k);

// console.log(OTR.encode(k, s1));

console.log("s1: "+s1);
console.log(s1_bytes);
console.log(k_bytes);
console.log(OTR.bytes_to_str(OTR.decode(k_bytes, OTR.encode(k_bytes,s1_bytes))));
