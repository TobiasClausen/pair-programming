export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

function calculateAge(birthDate:Date, today:Date) { 
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDay() - today.getDay();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--; 
  }

  return age;
}


export function calculatePayslip(salary: Salary): Payslip {
  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: 0.0,
  };

  const age = calculateAge(salary.born, salary.payday)

  if (age >= 18) {
    result.deductions.set("AHV", DEDUCTION_RATES.get("AHV"))
    result.deductions.set("IV", DEDUCTION_RATES.get("IV"))
    result.deductions.set("EO", DEDUCTION_RATES.get("EO"))
  }

  if (salary.gross*12 >= 2500) {
    result.deductions.set("ALV", DEDUCTION_RATES.get("ALV"))
    result.deductions.set("NBU", DEDUCTION_RATES.get("NBU"))
  }

  if (salary.gross*12 >= 22680) {
    result.deductions.set("PK", DEDUCTION_RATES.get("PK"))
  }
  
  let totalDeductionRate = 0;

  for (const deduction of result.deductions ) {
    totalDeductionRate += deduction[1];
  }

  result.totalDeductions = (totalDeductionRate / 100) * result.salary.gross;
  result.net = result.salary.gross - result.totalDeductions;

  return result;
}
