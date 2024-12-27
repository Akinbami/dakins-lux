const CollectionSkeleton = () => {
  const skeletonItems = Array(8).fill(0); // Adjust the number of skeleton items as needed

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {skeletonItems.map((_, index) => (
        <div key={index} className="text-gray-700 cursor-pointer">
          <div className="overflow-hidden h-64 bg-gray-300 animate-pulse"></div>
          <div className="pt-3 pb-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="text-sm font-medium">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionSkeleton;
