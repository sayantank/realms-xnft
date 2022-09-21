import TransferScreen, {
  TransferScreenProps,
} from "../../components/instructions/Transfer";
import { IInstruction } from "../interfaces/instruction";

export class TransferInstruction implements IInstruction {
  private _form: (props: TransferScreenProps) => JSX.Element;
  constructor() {
    this._form = TransferScreen;
  }

  public get Form(): (props: TransferScreenProps) => JSX.Element {
    return this._form;
  }
}
