import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestTask } from "../actions/actions";

export const useTask = (taskId) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  useEffect(() => {
    dispatch(requestTask(taskId));
  }, [taskId]);

  return selectedTask;
};
