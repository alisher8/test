import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRequestDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
