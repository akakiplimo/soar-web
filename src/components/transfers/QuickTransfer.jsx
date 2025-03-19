import { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import user2 from '../../assets/user2.png';
import user3 from '../../assets/user3.png';
import user4 from '../../assets/user4.png';
import user5 from '../../assets/user5.png';
import user1 from '../../assets/user.png';

const TransferContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 16px;
`;

const ContactsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 8px 0;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`;

const ContactCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  min-width: 80px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 8px;
  border: ${(props) => (props.selected ? '2px solid #4169E1' : 'none')};
`;

const ContactName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;
`;

const ContactTitle = styled.div`
  font-size: 12px;
  color: #888;
  text-align: center;
`;

const TransferForm = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const AmountInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #f5f7fa;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4169e1;
    box-shadow: 0 0 0 2px rgba(65, 105, 225, 0.2);
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #222;
  }
`;

const QuickTransfer = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState('525.50');

  // Sample contacts data based on the image
  const contacts = [
    {
      id: 1,
      name: 'Livia Bator',
      title: 'CEO',
      avatar: user2,
    },
    {
      id: 2,
      name: 'Randy Press',
      title: 'Director',
      avatar: user3,
    },
    {
      id: 3,
      name: 'Workman',
      title: 'Designer',
      avatar: user4,
    },
    {
      id: 4,
      name: 'Jane Cooper',
      title: 'Developer',
      avatar: user5,
    },
    {
      id: 5,
      name: 'Mark Wilson',
      title: 'Manager',
      avatar: user1,
    },
  ];

  const handleContactSelect = (contactId) => {
    setSelectedContact(contactId);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSend = () => {
    console.log('Sending', amount, 'to contact ID:', selectedContact);
    // Here you would typically make an API call to process the transfer
    window.alert(`Sending ${amount} to contact ID: ${selectedContact}`);
  };

  return (
    <TransferContainer>
      <ContactsContainer>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            onClick={() => handleContactSelect(contact.id)}
          >
            <Avatar selected={selectedContact === contact.id}>
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <ContactName>{contact.name}</ContactName>
            <ContactTitle>{contact.title}</ContactTitle>
          </ContactCard>
        ))}
      </ContactsContainer>

      <TransferForm>
        <AmountInput
          type="text"
          placeholder="Write Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <SendButton onClick={handleSend}>
          Send <FaPaperPlane className="ml-2" />
        </SendButton>
      </TransferForm>
    </TransferContainer>
  );
};

export default QuickTransfer;
