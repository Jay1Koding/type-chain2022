# TYPE SCRIPT!!!!!!!!

[typescript](https://typescript-kr.github.io/pages/basic-types.html)

## USE TYPESCRIPT!!!!!!!!

> npm init -y
> npm i -D typescript // devDependencies 주입
> touch src/ index.ts , tsconfig.json
> npm run build

```json
// tsconfig.json
{
  "include": ["src"],
  "compilerOptions": {
    "outDir": "build",
    "target": "ES6"
    // "moduleResolution": "node"
  }
}

// package.json
"scripts": {
    "build": "tsc"
  },
```

---

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
