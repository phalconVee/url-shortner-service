import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

const urls = [
  {
    longUrl: "https://www.google.com/",
    shortUrl: "http://localhost:3001/b0vLVxdq9",
    urlCode: "b0vLVxdq9",
    clickCount: 10,
    created_at: "2021-09-19T21:22:19.677Z",
    updated_at: "2021-09-19T21:22:19.678Z",
  },
];

const newURL = {
  longUrl:
    "https://www.bloomberg.com/news/articles/2021-09-17/nigeria-probes-platform-tracking-naira-street-rate-after-crash",
};

const apiEndpoint = "http://localhost:3001";

const server = setupServer(
  rest.post(apiEndpoint + "/encode", (req, res, ctx) => res(ctx.json(newURL))),
  rest.get(apiEndpoint + "/" + urls[0].urlCode, (req, res, ctx) =>
    res(ctx.json(200))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("App component", () => {
  test("renders app component", async () => {
    render(<App />);

    const title = await screen.findByTestId("title");

    expect(title).toBeInTheDocument();
  });

  describe("When a URL is shortened", () => {
    test("the input field gets cleared", async () => {
      await renderApp();

      shortenURL();
      await screen.findByTestId("longURL");

      const inputField = screen.getByLabelText("Shorten URL");
      expect(inputField).toHaveValue("");
    });

    test("it is added to the dom", async () => {
      await renderApp();

      shortenURL();

      await screen.findByTestId("longURL");
    });

    test("An error is displayed if the call to the server fails", async () => {
      server.use(
        rest.post(apiEndpoint + "/encode", (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      await renderApp();

      shortenURL();

      const error = await screen.findByRole("alert");
      expect(error).toHaveTextContent(/could not shorten the URL!/i);
    });
  });
});

// Helper functions
const renderApp = async () => {
  render(<App />);
  await screen.findByTestId("title");
};

const shortenURL = () => {
  const inputField = screen.getByLabelText("Shorten URL");

  fireEvent.change(inputField, {
    target: { value: newURL.longUrl },
  });

  act(() => {
    fireEvent.submit(inputField);
  });
};
