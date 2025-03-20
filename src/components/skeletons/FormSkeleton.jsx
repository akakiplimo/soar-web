import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { styled } from 'styled-components';

const ProfilePictureContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-bottom: 2rem;
`;

const EditIcon = styled.div`
  position: absolute;
  background-color: #333;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  right: 0;
  bottom: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 1.5rem;
  display: flex;

  @media (max-width: 767px) {
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
    padding-top: 1.5rem;
    width: 150px;
    flex-shrink: 0;
  }
`;

const FormSection = styled.div`
  flex-grow: 1;
`;

const SubmitButtonContainer = styled.div`
  grid-column: 1 / -1; /* Span all columns */
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const ProfileEditFormSkeleton = () => {
  return (
    <FormContainer>
      <ProfileSection>
        <ProfilePictureContainer>
          <Skeleton circle height={100} width={100} />
          <EditIcon>
            <Skeleton circle height={32} width={32} />
          </EditIcon>
        </ProfilePictureContainer>
      </ProfileSection>

      <FormSection>
        <FormGrid>
          {[...Array(10)].map((_, index) => (
            <div key={index}>
              <Skeleton
                height={20}
                width={100}
                style={{ marginBottom: '0.5rem' }}
              />
              <Skeleton height={40} />
            </div>
          ))}
          <SubmitButtonContainer>
            <Skeleton height={40} width={150} />
          </SubmitButtonContainer>
        </FormGrid>
      </FormSection>
    </FormContainer>
  );
};

export default ProfileEditFormSkeleton;
