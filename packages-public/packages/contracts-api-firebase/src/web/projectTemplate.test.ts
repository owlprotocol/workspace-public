import { describe, test, expect } from "vitest";
import { setDoc, doc } from "firebase/firestore";
import { projectTemplatesCol } from "./config.js";
import { getProjectTemplates } from "./projectTemplate.js";
import { testProjectTemplate, testProjectTemplateId } from "../test/data.js";

describe("Project Template Tests", () => {
    test("project templates", async () => {
        await setDoc(doc(projectTemplatesCol, testProjectTemplateId), testProjectTemplate);
        const result = await getProjectTemplates();
        expect(result.length).toStrictEqual(1);
    });
});
