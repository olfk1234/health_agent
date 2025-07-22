import * as react_jsx_runtime from 'react/jsx-runtime';
import { CopilotKitError, Severity } from '@copilotkit/shared';

interface UsageBannerProps {
    severity?: Severity;
    message?: string;
    icon?: React.ReactNode;
    onClose?: () => void;
    actions?: {
        primary?: {
            label: string;
            onClick: () => void;
        };
        secondary?: {
            label: string;
            onClick: () => void;
        };
    };
}
declare function UsageBanner({ severity, message, icon, onClose, actions, }: UsageBannerProps): react_jsx_runtime.JSX.Element | null;
declare function renderCopilotKitUsage(error: CopilotKitError, onClose?: () => void): react_jsx_runtime.JSX.Element | null;

export { UsageBanner, renderCopilotKitUsage };
