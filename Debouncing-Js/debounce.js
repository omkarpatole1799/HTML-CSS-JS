function searchData(e) {
  console.log("===");
}

function debounceChange(callFn, delay) {
  let timer = null;
  return e => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callFn(e);
    }, delay);
  };
}

// const fn = debounceChange(searchData, 200);
