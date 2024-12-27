const ProductListSkeleton = () => {
  const skeletonItems = Array(5).fill(0);
  return (
    <div className="flex flex-col gap-2">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 border text-sm animate-pulse"
        >
          <div className="w-12 md:w-20 h-12 md:h-20 bg-gray-300"></div>
          <div className="h-4 bg-gray-300 rounded col-span-1"></div>
          <div className="h-4 bg-gray-300 rounded col-span-1"></div>
          <div className="h-4 bg-gray-300 rounded col-span-1"></div>
          <div className="h-4 bg-gray-300 rounded col-span-1"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
