import { builder } from "./builder";

builder.scalarType("DataUrl", {
  serialize: (value) => value,
});
