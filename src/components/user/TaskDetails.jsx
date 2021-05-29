import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestTask } from "../../actions/actions.js";

const TaskDetails = ({ id }) => {
  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestTask(id));
  }, [id]);
  console.log("selectedTask", selectedTask);
  return <div>details</div>;
};

export default TaskDetails;
