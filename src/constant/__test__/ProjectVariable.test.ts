import ProjectVariable from "../ProjectVariable";

describe('Project Featured', () => {
    test("getTableColsByFields", () => {
        const fields = ["State", "Type"];
        const cols = ProjectVariable.getTableColsByFields(fields);
        expect(cols.length).toBe(fields.length + 2);
        expect(cols[1]['key']).toBe("type");
        expect(cols[2]['key']).toBe("houses");
    });
})

export { }