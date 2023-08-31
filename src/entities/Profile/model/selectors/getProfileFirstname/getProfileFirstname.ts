import { StateSchema } from 'app/providers/StoreProvider';

export const getProfleFirstname = (state: StateSchema) => state?.profile?.data?.firstname;
