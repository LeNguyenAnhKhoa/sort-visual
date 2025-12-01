import Trace, { SortItem } from "../util/Trace";

const mergeSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  const _mergeSort = (numbers: SortItem[], start: number, end: number) => {
    const length = end - start;

    if (length <= 1) {
      return numbers;
    } else {
      const middle = Math.floor((start + end) / 2);

      trace.add(numbers, {
        a: numbers.slice(start, middle),
        groups: [[start, middle - 1]],
      });
      _mergeSort(numbers, start, middle);

      trace.add(numbers, {
        a: numbers.slice(middle, end),
        groups: [[middle, end - 1]],
      });
      _mergeSort(numbers, middle, end);

      return merge(numbers, start, middle, end);
    }
  };

  const merge = (
    numbers: SortItem[],
    start: number,
    middle: number,
    end: number
  ) => {
    const left = numbers.slice(start, middle);
    const right = numbers.slice(middle, end);

    let leftStart = 0;
    let rightStart = 0;
    let i = 0;

    while (leftStart < left.length && rightStart < right.length) {
      let sorted = 0;
      if (start === 0 && end === numbers.length) {
        sorted = i;
      }

      if (left[leftStart].value <= right[rightStart].value) {
        trace.add(numbers, {
          b: [numbers[start + i]],
          sorted: numbers.slice(0, sorted),
          groups: [[start, end - 1]],
          comparisons: 1,
        });
        numbers[start + i] = left[leftStart];
        leftStart++;
        trace.add(numbers, {
          b: [numbers[start + i]],
          sorted: numbers.slice(0, sorted),
          groups: [[start, end - 1]],
          swaps: 1,
        });
      } else {
        trace.add(numbers, {
          b: [numbers[start + i]],
          sorted: numbers.slice(0, sorted),
          groups: [[start, end - 1]],
          comparisons: 1,
        });
        numbers[start + i] = right[rightStart];
        rightStart++;
        trace.add(numbers, {
          b: [numbers[start + i]],
          sorted: numbers.slice(0, sorted),
          groups: [[start, end - 1]],
          swaps: 1,
        });
      }
      i++;
    }

    while (leftStart < left.length) {
      let sorted = 0;
      if (start === 0 && end === numbers.length) {
        sorted = i;
      }

      trace.add(numbers, {
        b: [numbers[start + i]],
        sorted: numbers.slice(0, sorted),
        groups: [[start, end - 1]],
      });
      numbers[start + i] = left[leftStart];
      trace.add(numbers, {
        b: [numbers[start + i]],
        sorted: numbers.slice(0, sorted),
        groups: [[start, end - 1]],
        swaps: 1,
      });
      leftStart++;
      i++;
    }

    while (rightStart < right.length) {
      let sorted = 0;
      if (start === 0 && end === numbers.length) {
        sorted = i;
      }

      trace.add(numbers, {
        b: [numbers[start + i]],
        sorted: numbers.slice(0, sorted),
        groups: [[start, end - 1]],
      });
      numbers[start + i] = right[rightStart];
      trace.add(numbers, {
        b: [numbers[start + i]],
        sorted: numbers.slice(0, sorted),
        groups: [[start, end - 1]],
        swaps: 1,
      });
      rightStart++;
      i++;
    }

    return numbers;
  };

  _mergeSort(numbers, 0, numbers.length);

  trace.add(numbers, { sorted: [...numbers] });

  return trace.export();
};

export default mergeSort;

export const name = "Merge Sort";

export const colors = {
  a: "call merge sort",
  b: "override from memory",
};

export const animateMovements = false;

export const description = `Merge Sort also uses divide and conquer: recursively split the array in half until each slice
 has one element, then merge two sorted slices by repeatedly taking the smaller front value and appending it to the
 output. The merge step is called all the way back up the recursion tree until the full array is rebuilt. Extra buffers
 are typically used to hold temporary copies while merging.`;

export const complexity = `Merge Sort always runs in O(n log n) time because each level splits the array in half while the
 merge step scans every element exactly once. The algorithm requires O(n) auxiliary memory to store the temporary halves,
 so it is not an in-place sort.`;
