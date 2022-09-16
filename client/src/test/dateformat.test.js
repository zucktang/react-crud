const dateformat = require("./dateformat");

test("Converse Formate DateTime", () => {
  expect(dateformat("2022-09-08T12:55:30.000Z")).toBe("08/09/2022 19:55");
});