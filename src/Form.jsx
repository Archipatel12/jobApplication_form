import React, { useState } from 'react';
import '../src/form.css'

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const newSkills = checked
        ? [...formData.additionalSkills, value]
        : formData.additionalSkills.filter((skill) => skill !== value);
      setFormData({ ...formData, additionalSkills: newSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.phoneNumber || isNaN(formData.phoneNumber)) newErrors.phoneNumber = 'Valid Phone Number is required';
    if (['Developer', 'Designer'].includes(formData.position) && (!formData.relevantExperience || isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience is required and must be a number greater than 0';
    }
    if (formData.position === 'Designer' && (!formData.portfolioURL || !/^https?:\/\/.+\..+$/.test(formData.portfolioURL))) {
      newErrors.portfolioURL = 'Valid Portfolio URL is required';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) newErrors.additionalSkills = 'At least one skill must be selected';
    if (!formData.interviewTime) newErrors.interviewTime = 'Preferred Interview Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="App">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {['Developer', 'Designer'].includes(formData.position) && (
          <div>
            <label>Relevant Experience (years):</label>
            <input type="text" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
            {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div>
            <label>Portfolio URL:</label>
            <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
            {errors.portfolioURL && <span className="error">{errors.portfolioURL}</span>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div>
            <label>Management Experience:</label>
            <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
            {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
          </div>
        )}
        <div>
          <label>Additional Skills:</label>
          <div>
            <label>
              <input type="checkbox" name="additionalSkills" value="JavaScript" checked={formData.additionalSkills.includes('JavaScript')} onChange={handleChange} />
              JavaScript
            </label>
            <label>
              <input type="checkbox" name="additionalSkills" value="CSS" checked={formData.additionalSkills.includes('CSS')} onChange={handleChange} />
              CSS
            </label>
            <label>
              <input type="checkbox" name="additionalSkills" value="Python" checked={formData.additionalSkills.includes('Python')} onChange={handleChange} />
              Python
            </label>
          </div>
          {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}
        </div>
        <div>
          <label>Preferred Interview Time:</label>
          <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
          {errors.interviewTime && <span className="error">{errors.interviewTime}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
