export interface Customer {
  name: string;
  address: {
    country: string;
    city: string;
    street: string;
  };
  id?: string;
  onboard?: string;
  tripCount?: string;
}

export class Customer implements Customer {
  constructor(
    public name: string,
    public address: {
      country: string;
      city: string;
      street: string;
    },
    public id?: string,
    public onboard?: string,
    public tripCount?: string
  ) {}
}
