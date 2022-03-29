import { 
  allComponents, 
  provideFASTDesignSystem,
  baseLayerLuminance,
  StandardLuminance,
  bodyFont,
} from '@microsoft/fast-components';

export const registerFastComponents = () => {
  provideFASTDesignSystem().register(allComponents);
  baseLayerLuminance.withDefault(StandardLuminance.DarkMode);

  bodyFont.withDefault('Roboto');
};

