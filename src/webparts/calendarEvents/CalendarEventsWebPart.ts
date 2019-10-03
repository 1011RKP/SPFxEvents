import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'CalendarEventsWebPartStrings';
import CalendarEvents from './components/CalendarEvents';
import { ICalendarEventsProps } from './components/ICalendarEventsProps';
//import ModuleLoader from "@microsoft/sp-module-loader";


export interface ICalendarEventsWebPartProps {
  description: string;
  siteurl:string;
  spHttpClient:string;
}

export default class CalendarEventsWebPart extends BaseClientSideWebPart<ICalendarEventsWebPartProps> {

  public render(): void {
    //ModuleLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');
    
    const element: React.ReactElement<ICalendarEventsProps > = React.createElement(
      CalendarEvents,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
