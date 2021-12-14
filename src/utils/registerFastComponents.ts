import { 
  allComponents, 
  provideFASTDesignSystem,
  baseLayerLuminance,
  StandardLuminance,
} from '@microsoft/fast-components';

export const registerFastComponents = () => {
  provideFASTDesignSystem().register(allComponents);
  baseLayerLuminance.withDefault(StandardLuminance.LightMode);
};

