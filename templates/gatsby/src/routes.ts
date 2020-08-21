// GET FROM CONTENTFUL
const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/sign-in',
  REGISTRATION: '/auth/sign-up',
  ACCOUNT: '/account',
}
export default ROUTES
export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTRATION]
