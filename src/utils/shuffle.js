// modern fisher yates shuffle algorithm

export const shuffle = (items) => {
  let lastIndex = items.length - 1;
  while (lastIndex > 0) {
    const randIndex = Math.floor(Math.random() * lastIndex + 1);
    // swap
    const temp = items[lastIndex];
    items[lastIndex] = items[randIndex];
    items[randIndex] = temp;

    lastIndex--;
  }

  return items;
};
