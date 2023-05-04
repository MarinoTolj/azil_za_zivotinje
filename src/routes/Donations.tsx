import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/FormComponents/Input";
import { IDonation, donationCategory, donationType } from "../helpers/types";
import Radio from "../components/FormComponents/Radio";
import { firestore } from "../firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DonationCategory from "../components/DonationCategory";

const Donations = () => {
  const [openModal, setOpenModal] = useState(false);
  const [donation, setDonation] = useState<Omit<IDonation, "id">>({
    amount: 0,
    category: "donated",
    description: "",
    type: "food",
  });
  const [donations, setDonations] = useState<IDonation[]>([]);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  const changeDonation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setDonation((curr) => {
      return { ...curr, [name]: value };
    });
  };

  const fetchDonations = async () => {
    await firestore.GetCollectionByName("donations", setDonations);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const openCloseModal = () => {
    setOpenModal(!openModal);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const donationData = donation;
    if (isAdmin) donationData["category"] = "looking";
    else donationData["category"] = "offering";

    await firestore.AddDocument("donations", donationData);
    openCloseModal();
  };

  return (
    <div className="flex flex-col w-fit m-auto">
      <Button onClick={openCloseModal} className="my-3">
        New Donation
      </Button>
      <Modal open={openModal} openCloseModal={openCloseModal}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="">Type:</label>

            {donationType.map((type) => (
              <div>
                <Radio
                  id={type}
                  label={type}
                  onChange={changeDonation}
                  name="type"
                  value={type}
                  className=""
                />
              </div>
            ))}
          </div>

          <Input
            label="Amount(€):"
            required
            onChange={changeDonation}
            type="number"
            step="0.01"
            name="amount"
            value={donation.amount}
          />

          <Input
            label="Description: "
            name={"description"}
            onChange={changeDonation}
            value={donation.description}
            maxLength={30}
          />
          <Button className="mb-3">Submit</Button>
        </form>
      </Modal>
      <div className="mx-3">
        <DonationCategory category="looking" donations={donations} />
        <DonationCategory category="offering" donations={donations} />
        <DonationCategory category="donated" donations={donations} />
      </div>
    </div>
  );
};

export default Donations;
