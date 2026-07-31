function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl bg-white p-5 shadow-md">
      <div className="h-72 rounded-2xl bg-gray-200"></div>

      <div className="mt-5 h-5 w-3/4 rounded bg-gray-200"></div>

      <div className="mt-3 h-4 w-full rounded bg-gray-200"></div>

      <div className="mt-2 h-4 w-5/6 rounded bg-gray-200"></div>

      <div className="mt-6 h-10 rounded bg-gray-200"></div>
    </div>
  );
}

export default LoadingSkeleton;