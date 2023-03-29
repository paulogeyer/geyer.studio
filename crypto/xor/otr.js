
class OTR {

  static str_to_bytes(str) {
    return str.split('').map(x => x.charCodeAt(0));
  }

  static bytes_to_str(bytes) {
    return bytes.map(x => String.fromCharCode(x)).join('');
  }

  static bytes_to_hex(bytes) {
    var res = [];

    for(var i = 0; i < bytes.length; i++) {
      res.push(bytes[i].toString(16));
    }

    return res.join('');
  }

  static hex_to_bytes(h) {
    var res = [];

    for(var i = 0; i < h.length/2; i++) {
      res.push(parseInt(h.slice(i,i+2), 16));
    }

    return res;
  }

  static xor(k,m,repeat=false) {
    var k_length = k.length;
    var m_length = m.length;

    if(!repeat && (k_length < m_length)) {
      throw "key is smaller than the message";
    }

    var res = [];

    for(var i = 0; i < m.length; i++) {
      res.push(k[(i % k_length)] ^ m[i]);
    }
    return res;
  }    

  static encode(k,m,repeat=false) {
    return this.xor(k,m,repeat);
  }

  static decode(k,c,repeat=false) {
    return this.xor(k,c,repeat);
  }
}

c1 = "0e0b213f26041e480b26217f27342e175d0e070a3c5b103e2526217f27342e175d0e077e263451150104";

s1 = "foo bar";
s1_bytes = OTR.str_to_bytes(s1);
k = "asdbqwe";
k_bytes = OTR.str_to_bytes(k);

// console.log(OTR.encode(k, s1));

// console.log("s1: "+s1);
// console.log(s1_bytes);
// console.log(k_bytes);
// console.log(OTR.bytes_to_str(OTR.decode(k_bytes, OTR.encode(k_bytes,s1_bytes))));

console.log(OTR.hex_to_bytes(c1));
cypher = OTR.encode(OTR.str_to_bytes("secret"),
		    OTR.str_to_bytes("my test message"), true)

console.log(cypher);
console.log(OTR.bytes_to_hex(cypher));

text = OTR.decode(OTR.str_to_bytes("secret"), cypher, true);
console.log(OTR.bytes_to_str(text));
