import Trace, { SortItem } from "../util/Trace";
import { swap } from "../util/utils";

const bubbleSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  for (let sortedIndex = numbers.length; sortedIndex >= 0; sortedIndex--) {
    for (let e = 0; e < sortedIndex - 1; e++) {
      trace.add(numbers, {
        a: [numbers[e], numbers[e + 1]],
        groups: [[e, e + 1]],
        sorted: numbers.slice(sortedIndex, numbers.length),
        comparisons: 1,
      });

      if (numbers[e].value > numbers[e + 1].value) {
        trace.add(numbers, {
          b: [numbers[e], numbers[e + 1]],
          groups: [[e, e + 1]],
          sorted: numbers.slice(sortedIndex, numbers.length),
        });
        swap(numbers, e, e + 1);
        trace.add(numbers, {
          b: [numbers[e], numbers[e + 1]],
          groups: [[e, e + 1]],
          sorted: numbers.slice(sortedIndex, numbers.length),
          swaps: 1,
        });
      }
    }
  }

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default bubbleSort;

export const name = "Bubble Sort";

export const colors = {
  a: "comparing values",
  b: "swapping values",
};

export const description = `Bubble Sort repeatedly compares adjacent items inside the unsorted prefix. Whenever the left
 value is larger than the right value, the pair is swapped, so the current maximum “bubbles” toward the end of the array.
 After every pass the sorted suffix grows from the right, and the process continues until no unsorted elements remain.`;

export const complexity = `The average and worst cases both take O(n^2) comparisons because each element may be checked
 against almost every other element. The best case is O(n) when the array is already sorted and we can finish after one
 pass with no swaps. Bubble Sort works in place, so the extra space usage stays O(1).`;
