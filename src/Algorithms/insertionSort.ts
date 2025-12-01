import Trace, { SortItem } from "../util/Trace";
import { range } from "../util/utils";

const insertionSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  for (const i of range(0, numbers.length)) {
    const value = numbers[i];
    let hole = i;

    trace.add(numbers, { a: [value], c: numbers.slice(0, i) });

    while (hole > 0) {
      trace.add(numbers, {
        a: [numbers[hole - 1], value],
        c: numbers.slice(0, i),
        comparisons: 1,
      });

      if (numbers[hole - 1].value <= value.value) {
        break;
      }

      numbers[hole] = numbers[hole - 1];
      trace.add(numbers, {
        b: [numbers[hole]],
        c: numbers.slice(0, i + 1),
        swaps: 1,
      });
      hole--;
    }

    numbers[hole] = value;

    trace.add(numbers, {
      b: [numbers[hole]],
      c: numbers.slice(0, i + 1),
      swaps: hole === i ? 0 : 1,
    });
  }

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default insertionSort;

export const name = "Insertion Sort";

export const colors = {
  a: "selected value",
  b: "write selected value",
  c: "sorted area",
};

export const description = `Insertion Sort treats the left side as the sorted portion. For every new element it stores
 the value, shifts any larger elements in the sorted area one position to the right, and inserts the value where it
 belongs. Once placed, the sorted region expands by one and the process repeats until the array is exhausted.`;

export const complexity = `Average and worst cases take O(n^2) comparisons and shifts because each new item might move
 across the entire sorted prefix. When the input is already or nearly sorted, only one pass is required so the best case
 is O(n). Only a temporary variable is needed for the current value, so the extra space remains O(1).`;
