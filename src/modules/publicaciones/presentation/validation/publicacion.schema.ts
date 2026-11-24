import { z } from 'zod';

export const publicacionSchema = z.object({
  titulo: z.string().trim().min(5, 'El título debe tener al menos 5 caracteres').max(200),
  descripcion: z.string().trim().min(20, 'La descripción debe tener al menos 20 caracteres').max(5000),
  precio: z.coerce.number({ error: 'Ingresa un precio válido' }).positive('El precio debe ser mayor a cero'),
  tipoOperacionId: z.string().min(1, 'Selecciona un tipo de operación'),
});

export type PublicacionFormValues = z.infer<typeof publicacionSchema>;
