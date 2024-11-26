import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MoviesContext, MoviesContextType } from "../../context/MoviesContext";
import SortByButton from "./SortByButton";

const mockSetSortBy = vi.fn();

describe("<SortByButton/>", () => {
  const ComponentUnderTest = () => {
    const contextValue: Partial<MoviesContextType> = {
      sortBy: "episode_id",
      setSortBy: mockSetSortBy,
    };

    return (
      <MoviesContext.Provider value={contextValue as MoviesContextType}>
        <SortByButton />
      </MoviesContext.Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should render the default state", async () => {
    render(<ComponentUnderTest />);
    expect(screen.getByRole("button", { name: "Sort By" })).toBeInTheDocument();
  });

  it("should render sort options when clicked on sort button", async () => {
    render(<ComponentUnderTest />);
    fireEvent.click(screen.getByRole("button", { name: "Sort By" }));

    expect(screen.getByRole("radio", { name: "Episode" })).toBeChecked();
    expect(
      screen.getByRole("radio", { name: "Release date" })
    ).not.toBeChecked();
  });

  it("should call the setSortBy method and hide the options when clicked on any sort option", async () => {
    render(<ComponentUnderTest />);
    fireEvent.click(screen.getByRole("button", { name: "Sort By" }));
    fireEvent.click(screen.getByRole("radio", { name: "Release date" }));

    expect(mockSetSortBy).toHaveBeenCalledWith("release_date");
    expect(
      screen.queryByRole("radio", { name: "Episode" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("radio", { name: "Release date" })
    ).not.toBeInTheDocument();
  });
});
