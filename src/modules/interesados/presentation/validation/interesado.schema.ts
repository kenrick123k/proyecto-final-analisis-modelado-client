import { z } from 'zod';

export const interesadoSchema = z.object({
  nombreCompleto: z.string().trim().min(3, 'Escribe tu nombre completo').max(200),
  correo: z.string().trim().email('Escribe un correo válido').max(150),
  identificacion: z.string().trim().max(50).optional(),
  numeroTelefono: z.string().trim().max(30).optional(),
});

export type InteresadoFormValues = z.infer<typeof interesadoSchema>;
