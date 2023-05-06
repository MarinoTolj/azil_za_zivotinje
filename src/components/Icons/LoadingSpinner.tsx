import { Icon } from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center">
      <Icon path={mdiLoading} size={10} spin className="text-main-orange" />
    </div>
  );
};

export default LoadingSpinner;
