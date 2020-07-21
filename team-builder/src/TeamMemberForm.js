import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
    font-family: 'Mulish', sans-serif;
    input{
        background-color: #E8EDDF;
        border: 2px dotted #242423;
    }
    select{
        background-color: #E8EDDF;
        border: 2px dotted #242423;
    }
`

export default function TeamMemberForm(props) {
  // Values needed from App JS to make it work 
  const { values, update, submit } = props

  //pulling in values and updating via callback through props
  const onChange = evt => { // { target: {name, value } }
    const { name, value } = evt.target
    update(name, value) 
  }

  // adding submit handler via callback preventing browser reload
  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  return (
    <StyledForm className='form container' onSubmit={onSubmit}>
      <div className='form-group title'>
        <h2>Add a New Team Member</h2>
      </div>

      <div className='form-group inputs'>
        <h4>Team Member Profile Information</h4>
        <label htmlFor='fnameInput'> First Name:&nbsp; 
        <input id='fnameInput'
        name='fname'
        type = 'text'
        placeholder="enter first name"
        value={values.fname}
        onChange = {onChange}
        maxLength ='20'
        />
        <br />
        </label>
        <label htmlFor='lnameInput'> Last Name:&nbsp; 
        <input id="lnameInput"
        name='lname'
        type = 'text'
        placeholder="enter last name"
        value={values.lname}
        onChange = {onChange}
        maxLength ='30'
        />
        </label>
        <br />
        <label htmlFor='roleInput'>Role:&nbsp;
          <select 
          id="roleInput" 
          name="role"
          value={values.role}
          onChange = {onChange}>
            <option value="Select One">Select One</option>
            <option value="Client Success">Client Success Team</option>
            <option value="Sales">Sales Team</option>
            <option value="Marketing">Marketing Team</option>
            <option value="Product">Product Manager</option>
            <option value="UX">UX Designer</option>
            <option value="Engineering-FrontEnd">Front-End Engineer</option>
            <option value="Engineering-BackEnd">Back-End Engineer</option>
            <option value="Engineering-DevOps">DevOps Engineer</option>
            <option value="Quality-Assurance">QA Analyst/Tester</option>
        </select>
        </label>
        <br />
        <label htmlFor='emailInput'> Email:&nbsp; 
        <input id="emailInput"
        name='email'
        type = 'email'
        placeholder="enter Email address"
        value={values.email}
        onChange = {onChange}
        maxLength ='60'
        />
        </label>
        <br />
        <label htmlFor='phoneInput'> Phone:&nbsp; 
        <input id="phoneInput"
        name='phone'
        type = 'text'
        placeholder="enter Phone Number"
        value={values.phone}
        onChange = {onChange}
        maxLength ='11'
        />
        </label>
        <br />
        <label htmlFor='preferredInput'>Preferred Method of Contact:&nbsp;
          <select 
          id="preferredInput" 
          name="preferred"
          value={values.preferred}
          onChange = {onChange}>
            <option disabled value="Select One">Select One</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Slack">Slack</option>
            <option value="Email">Email</option>
        </select>
        </label>
      </div>
      <div className='form-group submit'>
      <button disabled={!values.fname || !values.lname || !values.email || !values.phone || !values.preferred}>Add to Team Member List</button>
      </div>
    </StyledForm>
  )
}
