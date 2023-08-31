import { StateSchema } from 'app/providers/StoreProvider';

export const getUserOrganization = (state: StateSchema) =>
  state?.user?.authData?.businessUnit || state?.user?.authData?.organization;
