import { Address } from "../Types/Location.Types";

export const formatAddress = (address: Address): string => {
  const parts = [
    address.street,
    address.city,
    address.region,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  return parts.join(", ");
};
