
import i18next from "i18next";
import { useTranslation } from "react-i18next";

// This is a simple test file to verify that the imports work correctly
// It doesn't need to be used anywhere, it's just to test the imports

export const testI18n = () => {
  console.log("i18next version:", i18next.version);
  console.log("react-i18next can be imported successfully");
  return true;
};
