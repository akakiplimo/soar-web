import React, { useState } from 'react';
import { styled } from 'styled-components';
import ProfileEditForm from '../components/forms/ProfileEditForm';
import PreferencesForm from '../components/forms/PreferencesForm';
import SecurityForm from '../components/forms/SecurityForm';

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

const TabButton = styled.div`
  padding: 0.5rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active }) => ($active ? '#000' : '#718ebf')};
  border-bottom: ${({ $active }) => ($active ? '2px solid #000' : 'none')};
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  margin-right: 2rem;
`;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

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
          {activeTab === 'profile' && <ProfileEditForm />}
          {activeTab === 'preferences' && <PreferencesForm />}
          {activeTab === 'security' && <SecurityForm />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
