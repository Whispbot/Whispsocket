import "socket.io";

type User = {
  id: string | undefined;
  username: string | undefined;
  avatar: string | undefined;
  discriminator: string | undefined;
  public_flags: number | undefined;
  flags: number | undefined;
  banner: string | undefined;
  accent_color: number | undefined;
  global_name: string | undefined;
  banner_color: string | undefined;
  clan: string | undefined;
  mfa_enabled: boolean | undefined;
  locale: string | undefined;
  premium_type: number | undefined;
};

declare module "socket.io" {
  interface Socket {
    user: User;
  }
}
