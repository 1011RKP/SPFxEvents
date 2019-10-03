import { SPHttpClient } from '@microsoft/sp-http'; 


export interface ICalendarEventsProps {
  description: string;
  siteurl:string;
  spHttpClient:SPHttpClient;
}
