import { BadRequestException } from '@nestjs/common';
import { CreateQuoteDto } from '../dto/create-quote.dto';

export function validateQuoteInput(dto: CreateQuoteDto) {
  if (dto.base_currency === dto.quote_currency) {
    throw new BadRequestException('base_currency and quote_currency must be different.');
  }
}
