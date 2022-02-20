import { JsonFormatterHome } from '../components/jsonFormatter';
import { JavaScriptReplHome } from '../components/javaScriptRepl';
import { TextDiffHome } from '../components/textDiff';
import { MarkdownPreview } from '../components/markdownPreview';
import { LoremIpsumGenerator } from '../components/loremIpsumGenerator';

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
  LoremIpsumGenerator = 'lorem-ipsum-gen'
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
    icon: '/icons/javascript-repl.png',
    component: JavaScriptReplHome,
  },
  {
    key: AppKeyEnum.TextDiff,
    title: 'Text diff',
    subtitle: 'Compare text differences.',
    icon: '/icons/text-diff.png',
    component: TextDiffHome,
  },
  {
    key: AppKeyEnum.MarkdownPreview,
    title: 'Markdown preview',
    subtitle: 'Preview markdown.',
    icon: '/icons/markdown-preview.png',
    component: MarkdownPreview,
  },
  {
    key: AppKeyEnum.LoremIpsumGenerator,
    title: 'Lorem Ipsum generator',
    subtitle: 'Generate Lorem ipsum text.',
    icon: '/icons/lorem-ipsum-generate.png',
    component: LoremIpsumGenerator,
  },
];