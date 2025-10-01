export function Loader({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center ${className}`}>
      <span
        className="inline-block w-6 aspect-square border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"
        aria-label="Loading"
      />
    </span>
  );
}
