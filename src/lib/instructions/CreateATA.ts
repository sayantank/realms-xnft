import CreateATAScreen, {
  CreateATAScreenProps,
} from "../../components/instructions/CreateATA";
import { IInstruction } from "../interfaces/instruction";

export class CreateATAInstruction implements IInstruction {
  private _component: (props: CreateATAScreenProps) => JSX.Element;
  constructor() {
    this._component = CreateATAScreen;
  }

  public get Component(): (props: CreateATAScreenProps) => JSX.Element {
    return this._component;
  }
}
