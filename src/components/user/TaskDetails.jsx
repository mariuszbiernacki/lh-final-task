import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { requestTask } from "../../actions/actions.js";
import DisplayTaskChanges from "./DisplayTaskChanges.jsx";

const TaskDetails = ({ id }) => {
  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestTask(id));
  }, [id]);
  console.log("selectedTask", selectedTask);
  if (!selectedTask) {
    return null;
  }
  const { title, userId, status, createdAt, comments, task_changes } =
    selectedTask;

  return (
    <>
      <div>
        <p>task id: {id}</p>
        <p>title: {title}</p>
        <p>user id: {userId}</p>
        <p>status: {status}</p>
        <p>
          created at:{" "}
          <Moment unix format="LL, LT">
            {createdAt}
          </Moment>
        </p>
      </div>
      <h2>Comments</h2>
      <List>
        {comments &&
          comments.map((comment) => {
            const { id, taskId, content, createdAt } = comment;
            return (
              <ListItem key={id}>
                <ListItemText
                  primary={content}
                  secondary={
                    <>
                      <span>commented task: {taskId}</span>
                      <br />
                      <span>
                        created:{" "}
                        <Moment unix format="LL, LT">
                          {createdAt}
                        </Moment>
                      </span>
                    </>
                  }
                />
              </ListItem>
            );
          })}
      </List>
      <h2>Task Changes</h2>
      <DisplayTaskChanges changes={task_changes} />
    </>
  );
};

export default TaskDetails;
