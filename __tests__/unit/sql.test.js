const { parseWhere } = require('../../src/app/utils/sql');
const util = require('util');

describe("SQL Utils", () => {
    it("Should return string without where", async () => {
        let q = "SELECT * FROM public.encurtador %s ORDER BY url";
        let where = [];

        expect(util.format(q, parseWhere(where))).toEqual(
            "SELECT * FROM public.encurtador  ORDER BY url"
        );
    });

    it("Should return string with where and without and", async () => {
        let q = "SELECT * FROM public.encurtador %s ORDER BY url";
        let where = ["and foo=$1"];

        expect(util.format(q, parseWhere(where))).toEqual(
            "SELECT * FROM public.encurtador WHERE foo=$1 ORDER BY url"
        );
    });

    it("Should return string with where and", async () => {
        let q = "SELECT * FROM public.encurtador %s ORDER BY url";
        let where = ["AND foo=$1", " AND bar=$2"];

        expect(util.format(q, parseWhere(where))).toEqual(
            "SELECT * FROM public.encurtador WHERE foo=$1  AND bar=$2 ORDER BY url"
        );
    });

    it("Should return exception with invalid clauses", async () => {
        let q = "SELECT * FROM public.encurtador %s ORDER BY url";
        let where = [""];
        try {
            util.format(q, parseWhere(where));
        } catch(error) {
            expect(error.message).toBe("Clauses must be an array of string");
        }
    });

    it("Should return exception with null clauses", async () => {
        let q = "SELECT * FROM public.encurtador %s ORDER BY url";
        let where = null;
        try {
            util.format(q, parseWhere(where));
        } catch(error) {
            expect(error.message).toBe("Clauses must be an array of string");
        }
    });

    it("Should return exception with no clauses", async () => {
        let q = "SELECT * FROM public.encurtador %s ORDER BY url";
        try {
            util.format(q, parseWhere());
        } catch(error) {
            expect(error.message).toBe("Clauses must be an array of string");
        }
    });
});