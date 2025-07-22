// src/components/usage-banner.tsx
import { Severity, ERROR_NAMES, ErrorVisibility } from "@copilotkit/shared";
import { jsx, jsxs } from "react/jsx-runtime";
var defaultIcons = {
  [Severity.CRITICAL]: /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
        /* @__PURE__ */ jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
      ]
    }
  ),
  [Severity.WARNING]: /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
      ]
    }
  ),
  [Severity.INFO]: /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
      ]
    }
  )
};
function UsageBanner({
  severity = Severity.CRITICAL,
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
    [Severity.INFO]: {
      bg: "rgba(239, 246, 255, 0.95)",
      border: "#93c5fd",
      text: "#1e40af",
      icon: "#3b82f6",
      primaryBtn: "#3b82f6",
      primaryBtnHover: "#2563eb"
    },
    [Severity.WARNING]: {
      bg: "rgba(255, 251, 235, 0.95)",
      border: "#fbbf24",
      text: "#92400e",
      icon: "#f59e0b",
      primaryBtn: "#f59e0b",
      primaryBtnHover: "#d97706"
    },
    [Severity.CRITICAL]: {
      bg: "rgba(254, 242, 242, 0.95)",
      border: "#f87171",
      text: "#991b1b",
      icon: "#ef4444",
      primaryBtn: "#ef4444",
      primaryBtnHover: "#dc2626"
    }
  };
  const themeConfig = themeConfigs[severity] || themeConfigs[Severity.CRITICAL];
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("style", { children: `
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
        /* @__PURE__ */ jsxs(
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
              onClose && /* @__PURE__ */ jsx(
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
              /* @__PURE__ */ jsx(
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
              actions && /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap"
                  },
                  children: [
                    actions.secondary && /* @__PURE__ */ jsx(
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
                    actions.primary && /* @__PURE__ */ jsx(
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
  if (error.visibility !== ErrorVisibility.BANNER) {
    return null;
  }
  const extractUrlFromMessage = (message) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(message);
    return match ? match[2] : null;
  };
  const getErrorActions = (error2) => {
    switch (error2.name) {
      case ERROR_NAMES.MISSING_PUBLIC_API_KEY_ERROR:
        return {
          primary: {
            label: "Sign In",
            onClick: () => window.location.href = "https://cloud.copilotkit.ai"
          }
        };
      case ERROR_NAMES.UPGRADE_REQUIRED_ERROR:
        return {
          primary: {
            label: "Upgrade",
            onClick: () => window.location.href = "https://copilotkit.ai/"
          }
        };
      case ERROR_NAMES.COPILOT_API_DISCOVERY_ERROR:
      case ERROR_NAMES.COPILOT_REMOTE_ENDPOINT_DISCOVERY_ERROR:
      case ERROR_NAMES.COPILOT_KIT_AGENT_DISCOVERY_ERROR:
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
  return /* @__PURE__ */ jsx(
    UsageBanner,
    {
      severity: error.severity || Severity.CRITICAL,
      message: error.message,
      onClose,
      actions: getErrorActions(error)
    }
  );
}

export {
  UsageBanner,
  renderCopilotKitUsage
};
//# sourceMappingURL=chunk-57K2ZJ5F.mjs.map