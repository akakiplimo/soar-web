import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TransactionsSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center mb-4">
            <Skeleton circle width={40} height={40} />
            <div className="ml-3 flex-grow">
              <Skeleton width={120} />
              <Skeleton width={80} />
            </div>
            <Skeleton width={60} />
          </div>
        ))}
    </div>
  );
};

export default TransactionsSkeleton;
