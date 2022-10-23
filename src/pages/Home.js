import React from "react";
import { useTranslation } from "react-i18next";
const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="text-center mt-5 text-primary">{t("welcome")}</h1>
    </div>
  );
};

export default Home;
