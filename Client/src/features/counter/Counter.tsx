import { Button, Typography } from "@mui/material";
import { decrement, increment, incrementByAmount } from "./counterSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography>{count}</Typography>
      <Button onClick={() => dispatch(increment())}>Arttır</Button>
      <Button onClick={() => dispatch(decrement())}>Azalt</Button>
      <Button onClick={() => dispatch(incrementByAmount(5))}>
        Değere Göre Arttır
      </Button>
    </>
  );
}
