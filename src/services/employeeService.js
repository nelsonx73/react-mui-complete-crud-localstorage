const KEYS = {
  employees: "employees",
};

export const getDepatmentColletion = () => [
  {
    id: "1",
    title: "Development",
  },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Finance" },
  { id: "4", title: "HR" },
];

export function insertEmployee(data) {
  let employees = getEmployees();
  data.id = new Date().getTime();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function updateEmployee(data) {
  let employees = getEmployees();
  let recordIndex = employees.findIndex((x) => x.id === data.id);
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id) {
  let employees = getEmployees();
  employees = employees.filter((x) => x.id !== id);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function getEmployees() {
  if (localStorage.getItem(KEYS.employees) === null) {
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  }
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  let departments = getDepatmentColletion();

  return employees.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1].title,
  }));
}
