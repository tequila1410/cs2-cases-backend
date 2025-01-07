import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Case } from './schemas/case.schema';
import { AddCaseDto } from "./dto/add-case.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CasesService {

  private baseUrl: string;

  constructor(
    private configService: ConfigService,
    @InjectModel(Case.name) private caseModel: Model<Case>
  ) {
    this.baseUrl = this.configService.get('BASE_URL');
  }

  async create(createCaseDto: AddCaseDto, imageUrl: string): Promise<Case> {
    const newCase = new this.caseModel({...createCaseDto, imageUrl});
    try {
      return await newCase.save();
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException('This case already exists.');
      throw error;
    }
  }

  async findById(id: string): Promise<Case> {
    const foundCase = await this.caseModel.findById(id).populate('skins.skin');
    if (!foundCase) {
      throw new NotFoundException(`Case with id ${id} not found`);
    }
    return foundCase;
  }

  async findAll(): Promise<Case[]> {
    const cases = await this.caseModel
      .find()
      .populate({
        path: 'skins.skin',
        model: 'Skin',
        select: 'weaponName skinName description price rarity imageUrl'
      })
      .lean()
      .exec();

    return cases.map((caseItem) => {
      caseItem.skins = caseItem.skins.map(skinDropRate => {
        if (skinDropRate.skin && skinDropRate.skin.imageUrl)
          skinDropRate.skin.imageUrl = `${this.baseUrl}${skinDropRate.skin.imageUrl}`;
        return skinDropRate;
      });

      if (caseItem.imageUrl)
        caseItem.imageUrl = `${this.baseUrl}${caseItem.imageUrl}`;

      return caseItem;
    })
  }
}