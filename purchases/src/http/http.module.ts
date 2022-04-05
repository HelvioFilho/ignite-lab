import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
// eslint-disable-next-line prettier/prettier
export class HttpModule { }
