import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { getCountApi, setCountApi } from "@/lib/db/salah-counter";
import { selectCount, setCount } from "@/store/slices/salah-counter";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SalahCounter = () => {
  const STEP = 2;
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const setCountFunc = (count: number) => {
    dispatch(setCount(count));
    setCountApi(count);
  };
  const [loading, setLoading] = useState(false);
  useEffectOnce(() => {
    const onMount = async () => {
      try {
        setLoading(true);
        const response = await getCountApi();
        const count = Number(response);
        if (count !== 0) {
          dispatch(setCount(count));
        } else {
          setCountApi(0);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    onMount();
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Salah Counter</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="text-5xl font-semibold">{count}</div>
          )}

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setCountFunc(count - STEP)}
            >
              Decrement
            </Button>

            <Button
              className="cursor-pointer"
              onClick={() => setCountFunc(count + STEP)}
            >
              Increment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalahCounter;
