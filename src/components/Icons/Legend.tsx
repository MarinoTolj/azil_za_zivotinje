import { Icon } from "@mdi/react";
import { mdiCheckboxBlank } from "@mdi/js";

const Legend = (props: { className: string }) => {
  return <Icon path={mdiCheckboxBlank} size={1} className={props.className} />;
};

export default Legend;
