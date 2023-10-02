import React from 'react'
import {RingLoader} from "react-spinners";

const Spinner = ({loading})=> {
        return (
            <div style={{
                position: "fixed",
                left: "50%",
                transform: "translate(-50%)"
              }}>
                <RingLoader	
                        loading={loading}
                        size={100}
                        sizeunit={"px"}
                        color="#3498db"
                      />
            </div>
        )
}

export default Spinner