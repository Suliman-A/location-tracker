export interface Address {
  street: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
}

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface LocationService {
  location: LocationCoords | null;
  address: Address | null;
  isSearching: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getCurrentLocation: () => Promise<void>;
  searchPlace: () => Promise<void>;
}
