import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { SkinsModule } from './skins/skins.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    MulterModule.register({
      dest: './uploads/skins'
    }),
    AuthModule,
    CasesModule,
    SkinsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
