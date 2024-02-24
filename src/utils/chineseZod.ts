import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
// Import your language translation files
import translation from "zod-i18n-map/locales/zh-TW/zod.json";

// lng and resources key depend on your locale.
i18next
  .init({
    lng: "zh-TW",
    resources: {
      "zh-TW": { zod: translation },
    },
  })
  .catch((err) => {
    console.error("i18next 初始化失敗");
    console.error(err);
  });
z.setErrorMap(zodI18nMap);

// export configured zod instance
export { z };
