export const environment = {
  production: true,
  API_ENDPOINT: 'https://portal.bookwy.com',
  S3_BUCKET_URL: 'https://bookwy.s3.amazonaws.com/',
  GOOGLE_RECAPTCHA_SITE_KEY: '6Ld-bc0UAAAAAFXMoaGuVnbrDcYSKLgpgSyC6SSs',
  PAYPAL_CLIENT_ID: 'ASVm7eVb3zYt9g9ZbDZWYUTL1ysYIPyS73tVf868Kx6_naEtWYEAioRJjrVAc9C4FIfQ257TCYnoOmJ7', 
  //PAYPAL_CLIENT_ID: 'AbRca5-AlCZs2wDIiJzbAgz9vXW-pRdR8APUJLqurwEcAv2i9kaeNS_ZbG_seagKy4Zc92rebZKWcKMZ', 
  DEFAULT_PROFILE_PIC: 'assets/image/default-user.png',  
  TWO_CEHCKOUT_SELLER_ID:'901419990',
  TWO_CHECKOUT_PUBLISHKEY:'E2998212-081C-4D18-8318-37FD811576B2',
  //social logins
  SOCIAL_LOGINS: {
   
    FACEBOOK: {
      FACEBOOK_APP_ID: '229276431530893',
    }
  },
  MESSAGES: {
    ERROR_TEXT_LOADER: 'Oops!',
    SIGNING_UP: 'Signing up.. please wait',
    WAIT_TEXT: 'Please wait...',
    VALIDATION_ERROR: 'We have got some validation error. Please check your details.',
    UNABLE_TO_FIND_DETAILS: 'Unable to find details.',
    COUPON_CODE_APPLIED: 'Coupon Code Applied.',
    COUPON_CODE_INVALID: 'Invalid Coupon Code.',
    COUPON_CODE_REMOVED: 'Coupon removed successfully.',
    PAYMENT_FAILED:'Sorry, the transaction has failed due to unknown reason. Please try again in some time.',
    FAILED_TO_VERIFY: "Token expired or Failed to verify your account. Please try again.",
    CANNOT_UPLOAD_MORE: "You cannot upload any more files.",
    ADD_CREDITS_TO_LAUNCH: "Please add credits to your account now to launch the project.",
    TICKET_CREATED:'The ticket has been created successfully.',
    NOT_ENOUGH_CREDITS: "You dont have enough credits.",
    NO_PROJECTS_FOUND: "No Projects Found.",    
    MESSAGE_SEND:'Message has been sent successfully.',
    TICKET_UPDATE:'Ticket updated successfully.',
    CREDITS_NOT_EMPTY:'Credits or Coupon Code is required.',
    FEEDBACK_SUCCESS:'Feedback has been submitted successfully.',
    CANCEL_PROJECT:'Are you sure you want to cancel this project?',
    PROFILE_UPDATE:'Profile updated successfully.',
    PAYENT_SUCCESS:'Payment has been done successfully.',
    CREDIT_CARD_INVALID:'Oops! wrong credit card information provided by you.',
    PROFILE_IMAGE_UPDATE:'Profile image updated successfully.',
    PASSWORD_CHANGE:'Password has been changed successfully.'
  }
};
