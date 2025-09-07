export interface ICreateAuthorDTO {
  name: string;
  biography?: string;
  birthDate: Date | string;
  nationality: string;
}