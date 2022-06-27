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
