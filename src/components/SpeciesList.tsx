import { firstLetterToUppercase } from "../helpers/functions";
import { species } from "../helpers/types";
import Radio from "./FormComponents/Radio";

type PropType =
  | {
      type: "form";
      onChange: (
        e:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLSelectElement>
      ) => void;
    }
  | {
      type: "filter";
      onChange: (
        e:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLSelectElement>
      ) => void;
    };

const SpeciesList: React.FC<PropType> = (props) => {
  return (
    <>
      {species.map((species) => {
        if (species === "") return null;
        return (
          <div className="hidden md:block" key={species}>
            <Radio
              label={firstLetterToUppercase(species)}
              name="species"
              value={species}
              onChange={props.onChange}
            />
          </div>
        );
      })}
      <div className="md:hidden">
        <select name="species" id="species" onChange={props.onChange} required>
          {props.type === "filter" ? (
            <option value="All Species" selected>
              All Species
            </option>
          ) : (
            <option selected disabled>
              Select Species
            </option>
          )}

          {species.map((species) => {
            if (species === "") return null;
            return (
              <option key={species} value={species}>
                {firstLetterToUppercase(species)}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
export default SpeciesList;
