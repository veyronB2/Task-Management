import { describe, expect, it } from 'vitest';

import { formatDisplayDate } from '../../utilities/utitlities';

describe('formatDisplayDate', () => {
  it('should format a valid ISO date correctly', () => {
    const input = '2023-08-28T14:30:00Z';
    const result = formatDisplayDate(input);

    expect(result).toBe('28 August 2023, 15:30:00');
  });

  it('should return the original string if the date is invalid', () => {
    const input = 'not-a-date';
    const result = formatDisplayDate(input);
    expect(result).toBe(input);
  });
});
