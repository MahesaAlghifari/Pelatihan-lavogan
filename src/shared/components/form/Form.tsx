import { FormActions } from "./FormActions";
import { FormGrid } from "./FormGrid";
import { FormSection } from "./FormSection";

import { FormCheckbox } from "./fields/FormCheckbox";
import { FormDatePicker } from "./fields/FormDatePicker";
import { FormSelect } from "./fields/FormSelect";
import { FormSwitch } from "./fields/FormSwitch";
import { FormTextField } from "./fields/FormTextField";
import { FormTextarea } from "./fields/FormTextarea";
import { FormUpload } from "./fields/FormUpload";

export const Form = {
  TextField: FormTextField,

  Textarea: FormTextarea,

  Select: FormSelect,

  Checkbox: FormCheckbox,

  Switch: FormSwitch,

  DatePicker: FormDatePicker,

  Upload: FormUpload,

  Grid: FormGrid,

  Section: FormSection,

  Actions: FormActions,
};