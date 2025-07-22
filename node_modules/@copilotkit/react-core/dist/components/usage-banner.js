"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/usage-banner.tsx
var usage_banner_exports = {};
__export(usage_banner_exports, {
  UsageBanner: () => UsageBanner,
  renderCopilotKitUsage: () => renderCopilotKitUsage
});
module.exports = __toCommonJS(usage_banner_exports);
var import_shared = require("@copilotkit/shared");
var import_jsx_runtime = require("react/jsx-runtime");
var defaultIcons = {
  [import_shared.Severity.CRITICAL]: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      stroke: "currentColor",
      strokeWidth: "2.5",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
      ]
    }
  ),
  [import_shared.Severity.WARNING]: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      stroke: "currentColor",
      strokeWidth: "2.5",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
      ]
    }
  ),
  [import_shared.Severity.INFO]: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      stroke: "currentColor",
      strokeWidth: "2.5",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
      ]
    }
  )
};
function UsageBanner({
  severity = import_shared.Severity.CRITICAL,
  message = "",
  icon,
  onClose,
  actions
}) {
  if (!message || !severity) {
    return null;
  }
  const parseMessage = (rawMessage) => {
    if (rawMessage.toLowerCase().includes("authentication") || rawMessage.toLowerCase().includes("api key")) {
      return "Authentication failed. Please check your API key.";
    }
    if (rawMessage.toLowerCase().includes("rate limit")) {
      return "Rate limit exceeded. Please try again later.";
    }
    if (rawMessage.toLowerCase().includes("checkpointer")) {
      return "Agent configuration error. Please check your setup.";
    }
    let cleanMessage2 = rawMessage;
    cleanMessage2 = cleanMessage2.split(" - ")[0];
    cleanMessage2 = cleanMessage2.split(": Error code")[0];
    cleanMessage2 = cleanMessage2.split(": 401")[0];
    cleanMessage2 = cleanMessage2.split(": 403")[0];
    cleanMessage2 = cleanMessage2.split(": 404")[0];
    cleanMessage2 = cleanMessage2.split(": 500")[0];
    cleanMessage2 = cleanMessage2.replace(/See more:.*$/g, "").trim();
    if (cleanMessage2.includes("{") || cleanMessage2.includes("'") || cleanMessage2.length > 60) {
      return "Configuration error. Please check your setup.";
    }
    return cleanMessage2 || "An error occurred. Please check your configuration.";
  };
  const cleanMessage = parseMessage(message);
  const Icon = icon || defaultIcons[severity];
  const themeConfigs = {
    [import_shared.Severity.INFO]: {
      bg: "rgba(239, 246, 255, 0.95)",
      border: "#93c5fd",
      text: "#1e40af",
      icon: "#3b82f6",
      primaryBtn: "#3b82f6",
      primaryBtnHover: "#2563eb"
    },
    [import_shared.Severity.WARNING]: {
      bg: "rgba(255, 251, 235, 0.95)",
      border: "#fbbf24",
      text: "#92400e",
      icon: "#f59e0b",
      primaryBtn: "#f59e0b",
      primaryBtnHover: "#d97706"
    },
    [import_shared.Severity.CRITICAL]: {
      bg: "rgba(254, 242, 242, 0.95)",
      border: "#f87171",
      text: "#991b1b",
      icon: "#ef4444",
      primaryBtn: "#ef4444",
      primaryBtnHover: "#dc2626"
    }
  };
  const themeConfig = themeConfigs[severity] || themeConfigs[import_shared.Severity.CRITICAL];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "400px",
        maxWidth: "90vw",
        zIndex: 1e4,
        animation: "bannerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          @keyframes bannerSlideIn {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
              scale: 0.95;
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
              scale: 1;
            }
          }
        ` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            style: {
              borderRadius: "12px",
              border: `1px solid ${themeConfig.border}`,
              background: themeConfig.bg,
              padding: "14px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
              position: "relative",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxSizing: "border-box",
              overflow: "hidden"
            },
            children: [
              onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: onClose,
                  style: {
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    color: themeConfig.text,
                    cursor: "pointer",
                    fontSize: "16px",
                    lineHeight: "1",
                    padding: "4px",
                    borderRadius: "4px",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  title: "Close",
                  children: "\xD7"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  style: {
                    fontSize: "14px",
                    fontWeight: 500,
                    color: themeConfig.text,
                    lineHeight: "1.4",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    paddingRight: onClose ? "30px" : "0",
                    marginBottom: actions ? "12px" : "0",
                    wordBreak: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  },
                  children: cleanMessage
                }
              ),
              actions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap"
                  },
                  children: [
                    actions.secondary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        onClick: actions.secondary.onClick,
                        style: {
                          borderRadius: "8px",
                          padding: "6px 12px",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: themeConfig.text,
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: `1px solid ${themeConfig.border}`,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                        },
                        onMouseOver: (e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        },
                        onMouseOut: (e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                          e.currentTarget.style.transform = "translateY(0)";
                        },
                        children: actions.secondary.label
                      }
                    ),
                    actions.primary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        onClick: actions.primary.onClick,
                        style: {
                          borderRadius: "8px",
                          padding: "6px 12px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#fff",
                          backgroundColor: themeConfig.primaryBtn,
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                        },
                        onMouseOver: (e) => {
                          e.currentTarget.style.backgroundColor = themeConfig.primaryBtnHover;
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                        },
                        onMouseOut: (e) => {
                          e.currentTarget.style.backgroundColor = themeConfig.primaryBtn;
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
                        },
                        children: actions.primary.label
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function renderCopilotKitUsage(error, onClose) {
  if (error.visibility !== import_shared.ErrorVisibility.BANNER) {
    return null;
  }
  const extractUrlFromMessage = (message) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(message);
    return match ? match[2] : null;
  };
  const getErrorActions = (error2) => {
    switch (error2.name) {
      case import_shared.ERROR_NAMES.MISSING_PUBLIC_API_KEY_ERROR:
        return {
          primary: {
            label: "Sign In",
            onClick: () => window.location.href = "https://cloud.copilotkit.ai"
          }
        };
      case import_shared.ERROR_NAMES.UPGRADE_REQUIRED_ERROR:
        return {
          primary: {
            label: "Upgrade",
            onClick: () => window.location.href = "https://copilotkit.ai/"
          }
        };
      case import_shared.ERROR_NAMES.COPILOT_API_DISCOVERY_ERROR:
      case import_shared.ERROR_NAMES.COPILOT_REMOTE_ENDPOINT_DISCOVERY_ERROR:
      case import_shared.ERROR_NAMES.COPILOT_KIT_AGENT_DISCOVERY_ERROR:
        return {
          primary: {
            label: "View Docs",
            onClick: () => {
              var _a;
              const urlFromMessage = extractUrlFromMessage(error2.message);
              const urlFromExtensions = (_a = error2.extensions) == null ? void 0 : _a.troubleshootingUrl;
              const url = urlFromMessage || urlFromExtensions || "https://docs.copilotkit.ai/troubleshooting/common-issues";
              window.open(url, "_blank");
            }
          }
        };
      default:
        return void 0;
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    UsageBanner,
    {
      severity: error.severity || import_shared.Severity.CRITICAL,
      message: error.message,
      onClose,
      actions: getErrorActions(error)
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsageBanner,
  renderCopilotKitUsage
});
//# sourceMappingURL=usage-banner.js.map