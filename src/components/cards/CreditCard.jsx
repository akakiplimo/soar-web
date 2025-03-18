import styled from 'styled-components';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  color: ${(props) => (props.type === 'dark' ? 'white' : '#333')};
  background: ${(props) => (props.type === 'dark' ? '#333' : 'white')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: ${({ $isMobile }) => ($isMobile ? '70%' : 'auto')};
  scroll-snap-align: start;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const BalanceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BalanceLabel = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 4px;
`;

const BalanceAmount = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const ChipIcon = styled.div`
  font-size: 28px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardholderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardLabel = styled.div`
  font-size: 11px;
  opacity: 0.8;
  margin-bottom: 4px;
`;

const CardholderName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const ValidInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const CardNumber = styled.div`
  font-size: 18px;
  letter-spacing: 2px;
  margin: 20px 0;
`;

const CardNetwork = styled.div`
  font-size: 28px;
`;

const CreditCard = ({
  type = 'dark',
  balance = '$5,756',
  cardHolder = 'Eddy Cusuma',
  cardNumber = '3778 **** **** 1234',
  validThru = '12/22',
  network = 'mastercard',
  isMobile,
}) => {
  return (
    <CardContainer type={type} $isMobile={isMobile}>
      <CardHeader>
        <BalanceInfo>
          <BalanceLabel>Balance</BalanceLabel>
          <BalanceAmount>{balance}</BalanceAmount>
        </BalanceInfo>
        <ChipIcon>
          <svg
            width="40"
            height="30"
            viewBox="0 0 40 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="40"
              height="30"
              rx="4"
              fill={type === 'dark' ? '#666' : '#ddd'}
            />
            <rect
              x="8"
              y="8"
              width="24"
              height="4"
              fill={type === 'dark' ? '#999' : '#aaa'}
            />
            <rect
              x="8"
              y="16"
              width="24"
              height="6"
              fill={type === 'dark' ? '#999' : '#aaa'}
            />
          </svg>
        </ChipIcon>
      </CardHeader>

      <CardNumber>{cardNumber}</CardNumber>

      <CardFooter>
        <CardholderInfo>
          <CardLabel>CARD HOLDER</CardLabel>
          <CardholderName>{cardHolder}</CardholderName>
        </CardholderInfo>

        <ValidInfo>
          <CardLabel>VALID THRU</CardLabel>
          <CardholderName>{validThru}</CardholderName>
        </ValidInfo>

        <CardNetwork>
          {network === 'mastercard' ? <FaCcMastercard /> : <FaCcVisa />}
        </CardNetwork>
      </CardFooter>
    </CardContainer>
  );
};

export default CreditCard;
