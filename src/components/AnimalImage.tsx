import { IAnimal } from "../helpers/types";

type PropType = {
  animal: IAnimal;
};

const AnimalImage: React.FC<PropType> = (props) => {
  const { animal } = props;
  return (
    <div className={`h-full relative`}>
      <a href={`/all-animals/${animal.id}`}>
        <img
          src={animal.imageUrl}
          alt="animal image"
          className={`h-full w-full rounded-2xl `}
        />
        <div
          className={`absolute bottom-0 z-10 ${
            animal.adopted === "adopted"
              ? "bg-adopted"
              : animal.adopted === "fostered"
              ? "bg-fostered"
              : "bg-not-adopted"
          }  text-white text-center  min-w-full w-fit rounded-br-2xl rounded-bl-2xl text-2xl`}
        >
          {animal.name}
        </div>
      </a>
    </div>
  );
};
export default AnimalImage;
