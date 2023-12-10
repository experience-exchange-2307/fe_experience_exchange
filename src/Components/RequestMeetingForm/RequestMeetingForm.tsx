import { postMeetingRequest } from "apiCalls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './RequestMeetingForm.css'

interface FormData {
  user_id: string;
  partner_id: string;
  date: Date | null;
  start_time: string;
  end_time: string;
  purpose: string;
  is_remote: boolean;
}

interface RequestMeetingFormProps {
  currentUserId: number;
  setServerError: (error: string) => void;
}

function RequestMeetingForm({ currentUserId, setServerError }: RequestMeetingFormProps) {
  const { id } = useParams();
  const [formData, setFormData] = useState<FormData>({
    user_id: currentUserId.toString(),
    partner_id: id || "",
    date: null ,
    start_time: "",
    end_time: "",
    purpose: "",
    is_remote: true,
  });

  const handleDateChange = (date: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date,
    }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prevFormData:any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRemoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData:any) => ({
      ...prevFormData,
      is_remote: e.target.checked,
    }));
  };

  const isFormComplete = () => {
    return !Object.values(formData).some((inputData) => inputData === "");
  };

  const handleSubmit = () => {
    if (isFormComplete()) {
      postMeetingRequest(formData)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            window.alert("Meeting requested successfully!");
  
            setFormData({
              user_id: currentUserId.toString(),
              partner_id: id || "",
              date: null,
              start_time: "",
              end_time: "",
              purpose: "",
              is_remote: true,
            });
          } else {
            throw new Error(
              `${response.status} Something went wrong, unable to request meeting.`
            );
          }
        })
        .catch((error) => {
          console.error("Error submitting meeting request:", error);
          setServerError(error)
        });
    }
  };
  
  
  return (
    <>
      <section className="request-meeting-container">
<h2 className='meetings-title'>Request A Meeting</h2>
        <form className="form">
        <div className="input-group">
            <label>Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
            />
          </div>

          <div className="input-group">
            <label>Start Time</label>
            <input
              type="text"
              placeholder="Start Time"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>End Time</label>
            <input
              type="text"
              placeholder="End Time"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Purpose</label>
            <input
              type="text"
              placeholder="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>
              Remote?
              <input
                type="checkbox"
                name="is_remote"
                checked={formData.is_remote}
                onChange={handleRemoteChange}
              />
            </label>
          </div>

          <button
            className="request-meeting-btn"
            type="button"
            disabled={!isFormComplete()}
            onClick={handleSubmit}
          >
            Request Meeting
          </button>
        </form>
      </section>
    </>
  );
}

export default RequestMeetingForm;
