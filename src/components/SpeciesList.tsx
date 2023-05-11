import { Capitalize } from "../helpers/functions";
import { InputType, Species, species } from "../helpers/types";
import Radio from "./FormComponents/Radio";

type PropType = {
  type: "form" | "filter";
  onChange: (e: InputType) => void;
  defaultChecked?: Species;
};

const SpeciesList: React.FC<PropType> = (props) => {
  return (
    <>
      {species.map((species) => {
        if (species === "") return null;
        return (
          <div className="hidden md:block" key={species}>
            <Radio
              label={Capitalize(species)}
              name="species"
              value={species}
              onChange={props.onChange}
              checked={props.defaultChecked === species}
            />
          </div>
        );
      })}
      <div className="md:hidden">
        <select name="species" id="species" onChange={props.onChange} required>
          {props.type === "filter" ? (
            <option
              value="All Species"
              selected={props.defaultChecked === undefined}
            >
              All Species
            </option>
          ) : (
            <option
              selected={props.defaultChecked === undefined}
              disabled
              value=""
            >
              Select Species
            </option>
          )}

          {species.map((species) => {
            if (species === "") return null;
            return (
              <option
                key={species}
                value={species}
                selected={props.defaultChecked === species}
              >
                {Capitalize(species)}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
export default SpeciesList;
