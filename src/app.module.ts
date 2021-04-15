import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mailerConfig } from './config/mailer.config';
import { BackofficeModule } from './modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://trustroad:trustroad123@cluster0.xfawt.mongodb.net/test'),
    BackofficeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
