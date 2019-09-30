const { Point } = require("../lib/Point");
const { FQ } = require("../lib/Field");

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
  it('#point.isEqualTo() test1', () => {
    let x1 = '1397412833371199561739821073700250803657896243135281865271178377706226477552';
    let y1 = '5553249363258359534839534284775046287936738554202234124607038750383734798545';
    let x2 = '1397412833371199561739821073700250803657896243135281865271178377706226477552';
    let y2 = '5553249363258359534839534284775046287936738554202234124607038750383734798545';
    let point1 = new Point(x1, y1);
    let point2 = new Point(x2, y2);
    let result = point1.isEqualTo(point2);
    result.should.be.true;
  });
  it('#point.isEqualTo() test2', () => {
    let x1 = '1397412833371199561739821073700250803657896243135281865271178377706226477552';
    let y1 = '5553249363258359534839534284775046287936738554202234124607038750383734798541';
    let x2 = '1397412833371199561739821073700250803657896243135281865271178377706226477552';
    let y2 = '5553249363258359534839534284775046287936738554202234124607038750383734798545';
    let point1 = new Point(x1, y1);
    let point2 = new Point(x2, y2);
    let result = point1.isEqualTo(point2);
    result.should.be.false;
  });
  it('#point.fromX() test1', () => {
    let x = "121";
    let y = "17203749883372929187423129789711655305131231257277919836786222549224117445931";
    let point = new Point(x,y);
    let fromXPoint = Point.fromX(new FQ(x));
    fromXPoint.x.n.should.be.bignumber.equal(point.x.n);
    fromXPoint.y.n.should.be.bignumber.equal(point.y.n);
  });
  it('#point.fromX() test2', () => {
    let x = "122";
    let y = "17562579587342513510093605690919011444213684481872519288154677582226765862762";
    let point = new Point(x,y);
    let fromXPoint = Point.fromX(new FQ(x));
    fromXPoint.x.n.should.be.bignumber.equal(point.x.n);
    fromXPoint.y.n.should.be.bignumber.equal(point.y.n);
  });
  it('#point.fromX() test3', () => {
    let x = "123812789471982796";
    let y = "16655775389385982393659087401919948734970694980006454080392027588311748578703";
    let point = new Point(x,y);
    let fromXPoint = Point.fromX(new FQ(x));
    fromXPoint.x.n.should.be.bignumber.equal(point.x.n);
    fromXPoint.y.n.should.be.bignumber.equal(point.y.n);
  });
//  it('#point.fromY() test1 : fails, why??', () => {
//    //something wrong with zokrates_pycrypto
//    //lhs :  1042440
//    //rhs :  175855458236
//    //xsq :  14010721586289303518355661192337338542303383061659854108957703284567240613699
//    //x :  4486364337523381139525059177894655689486038969562536661510770592259200232169
//    // why Point.x != x ????
//    //Out[5]: Point(x=17401878534315894082721346567362619399062325430853497682187433594316608263448, y=1021)
//    let x = "17401878534315894082721346567362619399062325430853497682187433594316608263448";
//    let y = "1021";
//    let point = new Point(x,y);
//    let fromYPoint = Point.fromY(new FQ(y));
//    fromYPoint.x.n.should.be.bignumber.equal(point.x.n);
//    fromYPoint.y.n.should.be.bignumber.equal(point.y.n);
//  });
  it('#point.fromY() test2', () => {
    let x = "16696856622929395669886984435496750311470719675623160384963263454181866639831";
    let y = "1022";
    let point = new Point(x,y);
    let fromYPoint = Point.fromY(new FQ(y));
    fromYPoint.x.n.should.be.bignumber.equal(point.x.n);
    fromYPoint.y.n.should.be.bignumber.equal(point.y.n);
  });
  it('#point.fromY() test3', () => {
    let x = "17073035651359640367767834133046374442022723638496538643701087671485703769102";
    let y = "1025";
    let point = new Point(x,y);
    let fromYPoint = Point.fromY(new FQ(y));
    //console.log(fromYPoint.x.n.toFixed());
    fromYPoint.x.n.should.be.bignumber.equal(point.x.n);
    fromYPoint.y.n.should.be.bignumber.equal(point.y.n);
  });
});


