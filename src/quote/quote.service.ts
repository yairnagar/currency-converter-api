import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { handleCoinMarketCapError } from './errors/handle-coinmarketcap-error';

@Injectable()
export class QuoteService {
  async getQuote(
    base_amount: number,
    base_currency: string,
    quote_currency: string,
  ) {
    try {
      const response = await axios.get(
        'https://pro-api.coinmarketcap.com/v2/tools/price-conversion',
        {
          params: {
            amount: base_amount,
            symbol: base_currency,
            convert: quote_currency,
          },
          headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
          },
        },
      );

      const data = response.data.data;
      const quote =
        data?.[0]?.quote?.[quote_currency] ??
        data?.quote?.[quote_currency];

      const quote_amount = quote?.price;

      if (typeof quote_amount !== 'number') {
        throw new InternalServerErrorException(
          'Unable to calculate quote amount at the moment.',
        );
      }

      return {
        base_amount,
        base_currency,
        quote_currency,
        quote_amount,
      };
    } catch (error) {
      handleCoinMarketCapError(error);
    }
  }
}
