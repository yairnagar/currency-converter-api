import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from '../quote.controller';
import { QuoteService } from '../quote.service';

describe('QuoteController', () => {
  let controller: QuoteController;
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useValue: {
            getQuote: jest.fn().mockResolvedValue({
              base_amount: 1,
              base_currency: 'BTC',
              quote_currency: 'USD',
              quote_amount: 50000,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
    service = module.get<QuoteService>(QuoteService);
  });

  it('should return quote from service', async () => {
    const dto = { base_amount: 1, base_currency: 'BTC', quote_currency: 'USD' };
    const result = await controller.getQuote(dto);
    expect(result.quote_amount).toBe(50000);
    expect(service.getQuote).toHaveBeenCalledWith(1, 'BTC', 'USD');
  });
});
