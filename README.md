# TYPE SCRIPT!!!!!!!!

[typescript](https://typescript-kr.github.io/pages/basic-types.html)

## USE TYPESCRIPT!!!!!!!!

\*\*> npm init -y

> npm i -D typescript // devDependencies 주입
> touch src/ index.ts , tsconfig.json
> npm run build

```json
// tsconfig.json
{
  "include": ["src"],
  "compilerOptions": {
    "outDir": "build",
    "target": "ES6",
    "lib": ["ES6", "DOM"],
    "strict": true,
    "allowJs": true
    // "moduleResolution": "node"
  }
}

// package.json
"scripts": {
    "build": "tsc"
  },
```

[lib](https://www.typescriptlang.org/tsconfig#lib)

## JSDoc

- .d.ts

```javascript
// myPackage.d.ts
interface Config {
  url: string;
}

declare module 'myPackage' {
  function init(config: Config): boolean;
  function exit(code: number): number;
}

// index.ts
import { init, exit } from 'myPackage';
exit(1);
```

- js 이용
  - allowJs : true로 지정해줘야함

```javascript
// myPackage.js
// @ts-check

// JSDoc
/**
 * Init Project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
  return true;
}

/**
 * Exit program
 * @param {number} code
 * @returns number
 */
export function exit(code) {
  return code + 1;
}

//index.ts
import { init, exit } from './myPackage.js';

exit(1);
```

## ts-node

> npm i -D ts-node
> npm i nodemon

```json
"scripts": {
    "build": "tsc",
    // npm run build && npm run start 비효율
    "start": "node build/index.js",
    // ts-node, nodemon COMBO
    "dev": "nodemon --exec ts-node src/index.ts"
},
```

## Block

```json
{
  "include": ["src"],
  "compilerOptions": {
    "outDir": "build",
    "target": "ES6",
    "lib": ["ES6"],
    "strict": true,
    "esModuleInterop": true,
    "module": "CommonJS"
  }
}
```

```javascript
// index.ts
// import * as crypto from 'crypto';

// "esModuleInterop": true 로 해결할 수 있음
import crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return toHash;
  }
}
```

## DefinitelyTyped

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

- node 패키지의 모든 타입을 보고 싶을 경우
  > npm i -D @types/node
  > npm i -D @types/axon 같이 이름을 붙이면 됨

---

# SO TYPESCRIPT???

## implicit types vs explicit types

- type checker가 타입을 추론함

```javascript
let a = 'hello'; // implicit types
let b: boolean = false; // explicit types

let c = [1]; // number[] 타입이므로 push가 안됨
c.push('1');

let c1: number[] = []; // 명시적으로
c.push(1);
```

```javascript
// Alias type
type Player = {
  name: string,
  age?: number, // age? : number | undefined
};

// optional types

const jay: Player = {
  name: 'jay',
};

const ko: Player = {
  name: 'ko',
  age: 12,
};

// if (player.age && player.age < 10) {
//     // player.age를 확인을 해줘야함
// }

// return type Player
function playerMaker(name: string): Player {
  return {
    name,
  };
}

const playerMaker2 = (name: string): Player => ({ name });

const nico = playerMaker('nico');
nico.age = 12;
```

---

## tuple-readonly , any

```javascript
const numbers:readonly number[] =[1,2,3,4,5]

numbers.push(0) // push 안됨


// Tuple
// readonly와 같이 씀

const player: readonly[string, number, boolean] = [
    "nico", 1, true
]

// any
1. any는 typescript를 빠져나오는 방법

const a : any[] = [1,2,3,4]
const b : any = false

a + b // no error
```

## unknown, void, never

```javascript
// unknown
// 변수의 타입을 미리 알지 못할 때 사용

let a: unknown;

if (typeof a === 'number') {
  let b = a + 1;
}

if (typeof a === 'string') {
  let b = a.toUpperCase();
}

// void

function hello1(): void {
  console.log('hello!');
}

// never
// 함수가 절대 return하지 않을 때 발생
// ex) 함수가 예외를 발생시킬 때
// type이 2가지 일 수도 있을 때 발생할 수 있음

function hello2(): never {
  // return 'x' // error
  throw new Error('XXX');
}

function hello3(name: string | number) {
  if (typeof name === 'number') {
    name; // number
  } else if (typeof name === 'string') {
    name; // string
  } else {
    name; // never
  }
}
```

---

## Call Signatures

- 함수를 타입을 호출하는 방법

```javascript
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

## overloading

- 함수가 여러 개의 다른 call signatures를 가지고 있을 때 발생

```javascript
// Nextjs

// Router.push("/home")

// Router.push({
//   path: '/home',
//   state: 1,
// });

type Config = {
  path: string,
  state: object,
};

type Push = {
  (path: string): void,
  (config: Config): void,
};

const push: Push = (config) => {
  if (typeof config === 'string') {
    console.log(config);
  } else {
    console.log(config.path, config.state);
  }
};

type Add = {
  (a: number, b: number): number,
  (a: number, b: number, c: number): number,
};

const add: Add = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};
```

## polymorphism(다형성) / generics

```javascript
// type SuperPrint = {
//     <TypePlaceHolder>(arr: TypePlaceHolder[]): TypePlaceHolder
// }

type SuperPrint = <T>(arr: T[]) => T;

const superPrint: SuperPrint = (arr) => arr[-1];

const a = superPrint([1, 2, 3, 4]);
const b = superPrint([true, false, true, true]);
const c = superPrint([true, false, true, true, 1, 2, 3, 'hello']);
```

```javascript
function superPrint<T>(a: T[]) {
  return a[a.length - 1];
}

const a = superPrint([1, 2, 3, 4]);
// overwrite
const b = superPrint < boolean > [true, false, true, true];
const c = superPrint([true, false, true, true, 1, 2, 3, 'hello']);
```

```javascript
type Player<E> = {
    name: string
    extraInfo: E

}

const nico: Player<{ favFood: string }> = {
    name: 'nico',
    extraInfo: {
        favFood: 'kimchi'
    }
}

const lynn: Player<null> ={
    name:'lynn',
    extraInfo:null
}
```

```javascript
type A = Array<number>;

let a: A = [1, 2, 3, 4];

// function printAllNumbers(arr:number[]){}
function printAllNumbers(arr: Array<number>) {}
```

---

## Class

```javascript
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    protected nickName: string
  ) { }
  abstract getNickname(): void
  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

