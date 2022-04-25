export const randomNumberInRange = (min, max) =>
  Math.random() * (max - min) + min

export const lerp = (a, b, n) => {
  return (1 - n) * a + n * b
}

export const map = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
