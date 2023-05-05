import Icon from "@mdi/react";
import { mdiCheckboxBlank } from "@mdi/js";

const CheckBox = (props: { className: string }) => {
  return <Icon path={mdiCheckboxBlank} size={1} className={props.className} />;
};

export default CheckBox;
