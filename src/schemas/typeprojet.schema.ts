import { object, string, TypeOf, z } from 'zod';

export const TypeProjetSchema = object({
    body: object({
        title: string({})
        .min(4, 'Le titre doit avoir au moins 4 caractères'),
    }),
  });

  export type TypeProjetInput = TypeOf<typeof TypeProjetSchema>['body'];