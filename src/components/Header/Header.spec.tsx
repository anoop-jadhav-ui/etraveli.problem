import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MoviesContext, MoviesContextType } from "../../context/MoviesContext";
import Header from "./Header";

vi.mock("../SortByButton/SortByButton");
const mockSetSearchKeyword = vi.fn();

describe("<Header/>", () => {
  const ComponentUnderTest = () => {
    const contextValue: Partial<MoviesContextType> = {
      setSearchKeyword: mockSetSearchKeyword,
    };

    return (
      <MoviesContext.Provider value={contextValue as MoviesContextType}>
        <Header />
      </MoviesContext.Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should render the search input and filter button", () => {
    render(<ComponentUnderTest />);

    expect(
      screen.getByRole("textbox", { name: "Type to search..." })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Type to search...")
    ).toBeInTheDocument();

    expect(screen.getByTestId("MockSortByButton")).toBeInTheDocument();
  });

  it("should call setSearchKeyword when the search input changes", () => {
    render(<ComponentUnderTest />);

    fireEvent.change(
      screen.getByRole("textbox", { name: "Type to search..." }),
      { target: { value: "star wars" } }
    );

    expect(mockSetSearchKeyword).toHaveBeenCalledWith("star wars");
  });
});
