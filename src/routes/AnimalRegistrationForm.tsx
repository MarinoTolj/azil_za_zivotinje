import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ErrorPage from "../components/ErrorPage";

const AnimalRegistrationForm = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  if (!isAdmin) return <ErrorPage />;
  return <div>AnimalRegistrationForm</div>;
};

export default AnimalRegistrationForm;
