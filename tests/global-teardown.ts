import { deleteTestUser } from './auth.setup';

const globalTeardown = async () => {
  console.log('Deleting test user...');
  await deleteTestUser();
  console.log('Test user deleted.');
};

export default globalTeardown;