import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectCount, setCount } from "@/store/slices/salah-counter";
import { useDispatch, useSelector } from "react-redux";

const SalahCounter = () => {
  const STEP = 2;
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const setCountFunc = (count: number) => {
    dispatch(setCount(count));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Salah Counter</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-5xl font-semibold">{count}</div>

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => setCountFunc(count - STEP)}
            >
              Decrement
            </Button>

            <Button onClick={() => setCountFunc(count + STEP)}>
              Increment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalahCounter;
