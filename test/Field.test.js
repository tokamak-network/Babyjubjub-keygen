const { FQ, _inv } = require("../lib/Field");

const chai = require('chai');
const BigNumber = require('bignumber.js');

chai.should();
chai.use(require('chai-bignumber')());

describe('# Field Test', () => {
  it('#modulus should return 0', () => {
    let result = new FQ('21888242871839275222246405745257275088548364400416034343698204186575808495617');
    let expected = 0;
    result.n.should.be.bignumber.equal(expected);
  });
  it('#modulus +1 should return 1', () => {
    let result = new FQ('21888242871839275222246405745257275088548364400416034343698204186575808495618');
    let expected = 1;
    result.n.should.be.bignumber.equal(expected);
  });
  it('#FQ(1) should return 1', () => {
    let result = new FQ(1);
    let expected = 1;
    result.n.should.be.bignumber.equal(expected);
  });
  it('#FQ(1) + FQ(2) should equals to 3', () => {
    let field1 = new FQ(1);
    let field2 = new FQ(2);
    let result = field1.add(field2);
    let expected = 3;
    result.n.should.be.bignumber.equal(expected);
  });
  it('#FQ(2) * FQ(3) should equals to 6', () => {
    let field2 = new FQ(2);
    let field3 = new FQ(3);
    let result = field2.mul(field3);
    let expected = 6;
    result.n.should.be.bignumber.equal(expected);
  });
  it('#FQ(6) / FQ(2) should equals to 3', () => {
    let field6 = new FQ(6);
    let field2 = new FQ(2);
    let result = field6.div(field2);
    let expected = 3;
    result.n.should.be.bignumber.equal(expected);
  });
  it('#FQ(12) / FQ(4) should equals to 3', () => {
    let field12 = new FQ(12);
    let field4 = new FQ(4);
    let result = field12.div(field4);
    let expected = 3;
    result.n.should.be.bignumber.equal(expected);
  });
  it('#FQ(12).nega() should equals to FQ(-12)', () => {
    let field12 = new FQ(12);
    let result = field12.nega();
    let expected = new FQ(-12);
    result.n.should.be.bignumber.equal(expected.n);
  });
  it('#FQ(12).nega() + FQ(24) should equals to FQ(12)', () => {
    let fieldNeg12 = (new FQ(12)).nega();
    let field24 = new FQ(24);
    let result = fieldNeg12.add(field24);
    let expected = new FQ(12);
    result.n.should.be.bignumber.equal(expected.n);
  });
});

describe('# Extended euclidean mojular inverse Test', () => {
  it('#inv(101, 28) should be 5', () => {
    let a = new BigNumber('101');
    let n = new BigNumber('28');
    let expected = 5;
    _inv(a,n).should.be.bignumber.equal(expected);
  });
  it('#inv(111, 29) should be 23', () => {
    let a = new BigNumber('111');
    let n = new BigNumber('29');
    let expected = 23;
    _inv(a,n).should.be.bignumber.equal(expected);
  });
  it('#inv(27, 392) should be 363', () => {
    let a = new BigNumber('27');
    let n = new BigNumber('392');
    let expected = 363;
    _inv(a,n).should.be.bignumber.equal(expected);
  });
});
