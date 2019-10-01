# Babyjubjub-keygen

Babyjubjub-keygen is a library for [Jubjub](https://z.cash/technology/jubjub/) based public/private key generator.

## Getting Started

### Install

```bash
npm install babyjubjub
```

### Example

#### Key Generation

```javascript
const { PublicKey, PrivateKey } = require('babyjubjub');

//get PrivateKey object(field, hexstring)
let sk = PrivateKey.getRandObj().field;
//get PrivateKey object from field(or hexstring)
let privKey = new PrivateKey(sk);
//get PublicKey object from privateKey object
let pubKey = PublicKey.fromPrivate(privKey);

//PublicKey.p is <Point> Class
console.log(pubKey.p);

//return Pub Key (X and Y) --> <Field> Class
console.log(pubKey.p.x);
console.log(pubKey.p.y);

//Get <BigInteger> Class (X, Y)
console.log(pubKey.p.x.n);
console.log(pubKey.p.y.n);
```

#### Encryption and Decryption

```javascript
const { PublicKey, PrivateKey, Jub } = require('babyjubjub');

//get PrivateKey object(field, hexstring)
let sk = PrivateKey.getRandObj().field;
//get PrivateKey object from field(or hexstring)
let privKey = new PrivateKey(sk);
//get PublicKey object from privateKey object
let pubKey = PublicKey.fromPrivate(privKey);

//message is "abc" = ["97","98","99"]
let message = ["97","98","99"];
let random = "12314121";

//Encryption
//input : message, publicKey, randomNumber
let cipher = Jub.encrypt(message, pubKey, random);
console.log(cipher);
//[
//  {"c1": {"x":.. , "y" :..}}, {"c2" : {"x":.. , "y" :..}}, {"added": ...},
//  ...
//]

//Decryption
//input : cipher, privateKey
let decrypted = Jub.decrypt(cipher, sk);
console.log(decrypted);
//["97", "98", "99"]

```
