import Trace, { SortItem } from "../util/Trace";
import { swap } from "../util/utils";

const quickSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  const _quickSort = (low: number, high: number) => {
    if (low >= high) {
      return;
    }

    const { leftPartition, rightPartition } = partition(low, high);

    if (low < rightPartition) {
      _quickSort(low, rightPartition);
    }

    if (leftPartition < high) {
      _quickSort(leftPartition, high);
    }
  };

  const partition = (low: number, high: number) => {
    const pivotIndex = Math.floor((low + high) / 2);
    const pivotItem = numbers[pivotIndex];
    const pivotValue = pivotItem.value;
    let left = low;
    let right = high;

    const recordPointers = (
      leftIndex: number | null,
      rightIndex: number | null,
      comparisons = 0
    ) => {
      const entry: {
        a?: SortItem[];
        b?: SortItem[];
        c?: SortItem[];
        d: SortItem[];
        groups: Array<[number, number]>;
        comparisons?: number;
        swaps?: number;
      } = {
        d: [pivotItem],
        groups: [[low, high]],
      };

      if (
        leftIndex !== null &&
        leftIndex >= 0 &&
        leftIndex < numbers.length
      ) {
        entry.b = [numbers[leftIndex]];
      }

      if (
        rightIndex !== null &&
        rightIndex >= 0 &&
        rightIndex < numbers.length
      ) {
        entry.c = [numbers[rightIndex]];
      }

      if (comparisons) {
        entry.comparisons = comparisons;
      }

      trace.add(numbers, entry);
    };

    const recordSwap = (leftIndex: number, rightIndex: number, swapped = false) => {
      trace.add(numbers, {
        a: [numbers[leftIndex], numbers[rightIndex]],
        b: [numbers[leftIndex]],
        c: [numbers[rightIndex]],
        d: [pivotItem],
        groups: [[low, high]],
        ...(swapped ? { swaps: 1 } : {}),
      });
    };

    while (left <= right) {
      while (left <= right && left <= high) {
        recordPointers(left, right <= high ? right : null, 1);

        if (numbers[left].value < pivotValue) {
          left++;
        } else {
          break;
        }
      }

      if (left > right) {
        break;
      }

      while (left <= right && right >= low) {
        recordPointers(left <= high ? left : null, right, 1);

        if (numbers[right].value > pivotValue) {
          right--;
        } else {
          break;
        }
      }

      if (left > right) {
        break;
      }

      recordSwap(left, right);
      swap(numbers, left, right);
      recordSwap(left, right, true);
      left++;
      right--;
    }

    return {
      leftPartition: left,
      rightPartition: right,
    };
  };

  _quickSort(0, numbers.length - 1);

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default quickSort;

export const name = "Quick Sort";

export const colors = {
  a: "swapping",
  b: "low",
  c: "high",
  d: "pivot",
};

export const description = `Quick Sort applies divide and conquer: choose a pivot (here the middle index), partition the
 segment so smaller values move to the left and larger ones to the right, then recurse on each partition. Left and right
 pointers walk inward, swapping elements that are on the wrong side of the pivot until the pointers cross. When every
 subarray contains zero or one element, the array is fully sorted.`;

export const complexity = `The average case is O(n log n) because each pivot ideally splits the array into two halves and
 each level of recursion processes all n elements. The worst case happens when partitions are extremely unbalanced (for
 example, already sorted data with a poor pivot strategy), degrading to O(n^2). Using randomized or median-of-three pivots
 mitigates that risk. Quick Sort operates in place, so it only needs O(log n) extra stack space for recursion.`;
