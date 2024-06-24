export function createDateArray(length: number) {
  const timestamps: number[] = [];

  for (let i = 0; i < length; i++) {
    const seconds = i * 30;
    const milliseconds = seconds * 1000;
    timestamps.push(milliseconds);
  }
  return timestamps;
}
