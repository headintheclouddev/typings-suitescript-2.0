import {Workbook} from "N/workbook";

interface CreateWorkbookContext {
  readonly description: string;
  readonly name: string;
  readonly owner: number;
  readonly role: number;
  workbook: Workbook;
}
