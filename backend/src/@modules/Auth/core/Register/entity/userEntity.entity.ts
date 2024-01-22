export type userProps = {
  uuid: string;
  email: string;
  cpf: string;
  name: string;
  password: string;
  is_verify?: boolean;
};
export class userEntity {
  constructor(readonly props: userProps) {}
  uuid(): string {
    return this.props.uuid;
  }
  name(): string {
    return this.props.name;
  }
  cpf(): string {
    return this.props.cpf;
  }
  email(): string {
    return this.props.email;
  }
  password(): string {
    return this.props.password;
  }
  is_verify(): boolean {
    return this.props.is_verify;
  }
  updateVerify(verify: boolean) {
    this.props.is_verify = verify;
  }
  updateName(name: string) {
    this.props.name = name;
  }
  updateCpf(cpf: string) {
    this.props.cpf = cpf;
  }
  updatePassword(password: string) {
    this.props.password = password;
  }
  updateEmail(email: string) {
    this.props.email = email;
  }
  payloadToken() {
    const payload: any = {
      uuid: this.props.uuid,
      name: this.props.name,
      cpf: this.props.cpf,
      email: this.props.email,
    };
    return payload;
  }
}
