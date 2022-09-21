import CreateATAScreen, {
  CreateATAScreenProps,
} from "../../components/instructions/CreateATA";
import { IInstruction } from "../interfaces/instruction";

export class CreateATAInstruction implements IInstruction {
  private _form: (props: CreateATAScreenProps) => JSX.Element;
  constructor() {
    this._form = CreateATAScreen;
  }

  public get Form(): (props: CreateATAScreenProps) => JSX.Element {
    return this._form;
  }
}
