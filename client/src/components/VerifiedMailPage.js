import React, { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { useParams } from "react-router";

const VerifiedMailPage = () => {
  const { token } = useParams();
  console.log(token);
  const [response, setResponse] = useState(null);

  const verifyEmail = () => {
    clienteAxios
      .get(`/users/confirm/${token}`)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    verifyEmail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Confirmación de correo
      <p>{token}</p>
      {response && <p>{response.data.message}</p>}
    </div>
  );
};

export default VerifiedMailPage;
