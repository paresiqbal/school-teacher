// protect to entire application
export { default } from "next-auth/middleware";

export const config = { matcher: ["/page"] };
