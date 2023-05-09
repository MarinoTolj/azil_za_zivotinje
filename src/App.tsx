import Input from "./components/FormComponents/Input";
import TextArea from "./components/FormComponents/TextArea";
import Button from "./components/Button";
import Map from "./components/Map";
import Link from "./components/Link";
import Radio from "./components/FormComponents/Radio";
import { useState } from "react";
import { FormType, InputType } from "./helpers/types";

function App() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    inquiry: "",
    survey: "",
    message: "",
  });

  const handleChange = (e: InputType) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setContactForm((curr) => {
      return { ...curr, [name]: value };
    });
  };

  const sentContactForm = (e: FormType) => {
    e.preventDefault();
    setContactForm({
      name: "",
      email: "",
      phoneNumber: "",
      inquiry: "",
      survey: "",
      message: "",
    });
  };

  return (
    <div>
      <div className="paragraph">
        <h2 className="mb-3 underline text-2xl text-center">
          Welcome to Animal Haven
        </h2>
        <p>
          Animal Haven is an animal shelter that provides a safe and loving
          temporary home to animals in need. Our mission is to rescue,
          rehabilitate, and rehome abandoned, abused, or neglected animals, and
          to promote responsible pet ownership and humane treatment of animals
          in the community.
        </p>

        <p className="mt-3">
          We offer a wide range of services to our customers, including{" "}
          <Link path="/all-animals">adoption</Link>, fostering, volunteering,
          and <Link path="/donations">donations</Link>.
        </p>
      </div>
      <p className="paragraph text-lg -mb-8 sm:-mb-8">Found Us Here:</p>
      <Map />
      <div className="paragraph">
        <h3 className="mb-3 underline text-xl text-center">Contact Us</h3>
        <p>
          Thank you for your interest in Animal Haven! Please use the form below
          to get in touch with us regarding any questions, comments, or concerns
          you may have. We will do our best to get back to you as soon as
          possible.
        </p>
      </div>
      <form
        className="w-2/5 max-w-lg min-w-fit m-auto mt-10 flex flex-col gap-5 mb-6"
        onSubmit={sentContactForm}
      >
        <Input
          label="Name"
          onChange={handleChange}
          placeholder="Type your name"
          name="name"
          value={contactForm.name}
          required
        />
        <Input
          label="Email"
          type="email"
          onChange={handleChange}
          placeholder="Type your email"
          name="email"
          value={contactForm.email}
          required
        />
        {/*TODO: pattern for phone number */}
        <Input
          label="Phone: "
          type="tel"
          onChange={handleChange}
          name="phoneNumber"
          value={contactForm.phoneNumber}
          placeholder="Enter your phone number"
        />
        <div>
          <label htmlFor="">Please select the reason for your inquiry:</label>
          <div>
            <Radio
              label="Adoption"
              onChange={handleChange}
              name="inquiry"
              value={"adoption"}
              checked={contactForm.inquiry === "adoption"}
            />
          </div>
          <div>
            <Radio
              label="Fostering"
              onChange={handleChange}
              name="inquiry"
              value={"fostering"}
              checked={contactForm.inquiry === "fostering"}
            />
          </div>
          <div>
            <Radio
              label="Donations"
              onChange={handleChange}
              name="inquiry"
              value={"donations"}
              checked={contactForm.inquiry === "donations"}
            />
          </div>
          <div>
            <Radio
              label="Other"
              onChange={handleChange}
              name="inquiry"
              value={"other"}
              checked={contactForm.inquiry === "other"}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">
            Please let us know how you found out about us:
          </label>
          <div>
            <Radio
              label="Website"
              onChange={handleChange}
              name="survey"
              value={"website"}
              checked={contactForm.survey === "website"}
            />
          </div>
          <div>
            <Radio
              label="Social Media"
              onChange={handleChange}
              name="survey"
              value={"social media"}
              checked={contactForm.survey === "social media"}
            />
          </div>
          <div>
            <Radio
              label="Event"
              onChange={handleChange}
              name="survey"
              value={"event"}
              checked={contactForm.survey === "event"}
            />
          </div>
          <div>
            <Radio
              label="Other"
              onChange={handleChange}
              name="survey"
              value={"other"}
              checked={contactForm.survey === "other"}
            />
          </div>
        </div>
        <TextArea
          label="Message: "
          onChange={handleChange}
          placeholder="Send a message"
          name="message"
          value={contactForm.message}
          required
        />
        <Button>Submit</Button>
      </form>
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
