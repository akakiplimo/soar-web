import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CardSkeletonWrapper = styled.div`
  margin-bottom: 20px;
  min-width: 300px;
  max-width: 400px;
  width: 100%;
`;

const CardSkeletonContainer = styled.div`
  border-radius: 14px;
  padding: 20px;
  background: ${({ $isDark }) =>
    $isDark
      ? 'linear-gradient(to bottom, #3a3a47, #242430, #1a1a24)'
      : 'white'};
  box-shadow: 0 4px 12px
    rgba(0, 0, 0, ${({ $isDark }) => ($isDark ? '0.15' : '0.05')});
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SkeletonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SkeletonMiddle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const SkeletonFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 -20px -20px -20px;
  padding: 10px 20px;
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(102, 102, 102, 0.3)' : 'rgba(0, 0, 0, 0.03)'};
  width: calc(100% + 40px);
`;

const SingleCardSkeleton = ({ isDark }) => {
  // Custom colors based on theme
  const baseColor = isDark ? '#555' : '#e0e0e0';
  const highlightColor = isDark ? '#777' : '#f0f0f0';

  return (
    <CardSkeletonWrapper>
      <CardSkeletonContainer $isDark={isDark}>
        <SkeletonHeader>
          <div>
            <Skeleton
              width={60}
              height={12}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              width={90}
              height={24}
              style={{ marginTop: 4 }}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
          <Skeleton
            width={40}
            height={30}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </SkeletonHeader>

        <SkeletonMiddle>
          <div>
            <Skeleton
              width={70}
              height={11}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              width={100}
              height={14}
              style={{ marginTop: 4 }}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
          <div>
            <Skeleton
              width={70}
              height={11}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              width={60}
              height={14}
              style={{ marginTop: 4 }}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
        </SkeletonMiddle>

        <SkeletonFooter $isDark={isDark}>
          <Skeleton
            width={150}
            height={18}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <Skeleton
            width={30}
            height={25}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </SkeletonFooter>
      </CardSkeletonContainer>
    </CardSkeletonWrapper>
  );
};

const DualCardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SingleCardSkeleton isDark={true} />
      <SingleCardSkeleton isDark={false} />
    </SkeletonWrapper>
  );
};

export default DualCardSkeleton;
