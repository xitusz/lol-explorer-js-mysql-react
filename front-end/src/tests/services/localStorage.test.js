/* eslint-disable no-undef */
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
  removeItemFromLocalStorage,
} from "../../services/localStorage";

describe("localStorage service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("setItemToLocalStorage", () => {
    it("should stores correctly", () => {
      const key = "key";
      const element = { email: "email@example.com", password: "example" };

      setItemToLocalStorage(key, element);

      expect(localStorage.getItem(key)).toEqual(JSON.stringify(element));
    });

    it("should throw an error if key is not a string", () => {
      const key = 1;
      const element = { email: "email@example.com", password: "example" };

      expect(() => setItemToLocalStorage(key, element)).toThrowError(
        "key must be a string"
      );
    });

    it("should throw an error if key is not provided", () => {
      const element = { email: "email@example.com", password: "example" };

      expect(() => setItemToLocalStorage(undefined, element)).toThrowError(
        "key must be provided"
      );
    });

    it("should throw an error if element is not serializable", () => {
      const key = "key";
      const element = { email: 1, password: 2 };
      element.circularRef = element;

      expect(() => setItemToLocalStorage(key, element)).toThrowError(
        "element must be serializable"
      );
    });

    it("should overwrite an existing item with the same key", () => {
      const key = "key";
      const element1 = { email: "email@example.com", password: "example" };
      const element2 = {
        email: "email2@example.com",
        password: "example2",
      };

      setItemToLocalStorage(key, element1);
      setItemToLocalStorage(key, element2);

      expect(localStorage.getItem(key)).toEqual(JSON.stringify(element2));
    });
  });

  describe("getItemToLocalStorage", () => {
    it("should get an item correctly", () => {
      const key = "key";
      const element = { email: "email@example.com", password: "example" };

      localStorage.setItem(key, JSON.stringify(element));

      const retrieved = getItemFromLocalStorage(key);

      expect(retrieved).toEqual(element);
    });

    it("should return null if the key does not exist", () => {
      const key = "notExist";

      const retrieved = getItemFromLocalStorage(key);

      expect(retrieved).toBeNull();
    });
  });
  describe("removeItemFromLocalStorage", () => {
    beforeEach(() => {
      setItemToLocalStorage("user", "name");
    });

    it("should remove item correctly", () => {
      removeItemFromLocalStorage("user");

      expect(localStorage.getItem("user")).toBeNull();
    });

    it("should throw an error if key is not provided", () => {
      expect(() => removeItemFromLocalStorage(undefined)).toThrowError(
        "key must be provided"
      );
    });

    it("should throw an error if key is not a string", () => {
      expect(() => removeItemFromLocalStorage(1)).toThrowError(
        "key must be a string"
      );
    });
  });
});
