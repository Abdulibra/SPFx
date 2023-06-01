import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { AceDemoPropertyPane } from './AceDemoPropertyPane';

export interface IAceDemoAdaptiveCardExtensionProps {
  title: string;
}

export interface IAceDemoAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'AceDemo_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'AceDemo_QUICK_VIEW';

export default class AceDemoAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IAceDemoAdaptiveCardExtensionProps,
  IAceDemoAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: AceDemoPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'AceDemo-property-pane'*/
      './AceDemoPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.AceDemoPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
