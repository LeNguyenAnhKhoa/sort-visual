import { useState, useEffect } from "react";

import {
  Button,
  Slider,
  Typography,
  Select,
  Switch,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import ReplayIcon from "@material-ui/icons/Replay";

import { algorithms } from "../Algorithms";
import BootstrapInput from "./Inputs/BootstrapInput";
import { SortItem, createSortItemsFromValues } from "../util/Trace";

interface ExtendedControls {
  algorithm: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  numbers: SortItem[];
  setNumbers: React.Dispatch<React.SetStateAction<SortItem[]>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  minMax: [number, number];
  setMinMax: React.Dispatch<React.SetStateAction<[number, number]>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  isSorting: boolean;
  generateArray: () => void;
  restartSorting: () => void;
  animation: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    marginBottom: theme.spacing(),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  button: {
    marginLeft: theme.spacing(),
  },
}));

const Controls = ({
  algorithm,
  setAlgorithm,
  setStep,
  numbers,
  setNumbers,
  size,
  setSize,
  minMax,
  setMinMax,
  speed,
  setSpeed,
  isSorting,
  generateArray,
  restartSorting,
  animation,
  setAnimation,
}: ExtendedControls) => {
  const classes = useStyles();
  const [sizeBuffer, setSizeBuffer] = useState(size);
  const [manualInput, setManualInput] = useState(
    numbers.map((number) => number.value).join(", ")
  );
  const [manualError, setManualError] = useState<string | null>(null);

  // line 84
  useEffect(() => {
    if (sizeBuffer !== size) {
      setSize(sizeBuffer);
      generateArray();
    }
    // CHANGE: Add 'generateArray' and 'setSize' to the array
  }, [sizeBuffer, size, generateArray, setSize]);

  useEffect(() => {
    setManualInput(numbers.map((number) => number.value).join(", "));
  }, [numbers]);

  const handleManualArraySubmit = () => {
    if (isSorting) {
      return;
    }

    const tokens = manualInput
      .split(/[\s,]+/)
      .map((token) => token.trim())
      .filter(Boolean);

    if (!tokens.length) {
      setManualError("Please enter at least one number.");
      return;
    }

    const parsed = tokens.map((token) => Number(token));

    if (parsed.some((value) => Number.isNaN(value))) {
      setManualError("Only numeric values are allowed.");
      return;
    }

    const manualNumbers = createSortItemsFromValues(parsed);
    setNumbers(manualNumbers);
    setSize(parsed.length);
    setSizeBuffer(parsed.length);
    setStep(0);
    setManualError(null);
  };

  return (
    <div>
      <div className={classes.buttonWrapper}>
        <FormControl>
          <InputLabel color="secondary">Algorithm</InputLabel>
          <Select
            value={algorithm}
            onChange={(event) => {
              setAlgorithm(event.target!.value as string);
              setStep(0);
            }}
            inputProps={{
              id: "algorithm-selector",
            }}
            disabled={isSorting}
            input={<BootstrapInput />}
          >
            {Object.entries(algorithms).map(([value, { name }], key) => (
              <MenuItem value={value} key={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="secondary"
          onClick={generateArray}
          disabled={isSorting}
          className={classes.button}
          startIcon={<ReplayIcon />}
        >
          Generate random array
        </Button>
      </div>

      <Typography gutterBottom>Size</Typography>
      <Slider
        value={size}
        onChange={(_e, value) => {
          setSizeBuffer(value as number);
        }}
        valueLabelDisplay="auto"
        min={2}
        max={100}
        disabled={isSorting}
        color="secondary"
      />

      <Typography gutterBottom>Range</Typography>
      <Slider
        value={minMax}
        onChange={(_e, value) => {
          setMinMax(value as [number, number]);
          generateArray();
        }}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        disabled={isSorting}
        color="secondary"
      />

      <Typography gutterBottom>Speed</Typography>
      <Slider
        value={speed}
        onChange={(_e, value) => {
          setSpeed(value as number);
          restartSorting();
        }}
        valueLabelDisplay="auto"
        min={0.25}
        step={0.25}
        max={4}
        marks
        color="secondary"
      />

      <Typography gutterBottom>Animations</Typography>
      <Switch
        checked={animation}
        onChange={(_e, checked) => setAnimation(checked)}
        color="secondary"
      />

      <Typography gutterBottom>Manual array input</Typography>
      <TextField
        value={manualInput}
        onChange={(event) => {
          setManualInput(event.target.value);
          if (manualError) {
            setManualError(null);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleManualArraySubmit();
          }
        }}
        placeholder="e.g. 5, 1, 3, 9"
        multiline
        minRows={2}
        variant="outlined"
        color="secondary"
        disabled={isSorting}
        error={Boolean(manualError)}
        helperText={manualError ?? "Separate values with commas or spaces."}
        fullWidth
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleManualArraySubmit}
        disabled={isSorting}
        className={classes.button}
      >
        Use manual values
      </Button>
    </div>
  );
};

export default Controls;
