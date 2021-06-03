import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestSprint, requestTask } from "../actions/actions";

export const useTask = (taskId) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  useEffect(() => {
    dispatch(requestTask(taskId));
  }, [taskId]);

  return selectedTask;
};

export const useSprint = (sprintId) => {
  const dispatch = useDispatch();
  const selectedSprint = useSelector((state) => state.sprints.selectedSprint);

  useEffect(() => {
    dispatch(requestSprint(sprintId));
  }, [sprintId]);

  return selectedSprint;
};
