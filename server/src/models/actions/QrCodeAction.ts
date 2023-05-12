import QRCode from "qrcode";
import { Action } from "./Action";
import { DataUrl } from "../../schema/builder";

export class QrCodeAction extends Action {
  dataUrl: DataUrl;
  private constructor(dataUrl: DataUrl, milestoneId: string) {
    super(milestoneId);
    this.dataUrl = dataUrl;
  }

  static async create(
    data: string,
    milestoneId: string
  ): Promise<QrCodeAction> {
    const dataUrl = await QRCode.toDataURL(data);
    return new QrCodeAction(dataUrl, milestoneId);
  }
}
