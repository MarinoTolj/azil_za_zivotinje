import { useRef } from "react";
import Button from "./Button";
import { FormType } from "../helpers/types";
import Input from "./FormComponents/Input";
import Radio from "./FormComponents/Radio";
import TextArea from "./FormComponents/TextArea";
import emailjs from "@emailjs/browser";
import { SuccessMessage } from "../helpers/functions";

const ContactUsForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = () => {
    /** */
  };

  const sentContactForm = (e: FormType) => {
    e.preventDefault();
    if (formRef.current !== null) {
      emailjs
        .sendForm(
          "service_vtvdhn2",
          "template_6v14wcj",
          formRef.current,
          "qjtVL2O-jUu9qnHzk"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      SuccessMessage(
        `Email successfully sent to: ${formRef.current.email.value}`
      );
      formRef.current.reset();
    }
  };

  return (
    <form
      ref={formRef}
      className="w-2/5 max-w-lg min-w-fit m-auto mt-10 flex flex-col gap-5 mb-6"
      onSubmit={sentContactForm}
    >
      <Input
        label="Name"
        onChange={handleChange}
        placeholder="Type your name"
        name="name"
        required
      />
      <Input
        label="Email"
        type="email"
        onChange={handleChange}
        placeholder="Type your email"
        name="email"
        required
      />

      <Input
        label="Phone: "
        type="tel"
        onChange={handleChange}
        name="phoneNumber"
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
          />
        </div>
        <div>
          <Radio
            label="Fostering"
            onChange={handleChange}
            name="inquiry"
            value={"fostering"}
          />
        </div>
        <div>
          <Radio
            label="Donations"
            onChange={handleChange}
            name="inquiry"
            value={"donations"}
          />
        </div>
        <div>
          <Radio
            label="Other"
            onChange={handleChange}
            name="inquiry"
            value={"other"}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">Please let us know how you found out about us:</label>
        <div>
          <Radio
            label="Website"
            onChange={handleChange}
            name="survey"
            value={"website"}
          />
        </div>
        <div>
          <Radio
            label="Social Media"
            onChange={handleChange}
            name="survey"
            value={"social media"}
          />
        </div>
        <div>
          <Radio
            label="Event"
            onChange={handleChange}
            name="survey"
            value={"event"}
          />
        </div>
        <div>
          <Radio
            label="Some Other Way"
            onChange={handleChange}
            name="survey"
            value={"other"}
          />
        </div>
      </div>
      <TextArea
        label="Message: "
        onChange={handleChange}
        placeholder="Send a message"
        name="message"
        required
      />
      <Button>Submit</Button>
    </form>
  );
};

export default ContactUsForm;
