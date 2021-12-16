import { JsonFormatterHome } from '../components/jsonFormatter';
import { JavaScriptReplHome } from '../components/javaScriptRepl';
import { TextDiffHome } from '../components/textDiff';
import { MarkdownPreview } from '../components/markdownPreview';

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
  TextDiff = 'text-diff',
  MarkdownPreview = 'markdown-preview',
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
  {
    key: AppKeyEnum.TextDiff,
    title: 'Text diff',
    subtitle: 'Compare text differences.',
    icon: '/icons/text-diff.gif',
    component: TextDiffHome,
  },
  {
    key: AppKeyEnum.MarkdownPreview,
    title: 'Markdown preview',
    subtitle: 'Preview markdown.',
    icon: '/icons/markdown-preview.gif',
    component: MarkdownPreview,
  },
];