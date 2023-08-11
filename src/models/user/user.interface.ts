export interface UserData {
  email: string;
  userId: string;
  name?: string;
  recoveryKey?: string;
  salt?: string;
}
