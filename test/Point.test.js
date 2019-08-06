const { Point } = require("../lib/Point");

const chai = require('chai');
const BigNumber = require('bignumber.js');

chai.should();
chai.use(require('chai-bignumber')());

describe('# Point Test', () => {
  it('#constructor test', () => {
    let x = "1";
    let y = "2";
    let point = new Point(x,y);
    let expectedX = "1";
    let expectedY = "2";
    point.x.n.should.be.bignumber.equal(expectedX);
    point.y.n.should.be.bignumber.equal(expectedY);
  });
  it('#invalidity test', () => {
    let x = "1";
    let y = "2";
    let point = new Point(x,y);
    let pointValidity = point.isValid();
    pointValidity.should.be.false;
  });
  it('#generator should be equal to (165~, 208~)', () => {
    let gX = '16540640123574156134436876038791482806971768689494387082833631921987005038935';
    let gY = '20819045374670962167435360035096875258406992893633759881276124905556507972311';
    let generatorPoint = Point.generator();
    generatorPoint.x.n.should.be.bignumber.equal(gX);
    generatorPoint.y.n.should.be.bignumber.equal(gY);
  });
  it('#generator should be valid', () => {
    let generatorPoint = Point.generator();
    let generatorValidity = generatorPoint.isValid();
    generatorValidity.should.be.true;
  });
  it('#infinity should be (0,1)', () => {
    let zero = 0;
    let one = 1;
    let infinityPoint = Point.infinity();
    infinityPoint.x.n.should.be.bignumber.equal(zero);
    infinityPoint.y.n.should.be.bignumber.equal(one);
  });
  it('#infinity + generator() should be (165~, 208~)', () => {
    let resultX = '16540640123574156134436876038791482806971768689494387082833631921987005038935';
    let resultY = '20819045374670962167435360035096875258406992893633759881276124905556507972311';
    let infinityPoint = Point.infinity();
    let gPoint = Point.generator();
    let result = infinityPoint.add(gPoint);
    result.x.n.should.be.bignumber.equal(resultX);
    result.y.n.should.be.bignumber.equal(resultY);
  });
  it('#1 point.double() should be point.add(point)', () => {
    let x = 5;
    let y = 6;
    let point = new Point(x,y);
    let doublePoint = point.double();
    let sumPoint = point.add(point);
    doublePoint.x.n.should.be.bignumber.equal(sumPoint.x.n);
    doublePoint.y.n.should.be.bignumber.equal(sumPoint.y.n);
  });
  it('#2 point.double() should be point.add(point)', () => {
    let x = 10;
    let y = 300;
    let point = new Point(x,y);
    let doublePoint = point.double();
    let sumPoint = point.add(point);
    doublePoint.x.n.should.be.bignumber.equal(sumPoint.x.n);
    doublePoint.y.n.should.be.bignumber.equal(sumPoint.y.n);
  });
  it('#point.g().double() is (173~, 200~)', () => {
    let gXsq = '17324563846726889236817837922625232543153115346355010501047597319863650987830';
    let gYsq = '20022170825455209233733649024450576091402881793145646502279487074566492066831';
    // let dummyPoint = new Point(1,1);
    let gPoint = Point.generator();
    let gSQPoint = gPoint.double();
    gSQPoint.x.n.should.be.bignumber.equal(gXsq);
    gSQPoint.y.n.should.be.bignumber.equal(gYsq);
  });
  it('#point.g().double() is point.g().add(point.g())', () => {
    let gPoint = Point.generator();
    let gSQPoint = gPoint.double();
    let gAddedPoint = gPoint.add(gPoint);
    gSQPoint.x.n.should.be.bignumber.equal(gAddedPoint.x.n);
    gSQPoint.y.n.should.be.bignumber.equal(gAddedPoint.y.n);
  });
  it('#point.g().double() should be valid', () => {
    let gPoint = Point.generator();
    let gSQPoint = gPoint.double();
    let gSQPointValidity = gSQPoint.isValid();
    gSQPointValidity.should.be.true;
  });
  it('#point.g().mult(10) should be (852~, 341~)', () => {
    let gX10 = '8524638968817233115944080765171605626139396302823876497747733543564708150665';
    let gY10 = '3416005927722160449208315591315100288449235491408795857552325222841848380255';
    let gPoint = Point.generator();
    let result = gPoint.mult(10);
    let expected = new Point(gX10, gY10);
    result.x.n.should.be.bignumber.equal(expected.x.n);
    result.y.n.should.be.bignumber.equal(expected.y.n);
  });
  it('#point.g().mult(10000) should be (139~, 555~)', () => {
    let gX10 = '1397412833371199561739821073700250803657896243135281865271178377706226477552';
    let gY10 = '5553249363258359534839534284775046287936738554202234124607038750383734798545';
    let gPoint = Point.generator();
    let result = gPoint.mult(10000);
    let expected = new Point(gX10, gY10);
    result.x.n.should.be.bignumber.equal(expected.x.n);
    result.y.n.should.be.bignumber.equal(expected.y.n);
  });
});
