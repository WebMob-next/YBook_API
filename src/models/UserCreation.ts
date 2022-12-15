import { Description, Email, Example, Required } from "@tsed/schema";

export class UserCreation {
  @Description("First name")
  @Example("John")
  @Required()
  firstname: string;

  @Description("Last name")
  @Example("Doe")
  @Required()
  lastname: string;

  @Description("Email")
  @Example("johnDoe@exammple.com")
  @Required()
  @Email()
  email: string;

  constructor(firstname: string, lastname: string, email: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }
}
