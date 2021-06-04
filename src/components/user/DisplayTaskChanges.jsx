import React, { useEffect } from "react";
import Moment from "react-moment";

const DisplayTaskChanges = ({ changes }) => {
  useEffect(() => {
    console.log("changes", changes);
  }, []);

  return (
    <div>
      {changes.length === 0 ? (
        <h2 data-testid="no_changes">no changes</h2>
      ) : (
        <ul data-testid="changes_list">
          {changes.map((change) => {
            const { id, type, createdAt } = change;

            return (
              <li key={id}>
                <h3>{type}</h3>
                <span>created:</span>
                <br />
                <Moment unix format="LL, LT">
                  {createdAt}
                </Moment>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const MemorizedDisplayTaskChanges = React.memo(DisplayTaskChanges);

export default MemorizedDisplayTaskChanges;