describe('# Point Test2', () => {
  it('#point.fieldToPoint test1', () => {
    let x = 1;
    let added = 1;
    let expectedY = "8056089943188115187127505423794387611258186669587019044380033865514006931165";
    let expectedPoint = Point.fromX(new FQ(x+added));
    let data = Point.fieldToPoint(x);
    //console.log("x : ", data[0].x.n.toFixed());
    //console.log("y : ", data[0].y.n.toFixed());
    //console.log("added : ", data[1]);
    //console.log(fromYPoint.x.n.toFixed());
    expectedPoint.y.n.should.be.bignumber.equal(data.point.y.n);
    added.should.be.bignumber.equal(data.added);
  });
  it('#point.fieldToPoint test2', () => {
    let x = 3;
    let added = 2;
    let expectedY = "12637605842718731259587541614342552538212431772985772986870915547581179079457";
    let expectedPoint = Point.fromX(new FQ(x+added));
    let data = Point.fieldToPoint(x);
    //console.log("x : ", data[0].x.n.toFixed());
    //console.log("y : ", data[0].y.n.toFixed());
    //console.log("added : ", data[1]);
    //console.log(fromYPoint.x.n.toFixed());
    expectedPoint.y.n.should.be.bignumber.equal(data.point.y.n);
    added.should.be.bignumber.equal(data.added);
  });
  it('#point.fieldToPoint test3', () => {
    let x = 6;
    let added = 1;
    let expectedY = "21557326260047161571937478015891434743575710981169510902365692500083473754750";
    let expectedPoint = Point.fromX(new FQ(x+added));
    let data = Point.fieldToPoint(x);
    //console.log("x : ", data[0].x.n.toFixed());
    //console.log("y : ", data[0].y.n.toFixed());
    //console.log("added : ", data[1]);
    //console.log(fromYPoint.x.n.toFixed());
    expectedPoint.y.n.should.be.bignumber.equal(data.point.y.n);
    added.should.be.bignumber.equal(data.added);
  });
  it('#point.fieldToPoint test4', () => {
    let x = 10;
    let added = 3;
    let expectedY = "16049749370462080491200785952937458811188631533912150948500125266331871415458";
    let expectedPoint = Point.fromX(new FQ(x+added));
    let data = Point.fieldToPoint(x);
    //console.log("x : ", data[0].x.n.toFixed());
    //console.log("y : ", data[0].y.n.toFixed());
    //console.log("added : ", data[1]);
    //console.log(fromYPoint.x.n.toFixed());
    expectedPoint.y.n.should.be.bignumber.equal(data.point.y.n);
    added.should.be.bignumber.equal(data.added);
  });
  it('#point.fieldToPoint test5', () => {
    let x = 1567;
    let added = 1;
    let expectedY = "3614734581811021112067930491174322117937277086960340611032660415026533293162";
    let expectedPoint = Point.fromX(new FQ(x+added));
    let data = Point.fieldToPoint(x);
    //console.log("x : ", data[0].x.n.toFixed());
    //console.log("y : ", data[0].y.n.toFixed());
    //console.log("added : ", data[1]);
    //console.log(fromYPoint.x.n.toFixed());
    expectedPoint.y.n.should.be.bignumber.equal(data.point.y.n);
    added.should.be.bignumber.equal(data.added);
  });
  it('#point.fieldToPoint test6', () => {
    let x = new BigNumber("123812789471982795");
    let added = new BigNumber("1");
    let expectedY = "16655775389385982393659087401919948734970694980006454080392027588311748578703";
    let expectedPoint = Point.fromX(new FQ(x.plus(added)));
    let data = Point.fieldToPoint(x);
    //console.log("x : ", data[0].x.n.toFixed());
    //console.log("y : ", data[0].y.n.toFixed());
    //console.log("added : ", data[1]);
    expectedPoint.y.n.should.be.bignumber.equal(data.point.y.n);
    added.should.be.bignumber.equal(data.added);
  });
  it('#point.fieldToPoint test7', () => {
    let x = new BigNumber("123812789471982796184179856195620");
    let added = new BigNumber("2");
    let expectedY = "4028845804957276726353469080986769550628546219463556871225817816874536494623";
    let expectedPoint = Point.fromX(new FQ(x.plus(added)));
    let data = Point.fieldToPoint(x);
    //console.log("x : ", data[0].x.n.toFixed());
    //console.log("y : ", data[0].y.n.toFixed());
    //console.log("added : ", data[1]);
    expectedPoint.y.n.should.be.bignumber.equal(data.point.y.n);
    added.should.be.bignumber.equal(data.added);
  });
});
