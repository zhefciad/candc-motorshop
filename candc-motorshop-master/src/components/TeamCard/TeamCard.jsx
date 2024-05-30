import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./TeamCard.scss"

const TeamCard = ({ceo}) => {
    return (
    <div className="teamCard">
          <div className="teamImg">
              <img src={ceo} alt="" />
          </div>
          <div className="nameSocialsWrapper">
              <h2>Rimer Anciado</h2>
              <div className="socials">
                  <FacebookIcon sx = {{cursor: "pointer"}}/>
                  <TwitterIcon sx = {{cursor: "pointer"}}/>
                  <LinkedInIcon sx = {{cursor: "pointer"}}/>
              </div>
              
          </div>
          <h3>FOUNDER & CEO</h3>
      </div>
      );
  }

  export default TeamCard