import { Body, Controller, Post, Get, Param, UseInterceptors, BadRequestException, UploadedFile } from "@nestjs/common";
import { CasesService } from "./cases.service";
import { AddCaseDto } from "./dto/add-case.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { GetCaseDto } from "./dto/get-case.dto";
@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post('/add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/cases',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('Invalid file format'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() createCaseDto: AddCaseDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('Image is required');
    }
    const imageUrl = `/uploads/cases/${file.filename}`;
    if (typeof createCaseDto.skins === 'string') {
      try {
        createCaseDto.skins = JSON.parse(createCaseDto.skins);
      } catch (error) {
        throw new Error('Invalid skins format. It should be a valid JSON array.');
      }
    }
    return this.casesService.create(createCaseDto, imageUrl);
  }

  @Get('/getById')
  async findById(
    @Body() getCaseByIdDto: GetCaseDto
  ) {
    return this.casesService.findById(getCaseByIdDto.caseId);
  }

  @Get('/getAll')
  async findAll() {
    return this.casesService.findAll();
  }
}