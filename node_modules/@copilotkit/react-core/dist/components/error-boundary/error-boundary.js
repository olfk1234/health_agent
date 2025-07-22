"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/components/error-boundary/error-boundary.tsx
var error_boundary_exports = {};
__export(error_boundary_exports, {
  CopilotErrorBoundary: () => CopilotErrorBoundary,
  ErrorToast: () => ErrorToast2
});
module.exports = __toCommonJS(error_boundary_exports);
var import_react3 = __toESM(require("react"));
var import_shared4 = require("@copilotkit/shared");

// src/lib/status-checker.ts
var import_shared = require("@copilotkit/shared");
var STATUS_CHECK_INTERVAL = 1e3 * 60 * 5;
var StatusChecker = class {
  constructor() {
    this.activeKey = null;
    this.intervalId = null;
    this.instanceCount = 0;
    this.lastResponse = null;
  }
  start(publicApiKey, onUpdate) {
    return __async(this, null, function* () {
      this.instanceCount++;
      if (this.activeKey === publicApiKey)
        return;
      if (this.intervalId)
        clearInterval(this.intervalId);
      const checkStatus = () => __async(this, null, function* () {
        try {
          const response = yield fetch(`${import_shared.COPILOT_CLOUD_API_URL}/ciu`, {
            method: "GET",
            headers: {
              [import_shared.COPILOT_CLOUD_PUBLIC_API_KEY_HEADER]: publicApiKey
            }
          }).then((response2) => response2.json());
          this.lastResponse = response;
          onUpdate == null ? void 0 : onUpdate(response);
          return response;
        } catch (error) {
          return null;
        }
      });
      const initialResponse = yield checkStatus();
      this.intervalId = setInterval(checkStatus, STATUS_CHECK_INTERVAL);
      this.activeKey = publicApiKey;
      return initialResponse;
    });
  }
  getLastResponse() {
    return this.lastResponse;
  }
  stop() {
    this.instanceCount--;
    if (this.instanceCount === 0) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.activeKey = null;
        this.lastResponse = null;
      }
    }
  }
};

// src/components/usage-banner.tsx
var import_shared2 = require("@copilotkit/shared");
var import_jsx_runtime = require("react/jsx-runtime");
var defaultIcons = {
  [import_shared2.Severity.CRITICAL]: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
  [import_shared2.Severity.WARNING]: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
  [import_shared2.Severity.INFO]: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
  severity = import_shared2.Severity.CRITICAL,
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
    [import_shared2.Severity.INFO]: {
      bg: "rgba(239, 246, 255, 0.95)",
      border: "#93c5fd",
      text: "#1e40af",
      icon: "#3b82f6",
      primaryBtn: "#3b82f6",
      primaryBtnHover: "#2563eb"
    },
    [import_shared2.Severity.WARNING]: {
      bg: "rgba(255, 251, 235, 0.95)",
      border: "#fbbf24",
      text: "#92400e",
      icon: "#f59e0b",
      primaryBtn: "#f59e0b",
      primaryBtnHover: "#d97706"
    },
    [import_shared2.Severity.CRITICAL]: {
      bg: "rgba(254, 242, 242, 0.95)",
      border: "#f87171",
      text: "#991b1b",
      icon: "#ef4444",
      primaryBtn: "#ef4444",
      primaryBtnHover: "#dc2626"
    }
  };
  const themeConfig = themeConfigs[severity] || themeConfigs[import_shared2.Severity.CRITICAL];
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
  if (error.visibility !== import_shared2.ErrorVisibility.BANNER) {
    return null;
  }
  const extractUrlFromMessage = (message) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(message);
    return match ? match[2] : null;
  };
  const getErrorActions = (error2) => {
    switch (error2.name) {
      case import_shared2.ERROR_NAMES.MISSING_PUBLIC_API_KEY_ERROR:
        return {
          primary: {
            label: "Sign In",
            onClick: () => window.location.href = "https://cloud.copilotkit.ai"
          }
        };
      case import_shared2.ERROR_NAMES.UPGRADE_REQUIRED_ERROR:
        return {
          primary: {
            label: "Upgrade",
            onClick: () => window.location.href = "https://copilotkit.ai/"
          }
        };
      case import_shared2.ERROR_NAMES.COPILOT_API_DISCOVERY_ERROR:
      case import_shared2.ERROR_NAMES.COPILOT_REMOTE_ENDPOINT_DISCOVERY_ERROR:
      case import_shared2.ERROR_NAMES.COPILOT_KIT_AGENT_DISCOVERY_ERROR:
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
      severity: error.severity || import_shared2.Severity.CRITICAL,
      message: error.message,
      onClose,
      actions: getErrorActions(error)
    }
  );
}

