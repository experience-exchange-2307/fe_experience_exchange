import "./CreateAccountForm.css";
import React from "react";
import { useState } from "react";
import { NewUserData } from "types";
import { Link } from "react-router-dom";

interface CreateAccountFormProps {
  createNewUser: (newUserData: NewUserData) => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  createNewUser,
}) => {
  const [formData, setFormData] = useState<NewUserData>({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    is_remote: false,
    about: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRemoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      is_remote: e.target.checked,
    }));
  };

  const isFormComplete = () => {
    return !Object.values(formData).some((inputData) => inputData === "");
  };

  const handleSubmit = () => {
    if (isFormComplete()) {
      console.log("Submitting:", formData);
      // make POST request with formData here
      createNewUser(formData);
      // navigate("/dashboard")
    }
  };

  return (
    <>
      <section className='sign-up-container'>
        <h2>Let’s get you started with an Experience Exchange account</h2>
        <form className='form'>
          <div className='name-container'>
            <div className='input-group'>
              <label>First Name</label>
              <input
                className='create-account-input'
                type='text'
                placeholder='First name'
                name='first_name'
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-group'>
              <label>Last Name</label>
              <input
                className='create-account-input'
                type='text'
                placeholder='Last name'
                name='last_name'
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='input-group'>
            <label>Email</label>
            <input
              className='create-account-input'
              type='email'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className='address-container'>
            <div className='input-group'>
              <label>Street</label>
              <input
                className='create-account-input'
                type='text'
                placeholder='Street'
                name='street'
                value={formData.street}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-group'>
              <label>City</label>
              <input
                className='create-account-input'
                type='text'
                placeholder='City'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-group'>
              <label>State</label>
              <input
                className='create-account-input'
                type='text'
                placeholder='State'
                name='state'
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div className='input-group'>
              <label>Zip Code</label>
              <input
                className='create-account-input'
                type='text'
                placeholder='Zip Code'
                name='zipcode'
                value={formData.zipcode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='input-group'>
            <label htmlFor='about'>Tell us about yourself</label>
            <textarea
              name='about'
              value={formData.about}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className='input-group'>
            <label>
              Remote
              <input
                type='checkbox'
                name='is_remote'
                checked={formData.is_remote}
                onChange={handleRemoteChange}
              />
            </label>
          </div>

          <div className='create-account-container'>
            <button
              className='create-account-btn'
              type='button'
              disabled={!isFormComplete()}
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </div>
        </form>
        <div className='solid'></div>
        <div className='demo-container'>
          <Link to='/dashboard/14'>
            <button className='create-account-btn' type='button'>
              Login as a Demo User
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CreateAccountForm;
