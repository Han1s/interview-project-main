import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface CountdownTimerProps {
  action: () => void;
  paused: boolean;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export default function CountdownTimer({
  action,
  paused,
  isActive,
  setIsActive,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!paused && isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            action();
            return 20;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, isActive]);

  return (
    <div className={"flex flex-row gap-2 items-baseline"}>
      <label className="flex items-center gap-2 text-lg">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive((prevActive) => !prevActive)}
        />
        Show newest movies
      </label>
      {isActive && <p>(Reloads in: {timeLeft}s)</p>}
    </div>
  );
}
