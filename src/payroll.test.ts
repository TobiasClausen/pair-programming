import { calculatePayslip, Payslip, Salary } from "./payroll";
import test from "node:test";

describe("calculatePayslip", () => {
  it("ein 16 jähriger Lernender mit einem Monatsgehalt von 700.-", () => {
    const salary: Salary = {
      born: new Date("2009-01-01"),
      payday: new Date("2025-05-05"),
      gross: 700,
    };
    const expectedDeductions = new Map([
      ["ALV", 1.1],
      ["NBU", 0.73],
    ]);

    const expected: Payslip = {
      salary: salary,
      deductions: expectedDeductions,
      totalDeductions: 12.81,
      net: 687.19,
    };

    const actual = calculatePayslip(salary);

    expect(actual).toEqual(expected);
  });

  it("ein 18 jähriger Lernender mit einem Monatsgehalt von 1200.-", () => {
    const salary: Salary = {
      born: new Date("2007-01-01"),
      payday: new Date("2025-05-05"),
      gross: 1200,
    };
    const expectedDeductions = new Map([
      ["AHV", 8.7],
      ["IV", 1.4],
      ["EO", 0.5],
      ["ALV", 1.1],
      ["NBU", 0.73],
    ]);

    const expected: Payslip = {
      salary: salary,
      deductions: expectedDeductions,
      totalDeductions: 149.16,
      net: 1050.84,
    };

    const actual = calculatePayslip(salary);

    expect(actual).toEqual(expected);
  });

  it("ein 21 jähriger Arbeiter mit einem Monatsgehalt von 5900.-", () => {
    const salary: Salary = {
      born: new Date("2004-01-01"),
      payday: new Date("2025-05-05"),
      gross: 5900,
    };
    const expectedDeductions = new Map([
      ["AHV", 8.7],
      ["IV", 1.4],
      ["EO", 0.5],
      ["ALV", 1.1],
      ["NBU", 0.73],
      ["PK", 8.9],
    ]);

    const expected: Payslip = {
      salary: salary,
      deductions: expectedDeductions,
      totalDeductions: 1258.47,
      net: 4641.53,
    };

    const actual = calculatePayslip(salary);

    expect(actual).toEqual(expected);
  });
});
