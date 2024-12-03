export function randomTable() {
  return Math.floor(Math.random() * 10) + 1;
}

export function randomInArray(input: any[]) {
  const index = Math.floor(Math.random()*input.length);
  return input[index];
}
