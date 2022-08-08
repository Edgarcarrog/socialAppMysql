import React, { useEffect } from "react";
import clienteAxios from "../config/axios";
import { useParams } from "react-router";

const VerifiedMailPage = () => {
  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await clienteAxios.get(`/users/confirm/${token}`);
      console.log(response);
    };
    verifyEmail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Tu correo se ha confirmado satisfactoriamente
      <p>{token}</p>
    </div>
  );
};

export default VerifiedMailPage;
