function random(min: number = 0, max: number = 1) {
  if (min > max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  } else if (min == max) {
    return Math.floor(Math.random() * (max - (min - 1) + 1)) + (min - 1);
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default random;
