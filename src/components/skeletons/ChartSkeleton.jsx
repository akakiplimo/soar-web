import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChartSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <Skeleton height={200} />
    </div>
  );
};

export default ChartSkeleton;
