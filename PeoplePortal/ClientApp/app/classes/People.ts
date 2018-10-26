export type Gender = 'Male' | 'Female';

export interface People {
  id?: number;
  name?: string;
  firstname?: string;
  middlename?: string;
  surname?: string;
  age?: string;
  gender?: Gender[];
  picture?: string;
}

export interface PeopleFilter {
  gender?: Gender;
}
