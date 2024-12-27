const OrdersSkeleton = () => {
  const skeletonItems = Array(5).fill(0); // Adjust the number of skeleton items as needed

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
      </div>
      <div>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-pulse"
          >
            <div className="flex items-start gap-6 text-sm">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-300"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <div className="min-w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSkeleton;
