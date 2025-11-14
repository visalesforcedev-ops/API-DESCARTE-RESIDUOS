import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PontoDescarteDocument = PontoDescarte & Document;

@Schema()
export class PontoDescarte {
  @Prop({ required: true })
  nome_local: string;

  @Prop({ required: true })
  bairro: string;

  @Prop({ required: true, enum: ['publico', 'privado'] })
  tipo_local: 'publico' | 'privado';

  @Prop([String])
  categoria_residuos: string[];

  @Prop()
  geolocalizacao: string;
}

export const PontoDescarteSchema = SchemaFactory.createForClass(PontoDescarte);
