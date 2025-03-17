import styled from 'styled-components';
import { FaSearch, FaBell, FaCog } from 'react-icons/fa';
import userImg from '../assets/user.png';

const TopBarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const SearchBar = styled.div`
  position: relative;
  width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px 10px 40px;
  border-radius: 50px;
  border: none;
  background-color: #f5f7fa;
  color: #000000;
  transition: all 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #8a94a6;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: 1px red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  color: #8a94a6;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f7fa;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 15px;
  cursor: pointer;
`;

const TopBar = () => {
  return (
    <TopBarContainer>
      <PageTitle>Overview</PageTitle>

      <SearchBar>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput placeholder="Search for something" />
      </SearchBar>

      <RightSection>
        <IconButton>
          <FaCog />
        </IconButton>
        <IconButton>
          <FaBell />
        </IconButton>
        <UserAvatar>
          <img
            src={userImg}
            alt="User"
            className="w-full h-full object-cover"
          />
        </UserAvatar>
      </RightSection>
    </TopBarContainer>
  );
};

export default TopBar;
