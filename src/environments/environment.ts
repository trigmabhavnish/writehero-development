// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_ENDPOINT: 'http://localhost:3000',
  GOOGLE_RECAPTCHA_SITE_KEY: '6Ld-bc0UAAAAAFXMoaGuVnbrDcYSKLgpgSyC6SSs',
  PAYPAL_CLIENT_ID: 'AQfA5nzAx7WkixB5bANwwv5wd--9KYCniND-qpUeHtdKGi9pHNnsFYeejAyNr6ovYpDd8iHXDc7hwIXi',
  MESSAGES: {
    ERROR_TEXT_LOADER: 'Oops!',
    SIGNING_UP: 'Signing up.. please wait',
    WAIT_TEXT: 'Please wait...',
    COUPON_CODE_APPLIED: 'Coupon Code Applied.',
    COUPON_CODE_INVALID: 'Invalid Coupon Code.',
    COUPON_CODE_REMOVED: 'Coupon removed successfully..',
    PAYMENT_FAILED:'Sorry, the transaction has failed due to unknown reason. Please try again in some time.',
    FAILED_TO_VERIFY: "Token expired or Failed to verify your account. Please try again.",
    CANNOT_UPLOAD_MORE: "You cannot upload any more files.",
    TICKET_CREATED:'The ticket has been created successfully.'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
