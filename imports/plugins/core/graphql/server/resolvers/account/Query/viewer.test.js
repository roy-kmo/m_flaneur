import viewer from "./viewer";

jest.mock("graphql-fields", () => jest.fn().mockName("graphqlFields"));

const mockAccount = {
  _id: "123",
  name: "Reaction"
};

test("calls queries.userAccount and returns the viewing user", async () => {
  require("graphql-fields").mockReturnValueOnce({ _id: "1", name: "1" });

  const userAccount = jest.fn().mockName("queries.userAccount").mockReturnValueOnce(Promise.resolve(mockAccount));

  const user = await viewer(null, null, {
    queries: { userAccount },
    userId: "123"
  });

  expect(user).toEqual(mockAccount);

  expect(userAccount).toHaveBeenCalled();
});

test("returns without calling queries.userAccount if only _id requested", async () => {
  require("graphql-fields").mockReturnValueOnce({ _id: "1" });

  const userAccount = jest.fn().mockName("userAccount");

  const user = await viewer(null, null, {
    queries: { userAccount },
    userId: "123"
  });

  expect(user).toEqual({ _id: "123" });

  expect(userAccount).not.toHaveBeenCalled();
});
