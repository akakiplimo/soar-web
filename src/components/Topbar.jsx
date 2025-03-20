import styled from 'styled-components';
import { FaSearch, FaBell, FaCog, FaBars } from 'react-icons/fa';
import userImg from '../assets/user.png';
import searchIcon from '../assets/icon_search.svg';
import settingsIcon from '../assets/icon_settings.svg';
import notificationsIcon from '../assets/icon_notification.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { COLORS } from '../utils/colors';

const TopBarContainer = styled.header`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
  /* border-bottom: 1px solid #f46464; */
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: ${({ $isMobile }) => ($isMobile ? '20px' : '24px')};
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'block')};
  font-weight: 600;
  color: ${COLORS.titlePrimary ? COLORS.titlePrimary : '#333'};
  padding-left: ${({ $isMobile }) => ($isMobile ? '0' : '10px')};
`;

const SearchBar = styled.form`
  position: relative;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '300px')};
  margin: ${({ $isMobile }) => ($isMobile ? '15px 0 0' : '0 20px')};

  /* For mobile, show below other elements */
  @media (max-width: 820px) {
    order: 2; /* Ensures it appears below in mobile view */
  }

  /* For desktop, show in normal layout */
  @media (min-width: 821px) {
    order: 0;
    display: block;
  }
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

const SearchIcon = styled.label`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #8a94a6;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  ${({ $isMobile }) =>
    $isMobile &&
    `
    justify-content: center;
    position: relative;
  `}
`;

const RightSection = styled.nav`
  display: flex;
  align-items: center;
`;

const IconButton = styled.div`
  background: none;
  border: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  color: #8a94a6;
  background-color: #f5f7fa;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e8eaed;
  }

  display: ${({ $isMobile }) => ($isMobile ? 'none' : 'flex')};

  @media (min-width: 820px) {
    display: flex;
  }

  img,
  svg {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const UserAvatar = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 15px;
  cursor: pointer;
  padding: 0;
  border: none;
  background: none;
`;

const MenuButton = styled.button`
  display: ${({ $isMobile }) => ($isMobile ? 'flex' : 'none')};
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  margin-right: 15px;
  cursor: pointer;

  ${({ $isMobile }) =>
    $isMobile &&
    `
    position: absolute;
    left: 0;
  `}
`;

// Screen reader only content
const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const TopBar = ({ isMobile, onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  // remove preceding '/' and capitalize the first letter
  const pageTitle =
    pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2);

  // route to settings
  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission logic here
  };

  return (
    <TopBarContainer $isMobile={isMobile}>
      <MainSection>
        <LeftSection $isMobile={isMobile}>
          {isMobile && (
            <MenuButton
              $isMobile={isMobile}
              onClick={onMenuClick}
              aria-label="Open navigation menu"
            >
              <FaBars aria-hidden="true" />
            </MenuButton>
          )}
          <PageTitle $isMobile={isMobile}>
            {pageTitle === '' ? 'Overview' : pageTitle}
          </PageTitle>
        </LeftSection>

        <RightSection aria-label="User tools">
          {/* SearchBar will be shown here on desktop, but not on mobile */}
          {!isMobile && (
            <SearchBar
              $isMobile={isMobile}
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <SearchIcon htmlFor="desktop-search">
                <img src={searchIcon} alt="" aria-hidden="true" />
              </SearchIcon>
              <SearchInput
                id="desktop-search"
                type="search"
                placeholder="Search for something"
                aria-label="Search"
              />
            </SearchBar>
          )}
          <IconButton
            $isMobile={isMobile}
            onClick={handleSettingsClick}
            aria-label="Settings"
          >
            <img src={settingsIcon} alt="" aria-hidden="true" />
          </IconButton>
          <IconButton $isMobile={isMobile} aria-label="Notifications">
            <img src={notificationsIcon} alt="" aria-hidden="true" />
          </IconButton>
          <UserAvatar aria-label="User profile">
            <img
              src={userImg}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </UserAvatar>
        </RightSection>
      </MainSection>

      {/* SearchBar only shown here on mobile */}
      {isMobile && (
        <SearchBar
          $isMobile={isMobile}
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <SearchIcon htmlFor="mobile-search">
            <img src={searchIcon} alt="" aria-hidden="true" />
          </SearchIcon>
          <SearchInput
            id="mobile-search"
            type="search"
            placeholder="Search for something"
            aria-label="Search"
          />
        </SearchBar>
      )}
    </TopBarContainer>
  );
};

export default TopBar;
