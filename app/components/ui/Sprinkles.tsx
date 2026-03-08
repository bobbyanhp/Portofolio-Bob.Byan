type SprinklesProps = {
  className?: string;
};

export default function Sprinkles({ className = "" }: SprinklesProps) {
  return (
    <div className={"pointer-events-none select-none text-cyan-500/70 " + className}>
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => {
          const x = (i * 23) % 120;
          const y = (i * 37) % 90;
          return <rect key={i} x={x} y={y} width="6" height="2" rx="1" ry="1" fill="currentColor" />;
        })}
      </svg>
    </div>
  );
}
