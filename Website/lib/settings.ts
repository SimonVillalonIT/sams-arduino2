import * as z from "zod"

export const settingsSchema = z
  .object({
    "max-acepted": z
      .number({
        required_error: "¡No puede estar vacio!",
        invalid_type_error: "¡Debes ingresar un numero!",
      })
      .min(1, {
        message: "¡El valor mínimo es 1!",
      })
      .max(60, "¡El valor máximo es 60!"),
    "max-warning": z
      .number({
        required_error: "¡No puede estar vacio!",
        invalid_type_error: "¡Debes ingresar un numero!",
      })
      .min(10, {
        message: "¡El valor mínimo es 10!",
      })
      .max(70, "¡El valor máximo es 70!"),
  })
  .refine((data) => data["max-acepted"] <= data["max-warning"], {
    message: "El máximo aceptable no puede superar al maximo de advertencia",
    path: ["max-acepted"],
  })
