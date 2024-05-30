import React from 'react'
import './Subscribe.scss'
import { Button } from '@mui/material'
const Subscribe = () => {
  return (
    <div className='Subscribe'>
        <h2>Subscribe and Earn 10% Off</h2>
        <p>Discover new arrivals and inspiration, plus get 10% off your first order on full-priced items.</p>
        
        <div className="inputWrapper">

        <input
          type="text"
          placeholder="Enter your email"
          className="search"
        />
              <Button
                variant="contained"
                className="catButton"
                disableElevation
                sx={{
                    margin: "5px",
                  padding: "0.75rem 1rem",
                  background: "linear-gradient(to right, #ff772d 0%, #ff772d 100%)",
                  "&:hover": {
                    background: "linear-gradient(to right, #f3712b 0%, #f3712b 100%)",
                  },
                  
                  fontFamily: "Poppins",
                  borderRadius: "5px",
                  boxShadow: "rgba(1, 1, 1, 0.1) 0px 0.5px 14px 0px",
                  textTransform: "none",
                  color: "#ffffff",
                  whiteSpace: "noWrap"
                }}
              >
            
              Subscribe

              </Button>
        </div>
    </div>
  )
}

export default Subscribe