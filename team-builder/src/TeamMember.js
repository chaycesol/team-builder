import React from 'react';
import styled from 'styled-components';

const StyledTeamList = styled.div`
    background-color: #E8EDDF;
    display: flex;
    flex-direction: column;
    color: #333533;
    h3{
        color: #242423;
    }
    img{
        width: 25%;
        height: auto;
    }
`

export default function TeamMember(props) {
  const { details } = props

  if (!details) {
    return <h3>Working fetching your team member&apos;s details...</h3>
  }

  return (
    <div className= 'teamMemberInfo container'>
    <StyledTeamList className='teamMember container'>
      <h3>Name: {details.fname} {details.lname}</h3>
        <img src={`${details.imgsrc}`} alt="team member pic"></img>
        <p>Email: {details.email}</p>
        <p>Phone: {details.phone}</p>
        <p>Preferred Method of Contact: {details.preferred}</p>
    </StyledTeamList>
    </div>

  )
}