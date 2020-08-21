// GET FROM CONTENTFUL
const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/sign-in',
  REGISTRATION: '/auth/registration',
  ACCOUNT: '/account',
}
export default ROUTES
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTRATION]
