import { t } from "i18next";
import { DashboardIcon, AlertManagerIcon, AssetManagerIcon, AttackSurfaceMonitoringIcon, ComplianceReportsIcon, NetworkIcon, SettingsIcon, VulnerabilityManagerIcon } from "../ui/icons";
const menuStyle = (isActive:boolean) => isActive ? '#fff' : '#979797';
export const menuItems = [
    {
      id: "dashboard",
      path: "/",
      Component: ({ isActive }: { isActive: boolean }) => (
        <>
          <DashboardIcon fill={menuStyle(isActive)} /> <p>{t("dashboard")}</p>
        </>
      ),
    },
    {
      id: "alert-manager",
      path: "/alert-manager",
      Component: ({ isActive }: { isActive: boolean }) => (
        <>
          <AlertManagerIcon fill={menuStyle(isActive)} />
          <p>{t("alert-manager")}</p>
        </>
      ),
    },
    {
      id: "network",
      path: "/network",
      Component: ({ isActive }: { isActive: boolean }) => (
        <>
          <NetworkIcon fill={menuStyle(isActive)} /> <p>{t("network")}</p>
        </>
      ),
    },
    {
      id: "asset-manager",
      path: "/asset-manager",
      Component: ({ isActive }: { isActive: boolean }) => (
        <>
          <AssetManagerIcon fill={menuStyle(isActive)} />
          <p>{t("asset-manager")}</p>
        </>
      ),
    },
    {
      id: "vulnerabilities-manager",
      path: "/vulnerabilities-manager",
      Component: ({ isActive }: { isActive: boolean }) => (
        <>
          <VulnerabilityManagerIcon fill={menuStyle(isActive)} />
          <p>{t("vulnerability-manager")}</p>
        </>
      ),
    },
    {
      id: "attack-surface-monitoring",
      path: "/attack-surface-monitoring",
      Component: ({ isActive }: { isActive: boolean }) => (
        <>
          <AttackSurfaceMonitoringIcon fill={menuStyle(isActive)} />
          <p>{t("attack-surface-monitoring")}</p>
        </>
      ),
    },
    {
      id: "compliance-reports",
      path: "/compliance-reports",
      Component: ({ isActive }: { isActive: boolean }) => (
        <>
          <ComplianceReportsIcon fill={menuStyle(isActive)} />
          <p>{t("compliance-reports")}</p>
        </>
      ),
    },
    {
      id: "settings",
      path: "/settings",
      Component: ({ isActive }: { isActive: boolean }) => (
        <>
          <SettingsIcon fill={menuStyle(isActive)} /> <p>{t("settings")}</p>
        </>
      ),
    },
  ];