export interface Cab {
  owner: string;
  model: string;
  number: string;
  id?: string;
  available?: string;
}

export class Cab implements Cab {
  constructor(
    public owner: string,
    public model: string,
    public number: string,
    public id?: string,
    public available?: string
  ) {}
}
