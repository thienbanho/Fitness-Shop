import React, { useState } from 'react';
import './contract.css';

const PTRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    email: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    emergencyContact: '',
    emergencyPhone: '',
    signature: '',
    signatureDate: '',
    guardianName: '',
    guardianSignature: '',
    guardianDate: '',
    guardianAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="registration-container">
      <div className="form-header">
        <h1>Personal Training Program Waiver & Registration Form</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <p className="print-note">Please Print or Type</p>

        {/* Personal Information Section */}
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Mailing Address:</label>
            <div className="address-fields">
              <input
                type="text"
                name="address"
                placeholder="Street"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Rest of personal information fields... */}
          
          <div className="payment-note">
            <p>Please make checks payable to Mary Catherine Domaleski.</p>
          </div>
        </div>

        {/* Policies Section */}
        <div className="policies-section">
          <h2>Personal Training Program policies:</h2>
          <ul>
            <li>Each participant must sign a waiver and complete a health history questionnaire to be kept on file and will be confidential between the personal trainer and the client.</li>
            <li>Participants must make appointments with at least 48 hours in advance or by 5:00pm on Fridays for Monday sessions.</li>
            <li>Mary Catherine must be notified 24 hours in advance for cancellations; if notification is not at least 24 hours in advance or the session is missed the participant will be charged for the session.</li>
            <li>Participants 15 minutes late or more to a session will be charged for the session and lose the training for the entire session.</li>
            <li>Clients are to meet the personal trainer at the agreed upon training venue at the scheduled appointment time, unless an alternate meeting place as been agreed upon between client and the personal trainer.</li>
          </ul>
        </div>

        {/* Risk Section */}
        <div className="risk-section">
          <h2>Assumption of Risk for Participation in the Personal Training Program</h2>
          <p>
            Each participant in the Personal Training Program should realize that there are substantial risks, hazards, and danger inherent in such training. Each participant in the Personal Training Program must be covered by an accident and health insurance policy. It is the responsibility of each participant to participate only in those activities for which he/she has the prerequisite skills, qualifications, preparation, and training (as determined and instructed by the personal trainer). Mary Catherine does not warrant or guarantee in any respect the physical condition or any equipment used in connection with the activity.
          </p>
          <p>
            Therefore, in consideration of the benefits received from the personal training program, the undersigned assumes all risks of damages or injury, including death, that may be sustained by him/her while participating in a exercise activity or in travel to or from such activity.
          </p>
        </div>

        {/* Waiver Section */}
        <div className="waiver-section">
          <h2>Release, Covenant Not to Sue, and Waiver</h2>
          <p>
            Personal Training involves an inherent risk of physical injury and the undersigned assumes all such risks. The undersigned hereby agrees that for the sole consideration of Mary Catherine Domaleski allowing the undersigned to participate in the Personal Training Program for which or in connection with which Mary Catherine Domaleski has made available any equipment, facilities, grounds, or personnel for such training, the undersigned does hereby release, covenant not to sue, and forever discharge Mary Catherine Domaleski and her officers, agents, and employees of any and for all claims, demands, rights, and causes of action of whatever kind or nature including but not limited to negligence, unforeseen bodily and personal injuries, damage to property, and the consequences thereof resulting from participation in any way connected with such recreational programs and activities. The undersigned understands that this Release, Covenant Not to Sue, Waiver, and Assumption of Risk shall be effective from the date of signature until the effective termination of the personal training services by Mary Catherine Domaleski. By signing this document, the undersigned hereby acknowledges that he/she has read the above carefully before signing, and agrees to comply with all the above.
          </p>
        </div>

        {/* Signature Section */}
        <div className="signature-section">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="signature">Signature:</label>
              <input
                type="text"
                id="signature"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signatureDate">Date:</label>
              <input
                type="date"
                id="signatureDate"
                name="signatureDate"
                value={formData.signatureDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Guardian Section */}
        <div className="guardian-section">
          <h3>Signature of Parent/Guardian – one signature required if participant is 17 years old or younger:</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guardianName">Print Name:</label>
              <input
                type="text"
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="guardianSignature">Signature:</label>
              <input
                type="text"
                id="guardianSignature"
                name="guardianSignature"
                value={formData.guardianSignature}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="guardianDate">Date:</label>
              <input
                type="date"
                id="guardianDate"
                name="guardianDate"
                value={formData.guardianDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label htmlFor="guardianAddress">Address and Phone:</label>
            <input
              type="text"
              id="guardianAddress"
              name="guardianAddress"
              value={formData.guardianAddress}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Submit Registration</button>
      </form>
    </div>
  );
};

export default PTRegistrationForm;