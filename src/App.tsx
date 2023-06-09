import Map from "./components/Map";
import ContactUsForm from "./components/ContactUsForm";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="paragraph">
        <h2 className="mb-3 underline text-4xl text-center">
          Welcome to Animal Shelter
        </h2>
        <p className="mt-10 -mb-4">
          Address - Ul. Ruđera Boškovića 32, 21000, Split
        </p>
      </div>
      <p className="paragraph text-lg">Found Us Here:</p>
      <Map />
      <p className="paragraph mt-3">
        We offer a wide range of services to our customers, including{" "}
        <Link to="/all-animals" className="underline text-blue-700">
          adoption
        </Link>
        ,{" "}
        <Link to="/all-animals" className="underline text-blue-700">
          fostering
        </Link>
        , volunteering, and{" "}
        <Link to="/donations" className="underline text-blue-700">
          donations
        </Link>
        .
      </p>
      <div className="paragraph">
        <h3 className="mb-3 underline text-xl text-center">Contact Us</h3>
        <p>
          Thank you for your interest in Animal Shelter! Please use the form
          below to get in touch with us regarding any questions, comments, or
          concerns you may have. We will do our best to get back to you as soon
          as possible.
        </p>
      </div>
      <ContactUsForm />
      <p className="mb-10 max-w-lg text-md italic text-gray-500 sm:m-auto mx-3 mt-5 sm:my-5">
        By submitting this form, you consent to the collection and processing of
        your personal information for the purposes of responding to your
        inquiry. Please see our privacy policy for more information on how we
        handle personal data. Thank you for your support!
      </p>
    </div>
  );
}

export default App;
