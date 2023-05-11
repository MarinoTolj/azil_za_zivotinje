import Icon from "@mdi/react";
import { mdiFacebook, mdiInstagram } from "@mdi/js";

const Footer = () => {
  return (
    <div className="text-center mt-auto w-full p-5 border-black border-2 bg-main-orange text-orange-900">
      <p className="text-3xl">Animal Shelter</p>
      <p className="mt-10">Address - Ul. Ruđera Boškovića 32, 21000, Split</p>
      <p>Follow us on social media:</p>
      <div className="flex justify-center mt-1 mb-3">
        <Icon path={mdiFacebook} size={1} />
        <Icon path={mdiInstagram} size={1} />
      </div>
      <p className="mb-1">@ 2023 Animal Shelter. All rights reserved</p>
      <p>Thank you for supporting our mission to help animals in need.</p>
    </div>
  );
};

export default Footer;
