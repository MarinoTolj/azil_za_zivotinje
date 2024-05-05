import { useSelector } from "react-redux";
import { Capitalize, ErrorMessage } from "../helpers/functions";
import { DonationCategoryType, IDonation } from "../helpers/types";
import Button from "./Button";
import { RootState } from "../redux/store";
import TrashIcon from "./Icons/TrashIcon";
import axios, { axiosProtected } from "../api/axios";
type PropType = {
  category: DonationCategoryType;
  donations: IDonation[];
};

const DonationCategory: React.FC<PropType> = (props) => {
  return (
    <div className="mb-9 m-auto">
      <h2 className="text-3xl text-red-600">{Capitalize(props.category)}:</h2>
      <table className="w-full">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="text-start">Type</th>
            <th className="text-start">Amount</th>
            <th className="text-start">Description</th>
            <th className="text-start">Options</th>
          </tr>
        </thead>

        <tbody>
          {props.donations.map((donation) => {
            if (donation.category === props.category)
              return <CategoryElement key={donation.id} donation={donation} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const CategoryElement = ({ donation }: { donation: IDonation }) => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  const deleteDonation = async () => {
    const response = confirm(
      "Are you sure you want to remove this donation?\n- " +
        donation.description
    );
    if (response) {
      try {
        await axiosProtected.delete(`/donations/${donation.id}`);
      } catch (error) {
        ErrorMessage("An error has occured");
      }
    }
  };

  const updateDonation = async () => {
    try {
      await axios.patch(`/donations/${donation.id}`, { category: "donated" });
    } catch (error) {
      ErrorMessage("An error has occured");
    }
  };

  const repeatDonation = async () => {
    const repeatedData: Omit<IDonation, "id"> = {
      ...donation,
      category: "looking",
    };
    try {
      await axiosProtected.post(`/donations/`, repeatedData);
    } catch (error) {
      ErrorMessage("An error has occured");
    }
  };

  return (
    <tr className="border-b-2 border-gray-500 border-dotted">
      <td className="py-3">{donation.type}</td>
      <td className="py-3">{donation.amount} €</td>
      <td className="py-3">{donation.description}</td>
      <td className="py-3 w-fit flex">
        {isAdmin ? (
          <>
            {donation.category === "donated" ? (
              <Button className="mr-1" onClick={repeatDonation}>
                Repeat Donation
              </Button>
            ) : (
              <Button className="mr-1 p-1" onClick={updateDonation}>
                {donation.category === "looking" ? "Mark as Donated" : "Accept"}
              </Button>
            )}
            <button
              className="border-red-500 border-2 rounded-md border-solid"
              onClick={deleteDonation}
            >
              <TrashIcon />
            </button>
          </>
        ) : (
          <>
            {donation.category === "looking" && (
              <Button onClick={updateDonation} className="min-w-fit px-3">
                {"Donate"}
              </Button>
            )}
          </>
        )}
      </td>
    </tr>
  );
};
export default DonationCategory;
