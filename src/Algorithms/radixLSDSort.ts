import Trace, { SortItem } from "../util/Trace";

const radixLSDSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  if (numbers.length <= 1) {
    trace.add(numbers, { sorted: [...numbers] });
    return trace.export();
  }

  const values = numbers.map((item) => item.value);
  const minValue = Math.min(...values);
  const offset = minValue < 0 ? -minValue : 0;
  const maxValue = Math.max(...values) + offset;

  const getDigit = (value: number, place: number) =>
    Math.floor(value / place) % 10;

  let place = 1;

  do {
    const buckets: SortItem[][] = Array.from({ length: 10 }, () => []);
    const snapshot = [...numbers];

    snapshot.forEach((item) => {
      const normalized = item.value + offset;
      const digit = getDigit(normalized, place);
      buckets[digit].push(item);
    });

    const bucketRanges: Array<[number, number]> = [];
    let writeIndex = 0;
    let swapsThisPass = 0;

    buckets.forEach((bucket) => {
      if (!bucket.length) {
        return;
      }

      const start = writeIndex;

      bucket.forEach((item) => {
        numbers[writeIndex] = item;
        writeIndex++;
        swapsThisPass++;
      });

      bucketRanges.push([start, writeIndex - 1]);
    });

    trace.add(numbers, {
      groups: bucketRanges,
      swaps: swapsThisPass,
    });

    place *= 10;
  } while (Math.floor(maxValue / place) > 0);

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default radixLSDSort;

export const name = "Radix LSD Sort";

export const colors = {};

export const description = `Radix LSD Sort distributes the numbers into ten buckets based on each digit, starting from the
 least-significant digit and moving left. After placing the values we concatenate the buckets in order so the relative
 order of equal digits stays stable, then repeat for the next digit until no more significant digits remain.`;

export const complexity = `With base 10 the running time is O(d * (n + 10)) ≈ O(n * d), where d is the number of digits in
 the largest absolute value. The algorithm is stable but needs O(n + 10) extra space to store the buckets during each
 pass.`;
