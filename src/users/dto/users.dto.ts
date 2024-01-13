import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;
}
