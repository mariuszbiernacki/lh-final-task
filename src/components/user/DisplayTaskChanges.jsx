import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import Moment from "react-moment";

const DisplayTaskChanges = ({ changes }) => {
  if (!changes) {
    return null;
  }
  return (
    <List>
      {changes.map((change) => {
        const { id, type, createdAt } = change;
        return (
          <ListItem key={id}>
            <ListItemText
              primary={type}
              secondary={
                <>
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
  );
};

const MemorizedDisplayTaskChanges = React.memo(DisplayTaskChanges);

export default MemorizedDisplayTaskChanges;
