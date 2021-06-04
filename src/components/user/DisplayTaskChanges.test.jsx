import { render, screen } from "@testing-library/react";
import DisplayTaskChanges from "./DisplayTaskChanges";

describe("DisplayTaskChanges", () => {
  const setup = () => {
    const mockChanges = [
      {
        taskId: 1,
        type: "comment_added",
        createdAt: 1622461009,
        id: 5,
      },
      {
        taskId: 2,
        type: "user_changed",
        createdAt: 1622731918,
        id: 20,
      },
      {
        taskId: 2,
        type: "sprint_changed",
        createdAt: 1622731923,
        id: 21,
      },
    ];
    render(<DisplayTaskChanges changes={mockChanges} />);

    return {
      mockChanges,
    };
  };

  test("should return null if no changes", () => {
    render(<DisplayTaskChanges changes={[]} />);
    const noChanges = screen.getByTestId("no_changes");
    expect(noChanges).toHaveTextContent("no changes");
  });

  test("should render component if changes", () => {
    setup({});
    const changesList = screen.getByTestId("changes_list");
    expect(changesList).toBeInTheDocument();
  });

  test("should changes type be correct", () => {
    const { mockChanges } = setup({});
    const changesList = screen.getByTestId("changes_list");
    const changesType = changesList.children[0].getElementsByTagName("h3")[0];

    expect(changesType.innerHTML).toBe(mockChanges[0].type);
  });

  test("should changes paragraph be correct", () => {
    setup({});
    const changesList = screen.getByTestId("changes_list");
    const changesSpan = changesList.children[0].getElementsByTagName("span")[0];
    expect(changesSpan).toHaveTextContent("created:");
  });
});
