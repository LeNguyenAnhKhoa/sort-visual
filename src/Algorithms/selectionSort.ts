import Trace, { SortItem } from "../util/Trace";
import { swap } from "../util/utils";

const selectionSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  for (let sortedIndex = 0; sortedIndex < numbers.length; sortedIndex++) {
    let smallestIndex = sortedIndex;

    for (let e = sortedIndex; e < numbers.length; e++) {
      trace.add(numbers, {
        a: [numbers[e], numbers[smallestIndex]],
        sorted: numbers.slice(0, sortedIndex),
        comparisons: 1,
      });

      if (numbers[e].value < numbers[smallestIndex].value) {
        smallestIndex = e;
      }
    }

    trace.add(numbers, {
      b: [numbers[sortedIndex], numbers[smallestIndex]],
      sorted: numbers.slice(0, sortedIndex),
    });
    swap(numbers, sortedIndex, smallestIndex);
    trace.add(numbers, {
      b: [numbers[sortedIndex], numbers[smallestIndex]],
      sorted: numbers.slice(0, sortedIndex),
      swaps: 1,
    });
  }

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default selectionSort;

export const name = "Selection Sort";

export const colors = {
  a: "comparing values",
  b: "swapping values",
};

export const description = `Selection Sort scans the array from left to right. For each position it finds the smallest
 value inside the unsorted suffix and swaps it into the front of that suffix. The sorted prefix grows on the left while
 the unsorted portion shrinks, repeating until every element has been placed. The algorithm operates entirely in place.`;

export const complexity = `Selection Sort always performs O(n^2) comparisons because every index i scans the remaining
 elements to find the minimum. It performs only O(n) swaps, but that does not change the quadratic runtime. Because the
 work happens in place, the extra space usage is O(1).`;
