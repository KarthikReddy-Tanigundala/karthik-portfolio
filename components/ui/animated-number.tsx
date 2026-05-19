"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type AnimatedNumberProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
};

export function AnimatedNumber({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.8,
}: AnimatedNumberProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <span ref={ref} aria-label={`${prefix}${end}${suffix}`}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator=","
        />
      ) : (
        <span>
          {prefix}0{suffix}
        </span>
      )}
    </span>
  );
}