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
  console.log(Numtheory.jacobi(123, 20003).toFixed()); //1
  console.log(Numtheory.jacobi(1231, 20003).toFixed()); //-1
  console.log(Numtheory.jacobi(12311, 20003).toFixed()); //1
}

test();
