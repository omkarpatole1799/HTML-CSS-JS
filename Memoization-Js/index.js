const calcSum = n => {
  let sum = 0;
  for (let i = 0; i <= n; ++i) {
    sum += i;
  }
  return sum;
};
const memoizeSum = fun => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      let res = fun(n);
      cache[n] = res;
      return res;
    }
  };
};

console.time();
const _calcSum = memoizeSum(calcSum);
console.log(_calcSum(1000000000), "==_calcSum()==");
console.timeEnd();
console.time();
console.log(_calcSum(1099999999), "==_calcSum()==");
console.timeEnd();

console.time();
console.log(_calcSum(1000000000), "==_calcSum()==");
console.timeEnd();

console.time();
console.log(_calcSum(1099999999), "==_calcSum()==");
console.timeEnd();
