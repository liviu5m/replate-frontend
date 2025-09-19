export type User = {
  id: number;
  fullName: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  verified: boolean;
  role: string;
  image: string;
  city: string;
  zip: string;
  country: string;
  createdAt: string;
  provider: string;
};

export type ProfileDataType = {
  fullName: string;
  username: string;
  phone: string;
  address: string;
  role: string;
  image: string;
  city: string;
  zip: string;
  country: string;
  createdAt: string;
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

export type VerificationData = {
  idType: string;
  idNumber: string;
  documentUrl: string;
  userId: number;
};

export type DonationDto = {
  name: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  notes: string;
  status: string;
};

export type Donation = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  notes: string;
  status: string;
  createdAt: string;
};

export type RequestDto = {
  ngoId: number;
  status: string;
  deliveryDate?: Date;
  pickupDate?: Date;
  driverId?: number;
};

export type Request = {
  id: number;
  ngo: User;
  status: string;
  createdAt: string;
  requestDonations: RequestDonation[];
  pickupDate: string;
  deliveryDate: string;
  driver: User;
};

export type RequestDonationDto = {
  requestId: number;
  donationId: number;
};

export type RequestDonation = {
  id: number;
  request: Request;
  donation: Donation;
  createdAt: string;
};

export type MessageDto = {
  senderId: number;
  receiverId: number;
  text: string;
};

export type Message = {
  id: number;
  sender: User;
  receiver: User;
  text: string;
  createdAt: string;
};
