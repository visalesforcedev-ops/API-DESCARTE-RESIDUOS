export class CreatePontoDto {
  nome_local: string;
  bairro: string;
  tipo_local: 'publico' | 'privado';
  categoria_residuos: string[];
  geolocalizacao: string;
}
