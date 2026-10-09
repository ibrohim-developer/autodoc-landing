// Open positions on the vacancies page. Texts live under "Career.vacancies.items.<key>" in messages.
// To add one, add its key to `VacancyKey`, an entry here and its texts in every locale.
export type VacancyCategory = "development" | "design" | "analytics" | "management";
export type Employment = "fullTime" | "partTime";
export type VacancyKey =
  | "softwareEngineer"
  | "frontendDeveloper"
  | "backendDeveloper"
  | "mobileDeveloper"
  | "qaEngineer"
  | "devopsEngineer"
  | "productDesigner"
  | "businessAnalyst";

export type Vacancy = {
  key: VacancyKey;
  category: VacancyCategory;
  employment: Employment;
};

export const vacancies: Vacancy[] = [
  { key: "softwareEngineer", category: "development", employment: "fullTime" },
  { key: "frontendDeveloper", category: "development", employment: "fullTime" },
  { key: "backendDeveloper", category: "development", employment: "fullTime" },
  { key: "mobileDeveloper", category: "development", employment: "fullTime" },
  { key: "qaEngineer", category: "development", employment: "fullTime" },
  { key: "devopsEngineer", category: "development", employment: "fullTime" },
  { key: "productDesigner", category: "design", employment: "fullTime" },
  { key: "businessAnalyst", category: "analytics", employment: "fullTime" },
];

export const advantages = ["projects", "team", "growth", "environment", "future"] as const;