class Player extends User {
  getNickname() {
    console.log(this.nickName)
  }
}

const nico = new Player('nico', 'las', '니코')

nico.getFullName()
```

```javascript
// code challenge
type Words = {
  [key: string]: string;
};

class Dictionary {
  private words: Words;
  constructor() {
    this.words = {};
  }

  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
  delete(word: Word) {
    delete this.words[word.term];
  }
  update(word: Word, def: string) {
    if (this.words[word.term] !== def) {
      this.words[word.term] = def;
    }
  }
  changeTerm(word: Word, term: string) {
    if (this.words[word.term] !== term) {
      const result = (this.words[word.def] = term);
      console.log(result);
    }
  }
}

class Word {
  constructor(public term: string, public def: string) {}
  print(word: Word) {
    console.log(`${this.term} : ${this.def}`);
  }
}

const kimchi = new Word('kimchi', '한국음식');
const kimchi2 = new Word('kimchi2', '한국음식2');

const dictionary = new Dictionary();

console.log(dictionary.def('kimchi'));

dictionary.add(kimchi);

dictionary.add(kimchi2);

dictionary.changeTerm(kimchi, '김치아니므니다');
console.log(dictionary.def('kimchi'));

```

## Interface

- Object의 shape을 결정하는 방법
  1. type
  2. interface
- type이 interface에 비해 더 활용도가 높음

```javascript
type Team = 'red' | 'blue' | 'yello';
type Health = 1 | 5 | 10;

type Player = {
  nickname: string,
  team: Team,
  healthbar: Health,
};

const nico: Player = {
  nickname: 'nico',
  team: 'blue',
  healthbar: 5,
};
```

```javascript
// 둘다 같은 뜻임
// interface User {
//     name: string,

// }

// interface Player extends User {

// }

// const nico: Player = {
//     name: 'niko'
// }

type User = {
  name: string,
};

type Player = User & {};

const nico: Player = {
  name: 'niko',
};
```

```javascript
// 축적시킬 수 있음
interface User {
  name: string;
}

interface User {
  lastName: string;
}

interface User {
  health: number;
}

const nico: User = {
  name: 'nico',
  lastName: 'lalala',
  health: 1345,
};
```

- implements를 사용하면 js 코드가 가벼워짐
  - private, protected 를 사용 못함
- interface를 type으로 쓸 수 있음
- interface를 return 할 수 있음

```javascript
// abstract class User{
//     constructor(
//         protected firstName : string,
//         protected lastName : string,
//     ){}
//     abstract sayHi(name:string):string
//     abstract fullName():string
// }


// class Player extends User{
//     fullName(){
//         return `${this.firstName} ${this.lastName}`
//     }
//     sayHi(name:string){
//         return `Hello ${name}, My name is ${this.fullName()}`
//     }
// }

interface User {
    firstName: string,
    lastName: string,

    sayHi(name: string): string
    fullName(): string
}


class Player implements User {
    constructor(
        public firstName: string,
        public lastName: string,
    ) { }
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string) {
        return `Hello ${name}, My name is ${this.fullName()}`
    }
}


function makeUser(user: User): User {
    return ({
        firstName: 'nico',
        lastName: 'las',
        fullName: () => `hi`,
        sayHi: (name) => 'xxx'
    })
}

makeUser({
    firstName: 'nico',
    lastName: 'las',
    fullName: () => `hi`,
    sayHi: (name) => 'xxx'
})

```

## Type vs Interface

- 둘 다 object shape, type을 알려주는 용도
- Type
  - object의 모양을 설명
  - type alias를 만드는 것
  - type을 특정된 값으로 만드는 것
  - property 를 추가하기 위해 다시 선언할 수 없음
  - 상속하려면 다른 type을 만들어 object를 합쳐야함

```javascript
type PlayerA = {
  name: string,
};

type PlayerAA = PlayerA & {
  lastName: string,
};

const playerA: PlayerAA = {
  name: 'nico',
  lastName: 'las',
};

interface PlayerB {
  name: string;
}

interface PlayerBB extends PlayerB {
  lastName: string;
}

interface PlayerBB {
  health: number;
}

const playerB: PlayerBB = {
  name: 'nico',
  lastName: 'las',
  health: 14,
};
```

- 둘다 추상화할 수 있음
- class 나 object의 모양을 정의하고 싶으면 interface 나머지는 type

```javascript
type PlayerA = {
    firstName: string
}

interface PlayerB {
    firstName: string
}

class User implements PlayerA, PlayerB {
    constructor(
        public firstName:string
    ){}
}
```

[interface vs type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

## Polymorphism

```javascript
interface SStorage<T> {
    [key: string]: T
}

class LocalStorage<T> {
    private storage: SStorage<T> = {}
    set(key: string, value: T) {
        this.storage[key] = value
    }
    remove(key: string) {
        delete this.storage[key]
    }
    get(key: string): T {
        return this.storage[key]
    }
    clear() {
        this.storage = {}
    }
}

const stringStorage = new LocalStorage<string>()
const booleanStorage = new LocalStorage<boolean>()
```
