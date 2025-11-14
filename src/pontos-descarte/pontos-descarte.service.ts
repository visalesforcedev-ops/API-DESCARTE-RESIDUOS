import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePontoDto } from '../dtos/create-ponto.dto';

export interface PontoDescarte {
  id: number;
  nome_local: string;
  bairro: string;
  tipo_local: 'publico' | 'privado';
  categoria_residuos: string[];
  geolocalizacao: string;
}

@Injectable()
export class PontosDescarteService {
  private pontos: PontoDescarte[] = [];
  private currentId = 1;

  create(pontoDto: CreatePontoDto): PontoDescarte {
    const novoPonto: PontoDescarte = {
      id: this.currentId++,
      ...pontoDto,
    };
    this.pontos.push(novoPonto);
    return novoPonto;
  }

  findAll(): PontoDescarte[] {
    return this.pontos;
  }

  findOne(id: number): PontoDescarte {
    const ponto = this.pontos.find((p) => p.id === id);
    if (!ponto) {
      throw new NotFoundException(`Ponto com ID ${id} não encontrado.`);
    }
    return ponto;
  }
}
