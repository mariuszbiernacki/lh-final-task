import React from "react";
import { useParams } from "react-router";
import SprintDetails from "../../components/user/SprintDetails";

const SprintDetailsPage = () => {
  const { id } = useParams();
  return <SprintDetails id={id} />;
};

export default SprintDetailsPage;
