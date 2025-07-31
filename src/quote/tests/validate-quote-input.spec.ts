import { validateQuoteInput } from '../validators/validate-quote-input';
import { CreateQuoteDto } from '../dto/create-quote.dto';
import { BadRequestException } from '@nestjs/common';

describe('validateQuoteInput', () => {
  it('should throw if base and quote currencies are equal', () => {
    const dto: CreateQuoteDto = {
      base_amount: 1,
      base_currency: 'BTC',
      quote_currency: 'BTC',
    };

    expect(() => validateQuoteInput(dto)).toThrow(BadRequestException);
  });

  it('should pass for different currencies', () => {
    const dto: CreateQuoteDto = {
      base_amount: 1,
      base_currency: 'BTC',
      quote_currency: 'ETH',
    };

    expect(() => validateQuoteInput(dto)).not.toThrow();
  });
});
