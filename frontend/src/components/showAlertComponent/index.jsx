import { Alert } from "@mui/material";
import React from "react";
import './style.css';

export const ShowAlert = ({ status, msg }) => {
   return (
      <div className="alert-box">
         {status === 'success' ? (

            <Alert variant="filled" severity="success">
               {msg}
            </Alert>
         ) : null}

         {status === 'error' ? (
            <Alert variant="filled" severity="error">
               {msg}
            </Alert>
         ) : null}
      </div>
   )
}