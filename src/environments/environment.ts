// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_ENDPOINT: 'http://localhost:3000',
  GOOGLE_RECAPTCHA_SITE_KEY: '6Ld-bc0UAAAAAFXMoaGuVnbrDcYSKLgpgSyC6SSs',
  PAYPAL_CLIENT_ID: 'AQfA5nzAx7WkixB5bANwwv5wd--9KYCniND-qpUeHtdKGi9pHNnsFYeejAyNr6ovYpDd8iHXDc7hwIXi',
  TWO_CEHCKOUT_SELLER_ID:'901419990',
  TWO_CHECKOUT_PUBLISHKEY:'E2998212-081C-4D18-8318-37FD811576B2',
  MESSAGES: {
    ERROR_TEXT_LOADER: 'Oops!',
    SIGNING_UP: 'Signing up.. please wait',
    WAIT_TEXT: 'Please wait...',
    UNABLE_TO_FIND_DETAILS: 'Unable to find details.',
    COUPON_CODE_APPLIED: 'Coupon Code Applied.',
    COUPON_CODE_INVALID: 'Invalid Coupon Code.',
    COUPON_CODE_REMOVED: 'Coupon removed successfully..',
    PAYMENT_FAILED:'Sorry, the transaction has failed due to unknown reason. Please try again in some time.',
    FAILED_TO_VERIFY: "Token expired or Failed to verify your account. Please try again.",
    CANNOT_UPLOAD_MORE: "You cannot upload any more files.",
    TICKET_CREATED:'The ticket has been created successfully.',
    NOT_ENOUGH_CREDITS: "You dont have enough credits.",
    NO_PROJECTS_FOUND: "No Projects Found.",    
    MESSAGE_SEND:'Message send successfully.',
    TICKET_UPDATE:'Ticket updated successfully.',
    CREDITS_NOT_EMPTY:'Credits or Coupon Code is required.',
    FEEDBACK_SUCCESS:'Feedback has been submitted successfully.',
    CANCEL_PROJECT:'Are you sure you want to cancel this project?',
    PROFILE_UPDATE:'Profile updated successfully.',
    PAYENT_SUCCESS:'Payment has been done successfully.',
    CREDIT_CARD_INVALID:'Oops! wrong credit card information provided by you.',
    PROFILE_IMAGE_UPDATE:'Profile image updated successfully.'
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
