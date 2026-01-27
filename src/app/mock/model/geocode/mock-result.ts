import { Result } from '../../../model/geocode/result.model';
import { mockAddressMatch } from './mock-address-match';

export const mockResult: Result = {
  addressMatches: [mockAddressMatch],
};
