import { Species, species } from "../helpers/types";
import Radio from "./FormComponents/Radio";

type PropType =
  | {
      type: "form";
      setValue: React.Dispatch<React.SetStateAction<Species>>;
    }
  | {
      type: "filter";
      setValue: React.Dispatch<React.SetStateAction<Species | "All Species">>;
    };

const firstLetterToUppercase = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
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
              setValue={props.setValue}
            />
          </div>
        );
      })}
      <div className="md:hidden">
        <select
          name="species"
          id="species"
          onChange={(e) => props.setValue(e.currentTarget.value as any)}
          required
        >
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
