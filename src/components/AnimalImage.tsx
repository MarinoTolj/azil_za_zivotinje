import { IAnimal } from "../helpers/types";

type PropType = {
  animal: IAnimal;
};

const AnimalImage: React.FC<PropType> = (props) => {
  const { animal } = props;
  return (
    <div className="h-full relative">
      <a href={`/all-animals/${animal.name}`}>
        <img
          src={animal.imageUrl}
          alt="animal image"
          className="h-full w-full rounded-2xl"
        />
      </a>
      <div className="absolute bottom-0 z-10 text-white text-center bg-text-overlay min-w-full w-fit rounded-br-2xl rounded-bl-2xl text-2xl">
        {animal.name}
      </div>
    </div>
  );
};
export default AnimalImage;
