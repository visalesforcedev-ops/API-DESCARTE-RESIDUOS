import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PontoDescarte } from './ponto-descarte.schema';

export type DescarteDocument = Descarte & Document;

@Schema()
export class Descarte {
  @Prop({ required: true })
  nome_usuario: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PontoDescarte',
    required: true,
  })
  id_ponto_descarte: PontoDescarte;

  @Prop({
    required: true,
    enum: ['plástico', 'papel', 'orgânico', 'eletrônico', 'vidro'],
  })
  tipo_residuo: 'plástico' | 'papel' | 'orgânico' | 'eletrônico' | 'vidro';

  @Prop({ required: true, type: Date })
  data: Date;
}

export const DescarteSchema = SchemaFactory.createForClass(Descarte);
