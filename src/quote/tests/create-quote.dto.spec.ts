import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateQuoteDto } from '../dto/create-quote.dto';

describe('CreateQuoteDto validation', () => {
  const validateDto = async (body: Partial<CreateQuoteDto>) => {
    const instance = plainToInstance(CreateQuoteDto, body);
    const errors = await validate(instance);
    return errors.map(err => Object.values(err.constraints || {})).flat();
  };

  it('should validate correct DTO', async () => {
    const errors = await validateDto({
      base_amount: 1,
      base_currency: 'BTC',
      quote_currency: 'USD',
    });
    expect(errors.length).toBe(0);
  });

  it('should catch missing fields', async () => {
    const errors = await validateDto({});
    expect(errors).toContain('base_amount is required');
    expect(errors).toContain('base_currency is required');
    expect(errors).toContain('quote_currency is required');
  });

  it('should catch invalid base_amount', async () => {
    const errors = await validateDto({
      base_amount: 0,
      base_currency: 'BTC',
      quote_currency: 'USD',
    });
    expect(errors).toContain('base_amount must be a number greater than zero');
  });

  it('should catch invalid currency formats', async () => {
    const errors = await validateDto({
      base_amount: 1,
      base_currency: 'btc',
      quote_currency: '123',
    });
    expect(errors).toContain(
      'base_currency must contain only uppercase letters and cannot be empty(e.g., BTC, ETH)',
    );
    expect(errors).toContain(
      'quote_currency must contain only uppercase letters and cannot be empty(e.g., USD, USDT)',
    );
  });
});
