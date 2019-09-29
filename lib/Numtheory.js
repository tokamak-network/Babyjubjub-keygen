// This code is inspired from https://github.com/Zokrates/pycrypto/blob/master/zokrates_pycrypto/field.py

const assert = require('assert');
const BigNumber = require('bignumber.js');
const constants = require('./JubjubConstants.js');

//follow python's % operator
BigNumber.config({ MODULO_MODE: 3 });

class Numtheory {
  static modularExp(base, exponent, modulus=constants.FIELD_MODULUS) {
    if(exponent < 0) throw new Error("exponet %d should positive");
    let bBase =  new BigNumber(base);
    return bBase.pow(exponent, modulus);
  }

  static polynomialReduceMod(poly, polymod, p) {
    assert.ok(polymod.slice(-1)[0]);
    assert.ok(polymod.length > 1);

    let polyTemp = poly;

    while(polyTemp.length >= polymod.length){
      if(polyTemp.slice(-1)[0] != 0){
        for(let i of [...Array(polymod.length+1).keys()].slice(2)){
          let lastPoly = polyTemp[polyTemp.length-1];
          let polyi = polyTemp[polyTemp.length-i];
          let polymodi = polymod[polymod.length-i];
          polyTemp[polyTemp.length-i] = polyi.minus(lastPoly.times(polymodi)).mod(p);
        }
      }
      polyTemp = polyTemp.slice(0, -1);
    }
    return polyTemp;
  }

  static jacobi(a, n) {

    let s;

    let bigA = new BigNumber(a);
    let bigN = new BigNumber(n);

    //check if n is primenumber and bigger then 3
    assert.ok(bigN.gte(3));
    assert.ok(bigN.mod(2).eq(1));

    //a mod n
    let newA = bigA.mod(bigN);

    //if a is  0 or 1, it returns itself
    if(newA.eq(0)) return new BigNumber(0);
    if(newA.eq(1)) return new BigNumber(1);

    let a1 = newA;
    let e = new BigNumber(0);

    while(a1.mod(2).eq(0)){
      a1 = a1.idiv(2);
      e = e.plus(1);
    }

    if(e.mod(2).eq(0) || bigN.mod(8).eq(1) || bigN.mod(8).eq(7)){
      s = new BigNumber(1);
    } else {
      s = new BigNumber(-1);
    }

    if(a1.eq(1)){
      return s;
    }
    if(bigN.mod(4).eq(3) && a1.mod(4).eq(3)){
      s.s = -s.s;
    }
    return s.times(Numtheory.jacobi(bigN.mod(a1), a1));
  }
}

function test(){
  //jacobi test
  console.log(Numtheory.jacobi(123, 20003).toFixed()); //1
  console.log(Numtheory.jacobi(1231, 20003).toFixed()); //-1
  console.log(Numtheory.jacobi(12311, 20003).toFixed()); //1

  // Polynomial reduce mod test1
  let poly = new Array(50, 60, 70).map(x => new BigNumber(x));
  let polyMod = new Array(6, -5, 1).map(x => new BigNumber(x));
  let p = new BigNumber(7);
  //should be [1, 4]
  console.log(Numtheory.polynomialReduceMod(poly, polyMod, p).map(x=> x.toFixed()));

  // Polynomial reduce mod test2
  let poly2 = new Array(50, 60, 80).map(x => new BigNumber(x));
  let polyMod2 = new Array(6, -5, 1).map(x => new BigNumber(x));
  let p2 = new BigNumber(7);
  //should be [4, 5]
  console.log(Numtheory.polynomialReduceMod(poly2, polyMod2, p2).map(x=> x.toFixed()));
}

test();
