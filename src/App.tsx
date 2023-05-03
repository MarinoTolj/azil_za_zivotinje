import Input from "./components/FormComponents/Input";
import TextArea from "./components/FormComponents/TextArea";
import { useState } from "react";
import Button from "./components/Button";
import Map from "./components/Map";
import NavBtn from "./components/NavBtn";
import Link from "./components/Link";
import Radio from "./components/FormComponents/Radio";

function App() {
  const handleChange = () => {
    /*  */
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
      <form className="w-2/5 max-w-lg min-w-fit m-auto mt-10 flex flex-col gap-5 mb-6">
        <Input
          label="Name: "
          onChange={handleChange}
          placeholder="Type your name"
          required
        />
        <Input
          label="Email: "
          type="emai"
          onChange={handleChange}
          placeholder="Type your email"
          required
        />
        {/*TODO: pattern for phone number */}
        <Input
          label="Phone: "
          type="tel"
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        <div>
          <label htmlFor="">Please select the reason for your inquiry:</label>
          <div>
            <Radio label="Adoption" onChange={handleChange} name="inquiry" />
          </div>
          <div>
            <Radio label="Fostering" onChange={handleChange} name="inquiry" />
          </div>
          <div>
            <Radio label="Donations" onChange={handleChange} name="inquiry" />
          </div>
          <div>
            <Radio label="Other" onChange={handleChange} name="inquiry" />
          </div>
        </div>
        <div>
          <label htmlFor="">
            Please let us know how you found out about us:
          </label>
          <div>
            <Radio label="Website" onChange={handleChange} name="survey" />
          </div>
          <div>
            <Radio label="Social Media" onChange={handleChange} name="survey" />
          </div>
          <div>
            <Radio label="Event" onChange={handleChange} name="survey" />
          </div>
          <div>
            <Radio label="Other" onChange={handleChange} name="survey" />
          </div>
        </div>
        <TextArea
          label="Message: "
          onChange={handleChange}
          placeholder="Send a message"
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
