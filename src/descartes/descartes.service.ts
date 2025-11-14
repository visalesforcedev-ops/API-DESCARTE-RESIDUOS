import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDescarteDto } from '../dtos/create-descarte.dto';

export interface Descarte {
  id: number;
  nome_usuario: string;
  id_ponto_descarte: number;
  tipo_residuo: 'plástico' | 'papel' | 'orgânico' | 'eletrônico' | 'vidro';
  data: Date;
}

export interface FiltrosConsulta {
  id_ponto_descarte?: number;
  tipo_residuo?: 'plástico' | 'papel' | 'orgânico' | 'eletrônico' | 'vidro';
  data?: Date;
  nome_usuario?: string;
}

@Injectable()
export class DescartesService {
  private descartes: Descarte[] = [];
  private currentId = 1;

  create(descarteDto: CreateDescarteDto): Descarte {
    const novoDescarte: Descarte = {
      id: this.currentId++,
      ...descarteDto,
      data: new Date(descarteDto.data),
    };
    this.descartes.push(novoDescarte);
    return novoDescarte;
  }

  findAll(filtros: FiltrosConsulta): Descarte[] {
    let resultado = this.descartes;
    const { id_ponto_descarte, tipo_residuo, nome_usuario, data } = filtros;

    if (id_ponto_descarte) {
      resultado = resultado.filter(
        (d) => d.id_ponto_descarte === +id_ponto_descarte,
      );
    }
    if (tipo_residuo) {
      resultado = resultado.filter((d) => d.tipo_residuo === tipo_residuo);
    }
    if (nome_usuario) {
      resultado = resultado.filter((d) => d.nome_usuario === nome_usuario);
    }
    if (data) {
      const dataFiltro = new Date(data);
      resultado = resultado.filter(
        (d) => d.data.toDateString() === dataFiltro.toDateString(),
      );
    }

    return resultado;
  }

  findOne(id: number): Descarte {
    const descarte = this.descartes.find((d) => d.id === id);
    if (!descarte) {
      throw new NotFoundException(`Descarte com ID ${id} não encontrado.`);
    }
    return descarte;
  }
}
