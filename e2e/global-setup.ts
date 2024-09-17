import { createTestUser } from './auth.setup';

const globalSetup = async () => {

    
  console.log('Creating test user...');
  await createTestUser();
  console.log('Test user created.');
};

export default globalSetup;