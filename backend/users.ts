export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string
  ) {}
  matches(another: User): boolean {
    return (
      another !== undefined &&
      another.email === this.email &&
      another.password === this.password
    );
  }
}

export const users = {
  'vini@vini.com': new User('vini@vini.com', 'vini', 'vinipoli'),
  'nay@nay.com': new User('nay@nay.com', 'nay', 'naypoli'),
};
