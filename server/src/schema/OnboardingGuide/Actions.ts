import { ButtonAction, QrCodeAction } from "../../models/actions";
import { builder } from "../builder";
import { ActionInterface } from "./Interfaces";

export const QRCodeAction = builder.objectType("QRCodeAction", {
  interfaces: [ActionInterface],
  isTypeOf: (value) => value instanceof QrCodeAction,
  fields: (t) => ({
    dataUrl: t.exposeString("dataUrl"),
  }),
});

export const ButtonActionType = builder.objectType(ButtonAction, {
  interfaces: [ActionInterface],
  name: "ButtonAction",
  isTypeOf: (value) => value instanceof ButtonAction,
  fields: (t) => ({
    text: t.exposeString("text"),
    url: t.exposeString("url"),
  }),
});
