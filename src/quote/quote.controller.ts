import { Controller, Post, Body } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { validateQuoteInput } from './validators/validate-quote-input';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async getQuote(@Body() dto: CreateQuoteDto) {
    validateQuoteInput(dto);
    return this.quoteService.getQuote(dto.base_amount, dto.base_currency, dto.quote_currency);
  }
}
