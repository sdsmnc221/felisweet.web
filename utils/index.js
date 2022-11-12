export const randomNumberInRange = (min, max) =>
  Math.random() * (max - min) + min

export const lerp = (a, b, n) => {
  return (1 - n) * a + n * b
}

export const map = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export const shuffle = ([...arr]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}
