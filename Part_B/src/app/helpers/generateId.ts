export function generateId() {
  const maxNumber: number = 10000;

  return Math.floor(Math.random() * maxNumber);
}