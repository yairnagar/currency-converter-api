import { BadRequestException } from '@nestjs/common';
import { validateQuoteInput } from './validate-quote-input';

describe('validateQuoteInput', () => {
  it('should throw BadRequestException if base_currency equals quote_currency', () => {
    const dto = {
      base_amount: 10,
      base_currency: 'BTC',
      quote_currency: 'BTC',
    };

    expect(() => validateQuoteInput(dto)).toThrow(BadRequestException);
    expect(() => validateQuoteInput(dto)).toThrow(
      'base_currency and quote_currency must be different.',
    );
  });

  it('should not throw if base_currency and quote_currency are different', () => {
    const dto = {
      base_amount: 10,
      base_currency: 'BTC',
      quote_currency: 'USD',
    };

    expect(() => validateQuoteInput(dto)).not.toThrow();
  });
});
