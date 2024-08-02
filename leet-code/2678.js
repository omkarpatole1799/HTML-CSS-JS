const details = ["7868190130M7522", "5303914400F9211", "9273338290F4010"];
const detials2 = ["1313579440F2036", "2921522980M5644"];

function checkMoreThanSixty(list) {
  // sol 1
  // let returnList = [];
  // list.forEach(el => {
  //   let age = el.slice(11, 13);
  //   if (age > 60) {
  //     returnList.push(age);
  //   }
  // });
  // return returnList.length;

  // sol2
  let count = 0;
  list.forEach(el => {
    const age = el.slice(11, 13);
    if (age > 60) count += 1;
  });

  return count;
}

console.log(checkMoreThanSixty(details));
console.log(checkMoreThanSixty(detials2));
