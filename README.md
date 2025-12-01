# Sorting Visualization

React + Vite/TypeScript app that visualizes several sorting algorithms (bubble, insertion, selection, merge, quick, radix LSD, plus a baseline `Array.sort`). The UI uses Material UI and custom controls to configure array size, speed, and the active algorithm.

## Quick Start
0. Clone the repo:
   ```bash
   git clone https://github.com/LeNguyenAnhKhoa/sort-visual.git
   ```
1. Install Node.js >= 16 (Vite 4 needs >= 14.18; Node 16+ is recommended).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the dev server with HMR:

   ```bash
   npm run dev
   ```

4. Open the URL that Vite prints (defaults to `http://localhost:5173`) to view the visualization.

## Useful npm scripts

- `npm run dev`: start the development server.
- `npm run build`: type-check with `tsc` then emit the static bundle into `dist/`.
- `npm run preview`: serve the `dist/` folder locally before deploying.
- `npm run lint`: run ESLint across the TypeScript/React source.

## Project structure

- `src/App.tsx`: wires up layout components and top-level controls.
- `src/Algorithms/`: implementations of each algorithm plus the trace logic for rendering.
- `src/Components/`: bar chart, legend, control panels, layout primitives, and custom inputs.
- `src/Pages/SortingVisualizer.tsx`: page that hosts the chart and algorithm copy.
- `src/util/`: shared constants, `Trace` helpers, utilities, and the Material UI theme.

## Implementation notes

- The production build is a static app that can be hosted on any static provider (for example GitHub Pages as configured in `package.json`).
- To tweak theming or colors, start with `src/Components/Layout/ThemeProvider.tsx`.
