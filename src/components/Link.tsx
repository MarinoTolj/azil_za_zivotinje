import { RouteType } from "../main";

type PropType = {
  path: RouteType["path"];
  children: React.ReactNode;
};

const Link: React.FC<PropType> = (props) => {
  return (
    <a href={props.path} className="underline text-blue-700">
      {props.children}
    </a>
  );
};
export default Link;
