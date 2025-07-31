import { QuoteService } from '../quote.service';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(() => {
    service = new QuoteService();
  });

  it('should return quote result on valid response', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          quote: {
            USD: { price: 50000 },
          },
        },
      },
    });

    const result = await service.getQuote(1, 'BTC', 'USD');
    expect(result).toEqual({
      base_amount: 1,
      base_currency: 'BTC',
      quote_currency: 'USD',
      quote_amount: 50000,
    });
  });

  it('should throw InternalServerError if quote price is not a number', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          quote: {
            USD: { price: null },
          },
        },
      },
    });

    await expect(service.getQuote(1, 'BTC', 'USD')).rejects.toThrow(InternalServerErrorException);
  });
});
