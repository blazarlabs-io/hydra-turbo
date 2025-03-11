export const authErrorCodes = {
  signUp: {
    invalidEmail: {
      code: "auth/invalid-email",
      message: "The email address is not valid.",
    },
    emailAlreadyInUse: {
      code: "auth/email-already-in-use",
      message: "The email address is already in use by another account.",
    },
    operationNotAllowed: {
      code: "auth/operation-not-allowed",
      message: "Email/password accounts are not enabled.",
    },
    weakPassword: {
      code: "auth/weak-password",
      message:
        "The password must be 6 characters long or more and contain at least one number and one uppercase letter.",
    },
    missingEmail: {
      code: "auth/missing-email",
      message: "An email address must be provided.",
    },
  },
  signIn: {
    invalidEmail: {
      code: "auth/invalid-email",
      message: "The email address is not valid.",
    },
    invalidCredentials: {
      code: "auth/invalid-login-credentials",
      message:
        "Login credentials are not valid. Make sure have an account registered with this address and that you are typing the correct password.",
    },
    userNotFound: {
      code: "auth/user-not-found",
      message: "There is no user record corresponding to this identifier.",
    },
    wrongPassword: {
      code: "auth/wrong-password",
      message: "The password is invalid.",
    },
    userDisabled: {
      code: "auth/user-disabled",
      message: "The user account has been disabled by an administrator.",
    },
  },
  changePassword: {
    weakPassword: {
      code: "auth/weak-password",
      message:
        "The password must be 6 characters long or more and contain at least one number and one uppercase letter.",
    },
    requiresRecentLogin: {
      code: "auth/requires-recent-login",
      message:
        "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
    },
  },
  resetPassword: {
    invalidEmail: {
      code: "auth/invalid-email",
      message: "The email address is not valid.",
    },
    userNotFound: {
      code: "auth/user-not-found",
      message: "There is no user record corresponding to this email.",
    },
    unauthorizedContinueUri: {
      code: "auth/unauthorized-continue-uri",
      message:
        "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
    },
    missingAndroidPkgName: {
      code: "auth/missing-android-pkg-name",
      message:
        "An Android package name must be provided if the Android app is required to be installed.",
    },
    missingContinueUri: {
      code: "auth/missing-continue-uri",
      message: "A continue URL must be provided in the request.",
    },
    missingiOSBundleId: {
      code: "auth/missing-ios-bundle-id",
      message:
        "An iOS Bundle ID must be provided if an App Store ID is provided.",
    },
    invalidContinueUri: {
      code: "auth/invalid-continue-uri",
      message: "The continue URL provided in the request is invalid.",
    },
  },
  emailVerification: {
    missingAndroidPkgName: {
      code: "auth/missing-android-pkg-name",
      message:
        "An Android package name must be provided if the Android app is required to be installed.",
    },
    missingContinueUri: {
      code: "auth/missing-continue-uri",
      message: "A continue URL must be provided in the request.",
    },
    missingIOSBundleId: {
      code: "auth/missing-ios-bundle-id",
      message:
        "An iOS Bundle ID must be provided if an App Store ID is provided.",
    },
    invalidContinueUri: {
      code: "auth/invalid-continue-uri",
      message: "The continue URL provided in the request is invalid.",
    },
    unauthorizedContinueUri: {
      code: "auth/unauthorized-continue-uri",
      message:
        "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
    },
  },
};
