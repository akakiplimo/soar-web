import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import userImg from '../../assets/userEmpty.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserProfile } from '../../store/slices/userSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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

const SubmitButton = styled.button`
  color: white;
  cursor: pointer;
  background-color: #232323;
  transition: background-color 0.2s;

  &:hover {
    background-color: #396aff;
  }
`;

// Define validation schema with Zod
const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  dob: z.string().min(1, { message: 'Date of birth is required' }),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  permanentAddress: z.string(),
  city: z.string().min(1, { message: 'City is required' }),
  postalCode: z.string().min(1, { message: 'Postal code is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

const ProfileEditForm = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const {
    data: user,
    status,
    error,
  } = userState ?? { data: null, status: 'idle', error: null };

  // Use react-hook-form with zodResolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      dob: '',
      presentAddress: '',
      permanentAddress: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);

  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      // Set each form field value from user data
      Object.keys(user).forEach((key) => {
        setValue(key, user[key] || '');
      });
      setProfilePicture(user.profilePicture);
    }
  }, [user, setValue]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const onSubmit = (data) => {
    // Handle form submission with validated data
    console.log('Form submitted:', data);
    // Add your API call here
    window.alert('Form submitted successfully!');
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
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <ProfileSection>
          <ProfilePictureContainer>
            <img
              src={profilePicture ?? userImg}
              alt="ProfileEditImg"
              loading="lazy"
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
                {...register('name')}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">User Name</label>
              <FormInput
                {...register('username')}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <FormInput
                {...register('email')}
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <FormInput
                {...register('password')}
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <div className="relative">
                <FormInput
                  {...register('dob')}
                  type="text"
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
              {errors.dob && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.dob.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Present Address
              </label>
              <FormInput
                {...register('presentAddress')}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.presentAddress && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.presentAddress.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Permanent Address
              </label>
              <FormInput
                {...register('permanentAddress')}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.permanentAddress && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.permanentAddress.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <FormInput
                {...register('city')}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Postal Code</label>
              <FormInput
                {...register('postalCode')}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.postalCode && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Country</label>
              <FormInput
                {...register('country')}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.country && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.country.message}
                </p>
              )}
            </div>
            <SubmitButtonContainer>
              <SubmitButton
                type="submit"
                className="w-full md:w-48 py-3 px-6 rounded-md transition-colors"
              >
                Save
              </SubmitButton>
            </SubmitButtonContainer>
          </FormGrid>
        </FormSection>
      </FormContainer>
    </form>
  );
};

export default ProfileEditForm;
