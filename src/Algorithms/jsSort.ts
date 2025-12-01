import Trace, { SortItem } from "../util/Trace";

const jsSort = (numbers: SortItem[]) => {
  const trace = new Trace(numbers);

  const sorted = numbers.sort((a, b) => {
    const s = a.value - b.value;

    trace.add(numbers, { a: [a], b: [b], comparisons: 1 });

    return s;
  });

  trace.add(sorted, { sorted: [...numbers] });

  return trace.export();
};

export default jsSort;

export const colors = {
  a: "A pointer",
  b: "B pointer",
};

export const name = "JavaScript Sort";

export const description =
  "Uses JavaScript's built-in Array.sort() for a playful baseline; the visualization simply replays comparator calls.";

export const complexity =
  "Complexity depends on the engine implementation (typically hybrid quicksort/merge sort) but averages O(n log n) time and O(log n) space.";
