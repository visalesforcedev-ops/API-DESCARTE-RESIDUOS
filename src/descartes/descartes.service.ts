import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDescarteDto } from '../dtos/create-descarte.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Descarte, DescarteDocument } from 'src/schemas/descarte-ponto-schema';
import { Model } from 'mongoose';

export interface FiltrosConsulta {
  id_ponto_descarte?: string;
  tipo_residuo?: 'plástico' | 'papel' | 'orgânico' | 'eletrônico' | 'vidro';
  data?: Date;
  nome_usuario?: string;
}

@Injectable()
export class DescartesService {
  constructor(
    @InjectModel(Descarte.name) private descarteModel: Model<DescarteDocument>,
  ) {}

  async create(descarteDto: CreateDescarteDto): Promise<Descarte> {
    const novoDescarte = new this.descarteModel({
      ...descarteDto,
      data: new Date(descarteDto.data),
      id_ponto_descarte: descarteDto.id_ponto_descarte,
    });
    return novoDescarte.save();
  }

  async findAll(filtros: FiltrosConsulta): Promise<Descarte[]> {
    const query = {};
    const { id_ponto_descarte, tipo_residuo, nome_usuario, data } = filtros;

    if (id_ponto_descarte) {
      query['id_ponto_descarte'] = id_ponto_descarte;
    }
    if (tipo_residuo) {
      query['tipo_residuo'] = tipo_residuo;
    }
    if (nome_usuario) {
      query['nome_usuario'] = nome_usuario;
    }
    if (data) {
      const dataFiltro = new Date(data);
      const inicioDia = new Date(dataFiltro.setHours(0, 0, 0, 0));
      const fimDia = new Date(dataFiltro.setHours(23, 59, 59, 999));
      query['data'] = { $gte: inicioDia, $lte: fimDia };
    }

    return this.descarteModel.find(query).populate('id_ponto_descarte').exec();
  }

  async findOne(id: string): Promise<Descarte> {
    const descarte = await this.descarteModel
      .findById(id)
      .populate('id_ponto_descarte')
      .exec();
    if (!descarte) {
      throw new NotFoundException(`Descarte com id ${id} não encontrado.`);
    }
    return descarte;
  }
}
