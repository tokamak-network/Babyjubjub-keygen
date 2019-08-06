const BigNumber = require('bignumber.js');
const { Point } = require('./Point');
const { FQ } = require('./Field');

class PrivateKey {
  constructor(seed = "1997011358982923168928344992199991480689546837621580239342656433234255379025"){
    this.seed = seed;
  }

  fromRandom() {
    return new FQ('1997011358982923168928344992199991480689546837621580239342656433234255379025')
  }
}

class PublicKey {
  constructor(pubkey = null) {
    this.p = pubkey;
  }

  fromPrivate(sk) {
    let generator = Point.generator();
    if(!sk instanceof PrivateKey){
      sk = new PrivateKey(sk)
    }
    let A = generator.mult(sk.seed);
    return new PublicKey(A);
  }
}

module.exports = {
  PrivateKey,
  PublicKey,
}
