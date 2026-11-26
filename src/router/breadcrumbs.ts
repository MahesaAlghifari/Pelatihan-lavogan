import {
  ADMIN_PATH,
  AUTH_PATH,
  PARTICIPANT_PATH,
  PUBLIC_PATH,
} from "./paths";

/* ============================================================================
 * Breadcrumb Labels
 * ========================================================================== */

export const breadcrumbLabels: Record<
  string,
  string
> = {
  /* ------------------------------------------------------------------------ */
  /* Public */
  /* ------------------------------------------------------------------------ */

  [PUBLIC_PATH.HOME]: "Home",

  [PUBLIC_PATH.ABOUT]: "About",

  [PUBLIC_PATH.FAQ]: "FAQ",

  [PUBLIC_PATH.CONTACT]: "Contact",

  /* ------------------------------------------------------------------------ */
  /* Auth */
  /* ------------------------------------------------------------------------ */

  [AUTH_PATH.LOGIN]: "Login",

  [AUTH_PATH.FORGOT_PASSWORD]:
    "Forgot Password",

  [AUTH_PATH.RESET_PASSWORD]:
    "Reset Password",

  /* ------------------------------------------------------------------------ */
  /* Dashboard */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.DASHBOARD]:
    "Dashboard",

  [PARTICIPANT_PATH.DASHBOARD]:
    "Dashboard",

  [PARTICIPANT_PATH.SCHEMES]:
    "Program Pelatihan",

  [PARTICIPANT_PATH.SCHEME_DETAIL]:
    "Detail Pelatihan",

  /* ------------------------------------------------------------------------ */
  /* Training */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.TRAINING]:
    "Training",

  [ADMIN_PATH.TRAINING_CREATE]:
    "Create Training",

  [ADMIN_PATH.TRAINING_DETAIL]:
    "Training Detail",

  [ADMIN_PATH.TRAINING_EDIT]:
    "Edit Training",

  /* ------------------------------------------------------------------------ */
  /* Participant */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.PARTICIPANT]:
    "Participants",

  [ADMIN_PATH.PARTICIPANT_DETAIL]:
    "Participant Detail",

  /* ------------------------------------------------------------------------ */
  /* Learning Path */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.LEARNING_PATH]:
    "Learning Path",

  [ADMIN_PATH.LEARNING_PATH_CREATE]:
    "Create Learning Path",

  [ADMIN_PATH.LEARNING_PATH_EDIT]:
    "Edit Learning Path",

  /* ------------------------------------------------------------------------ */
  /* Material */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.MATERIAL]:
    "Materials",

  [ADMIN_PATH.MATERIAL_CREATE]:
    "Create Material",

  [ADMIN_PATH.MATERIAL_EDIT]:
    "Edit Material",

  /* ------------------------------------------------------------------------ */
  /* Module */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.MODULE]:
    "Modules",

  [ADMIN_PATH.MODULE_CREATE]:
    "Create Module",

  [ADMIN_PATH.MODULE_EDIT]:
    "Edit Module",

  /* ------------------------------------------------------------------------ */
  /* Quiz */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.QUIZ]:
    "Quiz",

  [ADMIN_PATH.QUIZ_CREATE]:
    "Create Quiz",

  [ADMIN_PATH.QUIZ_EDIT]:
    "Edit Quiz",

  /* ------------------------------------------------------------------------ */
  /* Certificate */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.CERTIFICATE]:
    "Certificates",

  /* ------------------------------------------------------------------------ */
  /* Scheme */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.SCHEME]:
    "Schemes",

  /* ------------------------------------------------------------------------ */
  /* Settings */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.SETTINGS]:
    "Settings",

  /* ------------------------------------------------------------------------ */
  /* Profile */
  /* ------------------------------------------------------------------------ */

  [ADMIN_PATH.PROFILE]:
    "Profile",

  [PARTICIPANT_PATH.PROFILE]:
    "Profile",

  [PARTICIPANT_PATH.LEARNING]:
    "Learning",

  [PARTICIPANT_PATH.LEARNING_DETAIL]:
    "Learning Detail",

  [PARTICIPANT_PATH.QUIZ]:
    "Quiz",

  [PARTICIPANT_PATH.CERTIFICATE]:
    "Certificate",
};