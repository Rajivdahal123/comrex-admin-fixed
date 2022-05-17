export const fullName = (user: any) => {
  if (!user) return '';

  const { firstName = 'User', lastName = 'Name' } = user;

  return `Hi, ${firstName === '' ? 'User' : firstName} ${lastName === '' ? 'Name' : lastName}`;
};
