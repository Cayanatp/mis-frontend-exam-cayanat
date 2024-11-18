export {
  Password,
  PasswordConfirmation,
  Email,
  Login,
  ChangePassword,
  Authentication,
  Me,
  Role,
};

declare global {
  interface Password {
    password: string;
  }

  interface Login extends Password {
    username: string;
  }

  interface Authentication {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
  }

  interface Me {
    username: string;
  }
}
