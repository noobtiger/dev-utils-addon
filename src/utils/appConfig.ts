import { JsonFormatterHome } from '../components/jsonFormatter';
import { JavaScriptReplHome } from '../components/javaScriptRepl';

interface AppConfig {
  key: string;
  title: string;
  subtitle: string;
  icon: string;
  component: any;
}

export const enum AppKeyEnum {
  JsonFormatter = 'json-formatter',
  JavaScriptRepl = 'javascript-repl',
  Sample = 'sample',
}

export const appLinks: AppConfig[] = [
  {
    key: AppKeyEnum.JsonFormatter,
    title: 'JSON Formatter',
    subtitle: 'The JSON Formatter & Validator beautifies and debugs JSON data.',
    icon: '/icons/json-formatter.png',
    component: JsonFormatterHome,
  },
  {
    key: AppKeyEnum.JavaScriptRepl,
    title: 'JavaScript REPL',
    subtitle: 'Simple quick JavaScript REPL.',
    icon: '/icons/javascript-repl.gif',
    component: JavaScriptReplHome,
  },
];