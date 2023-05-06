import { AdoptedStatus } from "../../helpers/types";
import Radio from "./Radio";

type PropType = {
  defaultCheck: AdoptedStatus | "All";
  setterFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AdoptedList: React.FC<PropType> = (props) => {
  return (
    <div className="flex flex-col">
      <div>
        <Radio
          label="Adopted"
          checked={props.defaultCheck === "adopted"}
          name="adopted"
          value="adopted"
          onChange={props.setterFunction}
        />
      </div>
      <div>
        <Radio
          label="Not Adopted"
          name="adopted"
          checked={props.defaultCheck === "not adopted"}
          value="not adopted"
          onChange={props.setterFunction}
        />
      </div>
      <div>
        <Radio
          label="Fostered"
          name="adopted"
          checked={props.defaultCheck === "fostered"}
          value="fostered"
          onChange={props.setterFunction}
        />
      </div>
    </div>
  );
};
export default AdoptedList;
