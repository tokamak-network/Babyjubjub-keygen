const { PrivateKey, PublicKey } = require('../lib/KeyGenerator');

const chai = require('chai');
const BigNumber = require('bignumber.js');

chai.should();
chai.use(require('chai-bignumber')());

describe('# PublicKey Test', () => {
  it('#fromPrivate() Test', () => {
    let sk = '1997011358982923168928344992199991480689546837621580239342656433234255379025';
    let privKey = new PrivateKey(sk);
    let pubKey = PublicKey.fromPrivate(privKey);
    let expectedX = "14897476871502190904409029696666322856887678969656209656241038339251270171395";
    let expectedY = "16668832459046858928951622951481252834155254151733002984053501254009901876174";
    pubKey.p.x.n.should.be.bignumber.equal(expectedX);
    pubKey.p.y.n.should.be.bignumber.equal(expectedY);
  });
  it('#importPrivate() Test', () => {
    let sk = '1997011358982923168928344992199991480689546837621580239342656433234255379025';
    let privKey = new PrivateKey(sk);
    let dummyPublicKey = new PublicKey();
    let pubKey = dummyPublicKey.importPrivate(privKey);
    let expectedX = "14897476871502190904409029696666322856887678969656209656241038339251270171395";
    let expectedY = "16668832459046858928951622951481252834155254151733002984053501254009901876174";
    pubKey.p.x.n.should.be.bignumber.equal(expectedX);
    pubKey.p.y.n.should.be.bignumber.equal(expectedY);
  });
  it('#pubkey(random) works?', () => {
    let sk = PrivateKey.getRandObj().field;
    let privKey = new PrivateKey(sk);
    let pubKey = PublicKey.fromPrivate(privKey);
    let expectedX = pubKey.p.x.n;
    let expectedY = pubKey.p.y.n;
    pubKey.p.x.n.should.be.bignumber.equal(expectedX);
    pubKey.p.y.n.should.be.bignumber.equal(expectedY);
  });
  it('#pubkey.verify(sk) works?', () => {
    let sk = PrivateKey.getRandObj().field;
    let privKey = new PrivateKey(sk);
    let pubKey = PublicKey.fromPrivate(privKey);
    let result = pubKey.verifySk(privKey);
    result.should.be.true;
  });
});

describe('# PrivateKey Test', () => {
  it('#random().length == 32 Test', () => {
    let randObj = PrivateKey.getRandObj();
    let field = randObj.field;
    let hexString = randObj.hexString;
    hexString.length.should.be.equal(32);
  });
  // it('# fromPrivate() Test2', () => {
  //   let dummyPrivateKey = PrivateKey.dummySeed();
  //   let dummyPublicKey = new PublicKey();
  //   let targetPK = dummyPublicKey.fromPrivate(dummyPrivateKey);
  //   let expectedX = "14897476871502190904409029696666322856887678969656209656241038339251270171395";
  //   let expectedY = "16668832459046858928951622951481252834155254151733002984053501254009901876174";
  // });
});
