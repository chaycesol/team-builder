import React, {useState, useEffect } from 'react';
import {v4 as uuid } from 'uuid'
import TeamMember from './TeamMember'
import TeamMemberForm from './TeamMemberForm'
import styled from 'styled-components'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: 'Mulish', sans-serif;
  background-color: #E8EDDF;
  .form-container{
    background-color: #CFDBD5;
    width: 75%;
  }
  .data-container{
    width: 75%;
  }

`

const newImgsrc = "https://thispersondoesnotexist.com/image#" + new Date().getTime();
// Initialize the list of Team members
const initialTeamMemberList = [
  
{
  id: uuid(), // uuid is the library I am using to generate random, unique ID's
  imgsrc: newImgsrc,
  fname: 'Hudson',
  lname: 'Human Resources',
  role: 'HR Director',
  email: 'hudson@iamtheshit.io',
  phone: '310-310-3102',
  preferred: 'text',

}
]

//the shape of the state that drives the form
const initialFormValues = {
  imgsrc: `${newImgsrc}`,
  //Text inputs!
  fname: '',
  lname: '',
  role: '',
  email: '',
  phone: '',
  //DROPDOWN
  preferred: '',
}

//helpers to simulate async data
const fakeAxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data: initialTeamMemberList })
}
const fakeAxiosPost = (url, { imgsrc, fname, lname, role, email, phone, preferred }) => {
  const newTeamMember = { id: uuid(), imgsrc, fname, role, lname, email, phone, preferred}
  return Promise.resolve({ status: 200, success: true, data: newTeamMember })
}


function App() {
  const [teamMember, setTeamMember] = useState([]) //initialize setting up state to form team members list
  const [formValues, setFormValues] = useState(initialFormValues) // use state to hold all form values on input

  const updateForm = (inputName, inputValue) => {
    const updatedFormValues = {...formValues, [inputName]: inputValue}; //spread operator to make a copy of the form values to manipulate
    setFormValues(updatedFormValues) //updating form values to current values and holding it
  }

  const submitForm = () => {
  const newTeamMember = {
      imgsrc: formValues.imgsrc,  
      fname: formValues.fname.trim(), // takes in value, and trims any whitespace to avoide data corruption and memory leaks
      lname: formValues.lname.trim(),
      role: formValues.role, 
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      preferred: formValues.preferred,
    }
    //error handling on blank form state - prevent user from submitting form
    if (!newTeamMember.fname || !newTeamMember.lname || !newTeamMember.role || !newTeamMember.email || !newTeamMember.phone || !newTeamMember.preferred)  {
      return 
    }
    // Post new team member info to backend to update list of team members
    fakeAxiosPost('teammembertest.com', newTeamMember)
    .then(res => {
      const teamMemberSubmitted = res.data //use new team member submitted so we can give them a uuid
      setTeamMember([teamMemberSubmitted, ...teamMember])
      setFormValues(initialFormValues) // clear old data on form once submission is successful
    })
  }

  useEffect(() => {
    fakeAxiosGet('teammembertest.com')
    .then(res => setTeamMember(res.data))
  }, [])

  return (
    <StyledApp className="container">
      <header><h1>Emergency Team List</h1></header>
      <p>In order for us to better notify each other in case of emergency during the pandemic, please enter your details so you can be contacted. </p>
    <div className="form-container">
    <TeamMemberForm 
    values={formValues}
    update={updateForm}
    submit={submitForm}
    />
    </div>
    <div className="data-container">
    <h2>Team Members' Information</h2>
    {
      teamMember.map(teamMember => {
        return (
          <TeamMember key={teamMember.id} details={teamMember} />
        )
      })
    }
    </div>
    
    </StyledApp>
  );
}

export default App;
