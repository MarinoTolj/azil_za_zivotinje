import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiCloseCircleOutline } from "@mdi/js";

const checkSize = 1.5;

const CheckMark = ({ check }: { check: boolean }) => {
  if (check)
    return (
      <Icon path={mdiCheckCircleOutline} size={checkSize} color={"green"} />
    );
  else
    return <Icon path={mdiCloseCircleOutline} size={checkSize} color={"red"} />;
};

export default CheckMark;
