import { Species, species } from "../helpers/types";
import Input from "./Input";

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
          <Input
            key={species}
            type="radio"
            name="species"
            label={firstLetterToUppercase(species)}
            value={species}
            required
            setValue={props.setValue}
          />
        );
      })}
    </>
  );
};
export default SpeciesList;
