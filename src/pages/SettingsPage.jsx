import React, { useState } from 'react';
import { styled } from 'styled-components';
import ProfileEditForm from '../components/forms/ProfileEditForm';
import PreferencesForm from '../components/forms/PreferencesForm';
import SecurityForm from '../components/forms/SecurityForm';
import { useDispatch } from 'react-redux';
import { useLoadingStates } from '../utils/loadingStates';
import ProfileEditFormSkeleton from '../components/skeletons/FormSkeleton';
import { useEffect } from 'react';
import { fetchUserProfile, resetUserState } from '../store/slices/userSlice';

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

const TabButton = styled.div`
  padding: 0.5rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active }) => ($active ? '#000' : '#718ebf')};
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2px;
    height: ${({ $active }) => ($active ? '2px' : '0')};
    background-color: ${({ $active }) => ($active ? '#232323' : '')};
    border-radius: ${({ $active }) => ($active ? '10px 10px 0 0' : '0')};
    transform: ${({ $active }) =>
      $active ? 'scaleX(1.05) translateY(1px)' : 'none'};
  }
`;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const dispatch = useDispatch();
  const { userLoading } = useLoadingStates();

  useEffect(() => {
    // First, reset state to trigger and simulate loading state
    dispatch(resetUserState());

    // Then fetch fresh data
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b p-6">
          <TabsContainer>
            <TabButton
              $active={activeTab === 'profile' ? 'true' : undefined}
              onClick={() => setActiveTab('profile')}
            >
              Edit Profile
            </TabButton>
            <TabButton
              $active={activeTab === 'preferences' ? 'true' : undefined}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </TabButton>
            <TabButton
              $active={activeTab === 'security' ? 'true' : undefined}
              onClick={() => setActiveTab('security')}
            >
              Security
            </TabButton>
          </TabsContainer>
        </div>

        <div className="p-6">
          {activeTab === 'profile' ? (
            userLoading ? (
              <ProfileEditFormSkeleton />
            ) : (
              <ProfileEditForm />
            )
          ) : null}
          {activeTab === 'preferences' && <PreferencesForm />}
          {activeTab === 'security' && <SecurityForm />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
