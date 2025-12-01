import { generateRandomArray } from "./utils";

export const createSortItemsFromValues = (values: number[]): SortItem[] => {
  const preId = Math.random().toString(36).substring(2);

  return values.map((value, index) => ({
    id: `${preId}-${index}-${value}`,
    value,
  }));
};

export const generateRandomNumbers = (
  size: number,
  range: [number, number]
): SortItem[] => createSortItemsFromValues(generateRandomArray(size, ...range));

export interface SortItem {
  id: string;
  value: number;
}

export interface TraceStats {
  comparisons: number;
  swaps: number;
}

export interface TraceEntry {
  numbers: SortItem[];
  state: {
    a: string[];
    b: string[];
    c: string[];
    d: string[];
    groups: Array<[number, number]>;
    sorted: string[];
  };
  stats: TraceStats;
}

export default class Trace {
  trace: TraceEntry[];
  private comparisons: number;
  private swaps: number;

  constructor(numbers: SortItem[]) {
    this.comparisons = 0;
    this.swaps = 0;
    this.trace = [
      {
        numbers: [...numbers],
        state: {
          a: [],
          b: [],
          c: [],
          d: [],
          groups: [],
          sorted: [],
        },
        stats: {
          comparisons: this.comparisons,
          swaps: this.swaps,
        },
      },
    ];
  }

  add(numbers: SortItem[], options: TraceAddOptions = {}) {
    try {
      const {
        a = [],
        b = [],
        c = [],
        d = [],
        groups = [],
        sorted = [],
        comparisons = 0,
        swaps = 0,
      } = options;

      this.comparisons += comparisons;
      this.swaps += swaps;

      this.trace.push({
        numbers: [...numbers],
        state: {
          a: [...a.map((x) => x.id)],
          b: [...b.map((x) => x.id)],
          c: [...c.map((x) => x.id)],
          d: [...d.map((x) => x.id)],
          groups: [...groups],
          sorted: [...sorted.map((x) => x.id)],
        },
        stats: {
          comparisons: this.comparisons,
          swaps: this.swaps,
        },
      });
    } catch (e) {
      // useful for debugging to see call stack
      console.log(arguments, e);
      throw e;
    }
  }

  export() {
    return this.trace;
  }

  toJSON() {
    return JSON.stringify(this.export());
  }
}

interface TraceAddOptions {
  a?: SortItem[];
  b?: SortItem[];
  c?: SortItem[];
  d?: SortItem[];
  groups?: Array<[number, number]>;
  sorted?: SortItem[];
  comparisons?: number;
  swaps?: number;
}
