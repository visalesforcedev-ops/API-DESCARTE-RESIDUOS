import { Injectable } from '@nestjs/common';
import { DescartesService } from '../descartes/descartes.service';
import { PontosDescarteService } from '../pontos-descarte/pontos-descarte.service';

@Injectable()
export class RelatorioService {
  constructor(
    private readonly descartesService: DescartesService,
    private readonly pontosService: PontosDescarteService,
  ) {}

  generateReport() {
    const todosDescartes = this.descartesService.findAll({});
    const todosPontos = this.pontosService.findAll();

    const totalPontosDescarte = todosPontos.length;

    const usuariosUnicos = new Set(todosDescartes.map((d) => d.nome_usuario));
    const totalUsuarios = usuariosUnicos.size;

    const localMaisRegistros = this.findLocalComMaisRegistros();
    const residuoMaisFrequente = this.findResiduoMaisFrequente();
    const mediaUltimos30Dias = this.calculateMediaUltimos30Dias();
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

  private findLocalComMaisRegistros(): string {
    const todosDescartes = this.descartesService.findAll({});
    if (todosDescartes.length === 0) return 'Nenhum registro';

    const contagem = todosDescartes.reduce(
      (acc, descarte) => {
        acc[descarte.id_ponto_descarte] =
          (acc[descarte.id_ponto_descarte] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const idMaisFrequente = Object.keys(contagem).reduce((a, b) =>
      contagem[a] > contagem[b] ? a : b,
    );

    const ponto = this.pontosService.findOne(+idMaisFrequente);
    return ponto ? ponto.nome_local : 'ID não encontrado';
  }

  private findResiduoMaisFrequente(): string {
    const todosDescartes = this.descartesService.findAll({});
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

  private calculateMediaUltimos30Dias(): number {
    const todosDescartes = this.descartesService.findAll({});
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