// src/components/error-boundary/error-utils.tsx
var import_react2 = require("react");

// src/components/toast/toast-provider.tsx
var import_react = require("react");
var import_shared3 = require("@copilotkit/shared");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ToastContext = (0, import_react.createContext)(void 0);
function useToast() {
  const context = (0, import_react.useContext)(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// src/components/toast/exclamation-mark-icon.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var ExclamationMarkIcon = ({
  className,
  style
}) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `lucide lucide-circle-alert ${className ? className : ""}`,
    style,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })
    ]
  }
);

// src/components/error-boundary/error-utils.tsx
var import_react_markdown = __toESM(require("react-markdown"));
var import_jsx_runtime4 = require("react/jsx-runtime");
function ErrorToast({ errors }) {
  const errorsToRender = errors.map((error, idx) => {
    var _a, _b, _c;
    const originalError = "extensions" in error ? (_a = error.extensions) == null ? void 0 : _a.originalError : {};
    const message = (_b = originalError == null ? void 0 : originalError.message) != null ? _b : error.message;
    const code = "extensions" in error ? (_c = error.extensions) == null ? void 0 : _c.code : null;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        style: {
          marginTop: idx === 0 ? 0 : 10,
          marginBottom: 14
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExclamationMarkIcon, { style: { marginBottom: 4 } }),
          code && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "div",
            {
              style: {
                fontWeight: "600",
                marginBottom: 4
              },
              children: [
                "Copilot Runtime Error:",
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { style: { fontFamily: "monospace", fontWeight: "normal" }, children: code })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_markdown.default, { children: message })
        ]
      },
      idx
    );
  });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      style: {
        fontSize: "13px",
        maxWidth: "600px"
      },
      children: [
        errorsToRender,
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { fontSize: "11px", opacity: 0.75 }, children: "NOTE: This error only displays during local development." })
      ]
    }
  );
}
function useErrorToast() {
  const { addToast } = useToast();
  return (0, import_react2.useCallback)(
    (error) => {
      const errorId = error.map((err) => {
        var _a, _b;
        const message = "extensions" in err ? ((_b = (_a = err.extensions) == null ? void 0 : _a.originalError) == null ? void 0 : _b.message) || err.message : err.message;
        const stack = err.stack || "";
        return btoa(message + stack).slice(0, 32);
      }).join("|");
      addToast({
        type: "error",
        id: errorId,
        // Toast libraries typically dedupe by id
        message: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ErrorToast, { errors: error })
      });
    },
    [addToast]
  );
}

// src/components/error-boundary/error-boundary.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var statusChecker = new StatusChecker();
var CopilotErrorBoundary = class extends import_react3.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidMount() {
    if (this.props.publicApiKey) {
      statusChecker.start(this.props.publicApiKey, (newStatus) => {
        this.setState((prevState) => {
          var _a;
          if ((newStatus == null ? void 0 : newStatus.severity) !== ((_a = prevState.status) == null ? void 0 : _a.severity)) {
            return { status: newStatus != null ? newStatus : void 0 };
          }
          return null;
        });
      });
    }
  }
  componentWillUnmount() {
    statusChecker.stop();
  }
  componentDidCatch(error, errorInfo) {
    console.error("CopilotKit Error:", error, errorInfo);
  }
  render() {
    var _a, _b;
    if (this.state.hasError) {
      if (this.state.error instanceof import_shared4.CopilotKitError) {
        if (this.state.error.visibility === import_shared4.ErrorVisibility.BANNER) {
          return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ErrorToast2, { error: this.state.error, children: renderCopilotKitUsage(
            this.state.error,
            () => this.setState({ hasError: false, error: void 0 })
          ) });
        }
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
          this.props.children,
          this.props.showUsageBanner && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            UsageBanner,
            {
              severity: (_a = this.state.status) == null ? void 0 : _a.severity,
              message: (_b = this.state.status) == null ? void 0 : _b.message
            }
          )
        ] });
      }
      throw this.state.error;
    }
    return this.props.children;
  }
};
function ErrorToast2({ error, children }) {
  const addErrorToast = useErrorToast();
  (0, import_react3.useEffect)(() => {
    if (error) {
      addErrorToast([error]);
    }
  }, [error, addErrorToast]);
  if (!error)
    throw error;
  return children;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CopilotErrorBoundary,
  ErrorToast
});
//# sourceMappingURL=error-boundary.js.map