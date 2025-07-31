import { IsDefined, IsNotEmpty, IsString, IsNumber, Min, Matches, Length } from 'class-validator';
  
  export class CreateQuoteDto {
    @IsDefined({ message: 'base_amount is required' })
    @IsNotEmpty({ message: 'base_amount cannot be empty' })
    @IsNumber({}, { message: 'base_amount must be a number' })
    @Min(0.00000001, {
      message: 'base_amount must be a number greater than zero',
    })
    base_amount: number;
  
    @IsDefined({ message: 'base_currency is required' })
    @IsNotEmpty({ message: 'base_currency cannot be empty' })
    @IsString({ message: 'base_currency must be a string' })
    @Length(3, 10, {
      message: 'base_currency must be between 3 and 10 characters',
    })
    @Matches(/^[A-Z]+$/, {
      message:
        'base_currency must contain only uppercase letters and cannot be empty(e.g., BTC, ETH)',
    })
    base_currency: string;
  
    @IsDefined({ message: 'quote_currency is required' })
    @IsNotEmpty({ message: 'quote_currency cannot be empty' })
    @IsString({ message: 'quote_currency must be a string' })
    @Length(3, 10, {
      message: 'quote_currency must be between 3 and 10 characters',
    })
    @Matches(/^[A-Z]+$/, {
      message:
        'quote_currency must contain only uppercase letters and cannot be empty(e.g., USD, USDT)',
    })
    quote_currency: string;
  }
  