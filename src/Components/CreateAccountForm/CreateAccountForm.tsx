import "./CreateAccountForm.css"
import React from 'react'
import { useState } from 'react'
import { NewUserData } from 'types';

interface CreateAccountFormProps {
  createNewUser: (newUserData: NewUserData) => void
}

function CreateAccountForm: React.FC<CreateAccountFormProps>({createNewUser}) {


  const [formData, setFormData] = useState<NewUserData>({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    isRemote: false,
    about: "",
  })


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }


const handleRemoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    isRemote: e.target.checked,
  }));
};

  const handleSubmit = () => {
    // make POST request with formData here
    createNewUser(formData)
    console.log('Submitting:', formData);

  };

  return (
    <section className="sign-up-container">
  <h2>Let’s get you started with an Experience Exchange account</h2>
  <form className="form">
    <div className="name-container">
      <div className="input-group">
        <label>First Name</label>
        <input 
          className="create-account-input"
          type="text"
          placeholder="First name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>Last Name</label>
        <input 
          className="create-account-input"
          type="text"
          placeholder="Last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="input-group">
      <label>Email</label>
      <input 
        className="create-account-input"
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
    </div>

    <div className="address-container">
      <div className="input-group">
        <label>Street</label>
        <input 
          className="create-account-input"
          type="text"
          placeholder="Street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>City</label>
        <input 
          className="create-account-input"
          type="text"
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>State</label>
        <input 
          className="create-account-input"
          type="text"
          placeholder="State"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>Zip Code</label>
        <input 
          className="create-account-input"
          type="text"
          placeholder="Zip Code"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="input-group">
      <label htmlFor="about">Tell us about yourself</label>
      <textarea
        name="about"
        value={formData.about}
        onChange={handleInputChange}
      ></textarea>
    </div>

    <div className="input-group">
      <label>
        Remote
        <input
          type="checkbox"
          name="isRemote"
          checked={formData.isRemote}
          onChange={handleRemoteChange}
        />
      </label>
    </div>

    <div className="create-account-container">
      <button type="button" onClick={handleSubmit}>
        Create Account
      </button>
    </div>
  </form>
  <div className="solid"></div>
</section>

  );
}


export default CreateAccountForm;

