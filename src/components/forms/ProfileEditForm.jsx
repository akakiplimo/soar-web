import React, { useState } from 'react';
import { styled } from 'styled-components';
import userImg from '../../assets/user.png';
import { useEffect } from 'react';
import api from '../../mocks/api';

const ProfilePictureContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  /* overflow: hidden; */
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

const FormInput = styled.input`
  color: #718ebf;
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

const ProfileEditForm = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.fetchUserProfile();
        setUserData(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch user data', err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(userData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', userData);
    // Add your API call here
  };

  const fileInputRef = React.createRef();

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update user profile picture
        console.log('New profile picture loaded:', e.target.result);
        // You'd typically update state here with the new image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <ProfileSection>
          <ProfilePictureContainer>
            <img
              src={userImg}
              alt="ProfileEditImg"
              className="w-full h-full object-cover rounded-full"
            />
            <EditIcon onClick={handleProfilePictureClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </EditIcon>
          </ProfilePictureContainer>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </ProfileSection>

        <FormSection>
          <FormGrid>
            <div>
              <label className="block text-gray-700 mb-2">Your Name</label>
              <FormInput
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">User Name</label>
              <FormInput
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Rest of the form fields */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <FormInput
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <FormInput
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <div className="relative">
                <FormInput
                  type="text"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Present Address
              </label>
              <FormInput
                type="text"
                name="presentAddress"
                value={userData.presentAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Permanent Address
              </label>
              <FormInput
                type="text"
                name="permanentAddress"
                value={userData.permanentAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <FormInput
                type="text"
                name="city"
                value={userData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Postal Code</label>
              <FormInput
                type="text"
                name="postalCode"
                value={userData.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Country</label>
              <FormInput
                type="text"
                name="country"
                value={userData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <SubmitButtonContainer>
              <button
                type="submit"
                className="w-full md:w-48 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
            </SubmitButtonContainer>
          </FormGrid>
        </FormSection>
      </FormContainer>
    </form>
  );
};

export default ProfileEditForm;
