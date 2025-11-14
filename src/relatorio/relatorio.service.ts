import { Injectable } from '@nestjs/common';
import { DescartesService } from '../descartes/descartes.service';
import { PontosDescarteService } from '../pontos-descarte/pontos-descarte.service';
import { Descarte } from '../schemas/descarte-ponto-schema';

@Injectable()
export class RelatorioService {
  constructor(
    private readonly descartesService: DescartesService,
    private readonly pontosService: PontosDescarteService,
  ) {}

  async generateReport() {
    const [todosDescartes, todosPontos] = await Promise.all([
      this.descartesService.findAll({}),
      this.pontosService.findAll(),
    ]);

    const totalPontosDescarte = todosPontos.length;

    const usuariosUnicos = new Set(todosDescartes.map((d) => d.nome_usuario));
    const totalUsuarios = usuariosUnicos.size;

    const residuoMaisFrequente = this.findResiduoMaisFrequente(todosDescartes);
    const mediaUltimos30Dias = this.calculateMediaUltimos30Dias(todosDescartes);
    const localMaisRegistros =
      await this.findLocalComMaisRegistros(todosDescartes);

    const percentualCrescimento = 'N/A';

    return {
      local_descarte_com_maior_numero_registros: localMaisRegistros,
      tipo_residuo_mais_frequentemente_descartado: residuoMaisFrequente,
      media_descartes_por_dia_ultimos_30_dias: mediaUltimos30Dias,
      numero_total_de_usuarios_no_sistema: totalUsuarios,
      total_de_pontos_descarte_cadastrados: totalPontosDescarte,
      percentual_crescimento_ou_reducao_comparado_mes_anterior:
        percentualCrescimento,
    };
  }

  private async findLocalComMaisRegistros(
    todosDescartes: Descarte[],
  ): Promise<string> {
    if (todosDescartes.length === 0) return 'Nenhum registro';
    const contagem = todosDescartes.reduce(
      (acc: Record<string, number>, descarte) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const id = descarte.id_ponto_descarte.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const idMaisFrequente = Object.keys(contagem).reduce((a, b) =>
      contagem[a] > contagem[b] ? a : b,
    );

    try {
      const ponto = await this.pontosService.findOne(idMaisFrequente);
      return ponto ? ponto.nome_local : 'ID não encontrado';
    } catch (error) {
      if (error instanceof Error) {
        return `ID não encontrado: ${error.message}`;
      }
      return 'ID não encontrado';
    }
  }

  private findResiduoMaisFrequente(todosDescartes: Descarte[]): string {
    if (todosDescartes.length === 0) return 'Nenhum registro';

    const contagem = todosDescartes.reduce(
      (acc, descarte) => {
        acc[descarte.tipo_residuo] = (acc[descarte.tipo_residuo] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.keys(contagem).reduce((a, b) =>
      contagem[a] > contagem[b] ? a : b,
    );
  }

  private calculateMediaUltimos30Dias(todosDescartes: Descarte[]): number {
    const agora = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(agora.getDate() - 30);

    const descartesUltimos30Dias = todosDescartes.filter((d) => {
      const dataDescarte = new Date(d.data);
      return dataDescarte >= trintaDiasAtras && dataDescarte <= agora;
    });

    if (descartesUltimos30Dias.length === 0) return 0;

    return descartesUltimos30Dias.length / 30;
  }
}
