import { Controller, Get, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MdmCountriesService } from './mdm-countries.service';
import { MdmCountryEntity } from './entities/mdm-country.entity';

@ApiBearerAuth()
@ApiTags('countries')
@Controller('countries')
export class MdmCountriesController {
  constructor(private readonly countryService: MdmCountriesService) {}

  @Get()
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'Get all active countries',
    type: MdmCountryEntity,
  })
  findAll(): Promise<MdmCountryEntity[]> {
    return this.countryService.findAll();
  }
}
