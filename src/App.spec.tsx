import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { MoviesProvider } from "./providers/MovieProvider";

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockResults = {
  results: [
    {
      episode_id: 1,
      title: "Episode IV - A New Hope",
      release_date: "1977-05-25",
    },
    {
      episode_id: 3,
      title: "Episode VI - Return of the Jedi",
      release_date: "1980-05-17",
    },
    {
      episode_id: 2,
      title: "Episode V - The Empire Strikes Back",
      release_date: "1983-05-25",
    },
    {
      episode_id: 4,
      title: "Episode I - The Phantom Menace",
      release_date: "1999-05-19",
    },
  ],
};

describe("<App/>", () => {
  const ComponentUnderTest = () => {
    return (
      <MoviesProvider>
        <App />
      </MoviesProvider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should render the loading state when api is loading", async () => {
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResults),
    });

    render(<ComponentUnderTest />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the empty state when no movies present", async () => {
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ results: [] }),
    });

    render(<ComponentUnderTest />);
    await waitFor(() => {
      expect(screen.getByText("No movies found")).toBeInTheDocument();
    });
  });

  it("should render the movies list when api return movies list", async () => {
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResults),
    });

    render(<ComponentUnderTest />);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
    });

    expect(screen.getByText("Episode IV - A New Hope")).toBeInTheDocument();
    expect(
      screen.getByText("Episode V - The Empire Strikes Back")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Episode I - The Phantom Menace")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Episode VI - Return of the Jedi")
    ).toBeInTheDocument();
  });

  it("should render the movie preview when clicked on a movie list item, other render the default text", async () => {
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResults),
    });

    render(<ComponentUnderTest />);

    expect(
      within(screen.getByTestId("preview")).getByRole("heading", {
        name: "Click on a movie to see the preview",
      })
    ).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(screen.getByText("Episode IV - A New Hope"));
    });

    expect(
      within(screen.getByTestId("preview")).getByRole("heading", {
        name: "Episode IV - A New Hope",
      })
    ).toBeInTheDocument();
  });

  describe("Sort By", () => {
    it("should sort by episode by default", async () => {
      mockFetch.mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockResults),
      });

      const { container } = render(<ComponentUnderTest />);

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      expect(screen.getAllByRole("listitem")).toHaveLength(4);
      expect(container).toMatchSnapshot();
    });

    it("should sort by release date when clicked on the release date option", async () => {
      mockFetch.mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockResults),
      });

      const { container } = render(<ComponentUnderTest />);

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole("button", { name: "Sort By" }));
      fireEvent.click(screen.getByRole("radio", { name: "Release date" }));

      expect(screen.getAllByRole("listitem")).toHaveLength(4);

      await waitFor(() => {
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("Search", () => {
    it("should search movie by name", async () => {
      mockFetch.mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockResults),
      });

      const { container } = render(<ComponentUnderTest />);

      await waitFor(() => {
        fireEvent.change(
          screen.getByRole("textbox", { name: "Type to search..." }),
          { target: { value: "The Empire St" } }
        );
      });

      expect(screen.getAllByRole("listitem")).toHaveLength(1);

      expect(container).toMatchSnapshot();
    });
  });
});
