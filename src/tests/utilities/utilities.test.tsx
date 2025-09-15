import { capitalizeStringFirstCharacter, convertStringToPascalWithSpaces, formatDisplayDate } from "../../utilities/utitlities";
import { describe, expect, it } from "vitest";

describe("formatDisplayDate", () => {
    it("should format a valid ISO date correctly", () => {
        const input = "2023-08-28T14:30:00Z";
        const result = formatDisplayDate(input);

        expect(result).toBe("28 August 2023, 15:30:00");
    });

    it("should return the original string if the date is invalid", () => {
        const input = "not-a-date";
        const result = formatDisplayDate(input);
        expect(result).toBe(input);
    });
});

describe("Testing capitalizeFirstCharacter", () => {
    it("Should return words with first character being upper case", () => {
        expect(capitalizeStringFirstCharacter("testing")).toBe("Testing");
        expect(capitalizeStringFirstCharacter("testingValue")).toBe("TestingValue");
        expect(capitalizeStringFirstCharacter("testing value")).toBe("Testing value");
    });
});

describe("convertStringToPascalWithSpaces tests", () => {
    test("converts camelCase to Title Case", () => {
        expect(convertStringToPascalWithSpaces("camelCase")).toBe("Camel Case");
    });

    test("converts PascalCase to Title Case", () => {
        expect(convertStringToPascalWithSpaces("PascalCase")).toBe("Pascal Case");
    });

    test("handles single word with no uppercase letters", () => {
        expect(convertStringToPascalWithSpaces("word")).toBe("Word");
    });

    test("handles single uppercase letter", () => {
        expect(convertStringToPascalWithSpaces("A")).toBe("A");
    });

    test("handles empty string", () => {
        expect(convertStringToPascalWithSpaces("")).toBe("");
        expect(convertStringToPascalWithSpaces(" ")).toBe("");
    });

    test("handles string with multiple uppercase letters", () => {
        expect(convertStringToPascalWithSpaces("thisIsATest")).toBe("This Is A Test");
    });

    test("handles string with numbers and special characters", () => {
        expect(convertStringToPascalWithSpaces("thisIsATest123WithSpecial#Characters")).toBe("This Is A Test123 With Special# Characters");
    });

    test("handles string with leading uppercase letter", () => {
        expect(convertStringToPascalWithSpaces("LeadingUppercase")).toBe("Leading Uppercase");
    });

    test("handles string with spaces either side", () => {
        expect(convertStringToPascalWithSpaces(" withSpaces ")).toBe("With Spaces");
    });

    test("doesn't add spaces between n-1 uppercase characters in a sequence (ie acronyms) if enableAcronyms is true and capitals in a row is >= 2", () => {
        expect(convertStringToPascalWithSpaces("doesn'tAddSpacesBetweenAB", true)).toBe("Doesn't Add Spaces Between AB");
        expect(convertStringToPascalWithSpaces("acronymABABInTheMiddle", true)).toBe("Acronym ABAB In The Middle");
    });
});
