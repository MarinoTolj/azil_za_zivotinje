import Icon from "@mdi/react";
import { mdiFacebook, mdiInstagram } from "@mdi/js";

const Footer = () => {
  return (
    <div className="text-center mt-auto w-full p-2 bg-main-orange text-orange-900">
      <p className="text-3xl">Animal Shelter</p>
      <div className="mt-3 md:mt-0 md:flex md:justify-between">
        <div>
          <p>Address - Ul. Ruđera Boškovića 32, 21000, Split</p>
          <p>Follow us on social media:</p>
          <div className="flex justify-center mt-1 mb-3">
            <Icon path={mdiFacebook} size={1} />
            <Icon path={mdiInstagram} size={1} />
          </div>
        </div>
        <div>
          <p>Thank you for supporting our mission to help animals in need.</p>
          <p>@ 2023 Animal Shelter. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
