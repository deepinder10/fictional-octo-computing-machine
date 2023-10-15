interface Address {
  line1: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface Shipping {
  name: string;
  address: Address;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  address: Address;
  masked_phone: string;
  shipping: Shipping;
}

export interface Phone {
  phone: string;
}

export interface UserContextValue {
  user: User | null;
  toggleMask: () => void;
  isMasked: boolean;
  isLoading: boolean;
  error: string | null;
}
