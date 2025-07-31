import { BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
  
  export function handleCoinMarketCapError(error: any): never {
    const status = error.response?.status;
    const cmcMessage = error.response?.data?.status?.error_message;
  
    if (status === 401) {
      throw new UnauthorizedException(
        'Authentication with CoinMarketCap failed. Please check API credentials.',
      );
    }
  
    if (status === 400 && typeof cmcMessage === 'string') {
      const symbolMatch = cmcMessage.match(/"symbol":\s*"(\w+)"/);
      const convertMatch = cmcMessage.match(/"convert":\s*"(\w+)"/);
  
      if (symbolMatch) {
        throw new BadRequestException(
          `Currency '${symbolMatch[1]}' is not supported as base_currency.`,
        );
      }
  
      if (convertMatch) {
        throw new BadRequestException(
          `Currency '${convertMatch[1]}' is not supported as quote_currency.`,
        );
      }
  
      throw new BadRequestException(
        `Invalid currency values provided: ${cmcMessage}`,
      );
    }
  
    throw new InternalServerErrorException(
      'Something went wrong while retrieving quote information. Please try again later.',
    );
  }
  