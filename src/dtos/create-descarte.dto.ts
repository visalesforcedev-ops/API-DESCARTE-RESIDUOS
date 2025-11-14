export class CreateDescarteDto {
  nome_usuario: string;
  id_ponto_descarte: number;
  tipo_residuo: 'plástico' | 'papel' | 'orgânico' | 'eletrônico' | 'vidro';
  data: Date;
}
