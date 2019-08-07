const assert = require('assert');

const BigNumber = require('bignumber.js');
const { Point } = require('./Point');
const { FQ } = require('./Field');

//for buffer reserse
const reverse = require("buffer-reverse");

//TODO : Should check whether this library's random is cryptographically safe
var crypto = require('crypto');

class PrivateKey {
  constructor(sk = ""){
    if(sk instanceof PrivateKey){
      this.s = sk.s;
    }
    this.s = new FQ(sk);
  }

  static getRandObj(len=32){
    let randomHex = PrivateKey._randomValueHex(len);
    let bf = Buffer.from(randomHex, 'hex');
    let littleEndianRandom = "0x" + reverse(bf).toString('hex');
    // let bigEndianRandom = "0x" + bf.toString('hex');
    // console.log('randomHex : ', randomHex, randomHex.length);
    // console.log('littleEndian :', littleEndianRandom);
    let bn = new BigNumber(littleEndianRandom);
    return {
      field : new FQ(bn),
      hexString : randomHex
    }
  }

  static _randomValueHex(len=32) {
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, len); // return required number of characters
  }

}

class PublicKey {
  constructor(pubkey=null) {
    //TODO : if pubkey.p == null, this.p == null
    if(pubkey instanceof PublicKey){
      this.p = pubkey.p;
    } else if(pubkey instanceof Point){
      this.p = pubkey;
      // console.log(this.p);
    } else if(pubkey == null){
      this.p = pubkey;
    } else {
      assert(false, 'pubkey should be PublicKey or Point');
    }
  }

  importPrivate(sk) {
    let generator = Point.generator();
    if(!(sk instanceof PrivateKey)){
      sk = new PrivateKey(sk);
    }
    this.p = generator.mult(sk.s);
    return this;
  }

  static fromPrivate(sk) {
    let generator = Point.generator();
    if(!(sk instanceof PrivateKey)){
      sk = new PrivateKey(sk);
    }
    let A = generator.mult(sk.s);
    return new PublicKey(A);
  }

  verifySk(sk){
    assert(this.p != null, "publicKey should be initialized");
    let generator = Point.generator();
    if(!(sk instanceof PrivateKey)){
      sk = new PrivateKey(sk);
    }
    return this.p.isEqualTo(generator.mult(sk.s));
  }
}

module.exports = {
  PrivateKey,
  PublicKey,
}
