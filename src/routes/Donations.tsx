import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/FormComponents/Input";
import { IDonation, InputType, donationType } from "../helpers/types";
import Radio from "../components/FormComponents/Radio";
import { firestoreUtils } from "../firebase/firestoreUtils";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DonationCategory from "../components/DonationCategory";
import LoadingSpinner from "../components/Icons/LoadingSpinner";
import { SuccessMessage } from "../helpers/functions";

const Donations = () => {
  const [openModal, setOpenModal] = useState(false);
  const [donation, setDonation] = useState<Omit<IDonation, "id">>({
    amount: 0,
    category: "donated",
    description: "",
    type: "food",
  });
  const [donations, setDonations] = useState<IDonation[]>();
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  const changeDonation = (e: InputType) => {
    const name = e.target.name;
    const value = e.target.value;
    setDonation((curr) => {
      return { ...curr, [name]: value };
    });
  };

  const fetchDonations = async () => {
    await firestoreUtils.GetCollectionByName("donations", setDonations);
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

    await firestoreUtils.AddDocument("donations", donationData);
    openCloseModal();
    SuccessMessage("New Donation Successfully Added");
    setDonation({
      amount: 0,
      category: "donated",
      description: "",
      type: "food",
    });
  };
  if (donations === undefined) return <LoadingSpinner />;

  return (
    <>
      <div className="w-full max-w-3xl m-auto">
        <div className="mx-3">
          <Button onClick={openCloseModal} className="my-3 self-start max-w-xs">
            New Donation
          </Button>
          <DonationCategory category="looking" donations={donations} />
          <DonationCategory category="offering" donations={donations} />
          <DonationCategory category="donated" donations={donations} />
        </div>
      </div>
      <Modal isOpen={openModal} openCloseModal={openCloseModal}>
        <form onSubmit={handleSubmit} className="flex flex-col pt-2 gap-4">
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
            min={0}
            value={donation.amount}
          />

          <Input
            label="Description: "
            placeholder="Type short description (max 40 characters)."
            name={"description"}
            onChange={changeDonation}
            value={donation.description}
            maxLength={40}
          />
          <Button className="mt-3 mb-5">Submit</Button>
        </form>
      </Modal>
    </>
  );
};

export default Donations;
