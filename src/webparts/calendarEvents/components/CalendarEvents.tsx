import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './CalendarEvents.module.scss';
import { ICalendarEventsProps } from './ICalendarEventsProps';
import { ICalendarEventState, CalendarInfo } from './ICalendarEventsSate';
import { escape } from '@microsoft/sp-lodash-subset';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { SPComponentLoader } from '@microsoft/sp-loader';
import Moment from 'react-moment';
import 'moment-timezone';



export default class CalendarEvents extends React.Component<ICalendarEventsProps, any> {
  public constructor(props: ICalendarEventsProps, state: ICalendarEventState) {
    super(props);
    this.state = {
      items: []
    };
  }

  public componentDidMount() {
    SPComponentLoader.loadCss("/sites/common/SiteAssets/CustomShell/CSS/bootstrapV3.3.7.css");
    SPComponentLoader.loadCss("/sites/common/SiteAssets/CustomShell/CSS/bootstrap-custom.css");
    SPComponentLoader.loadCss("/sites/common/SiteAssets/CustomShell/CSS/incyte-custom-style.css");
    SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    var date = new Date();
    var filter = "&$filter=(EventDate ge '" +  date.toISOString() + "')&$orderby=EventDate asc&$top=5";
    const restFullURL = this.props.siteurl + "/_api/lists/GetByTitle('Calendar')/items?select=ID,Title,Location,EventDate,EndDate" + filter;
    console.log(restFullURL);    
    this.props.spHttpClient.get(restFullURL, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          console.log(responseJSON);
          this.setState({
            items: responseJSON.value
          });
          console.log(this.state);
        });
      });
  }


  public render(): React.ReactElement<ICalendarEventsProps> {
    return (

      <div className={styles.calendarEvents}>
        <div className="row">
          <h3 className={styles.title}>
            <a target="_blank" href={`${this.props.siteurl}/pages/AllEvents.aspx`}>
              Events
            </a>
          </h3>
        </div>
        {
          this.state.items.map(item =>
            <div className={`${styles.rowSpan} row`}>
              <div className="col-sm-2">
                <b className={`${styles.calendarIcon} fa-stack fa-2x`}>
                  <i className="fa fa-calendar-o fa-stack-2x"></i>
                  <i className={`${styles.month} fa-stack-1x calendar-text`}>
                    <Moment format="MMM">{item.EventDate}</Moment>
                  </i>
                  <i className={`${styles.day} fa-stack-1x calendar-text `}>
                    <Moment format="DD">{item.EventDate}</Moment>
                  </i>
                </b>
              </div>
              <div className="col-sm-10">
                <div className="row">
                  <p className={styles.eventsDate}>
                    <Moment format="MMMM Do YYYY">{item.EventDate}</Moment>, <Moment format="h A">{item.EventDate}</Moment> to <Moment format="h A">{item.EndDate}</Moment>
                  </p>
                </div>
                <div className="row">
                  <h4 className={styles.eventsSubTitle}>
                    {item.Title}  &nbsp;
                    <a target="_blank" href={"/sites/DrugDevelopment/LPD/pages/Events.aspx?ID='".concat(item.ID,"'")}>
                      | Enroll
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          )
        }
        <div className="row">
          <div className="col-sm-offset-2 col-sm-10">
            <h3 className={styles.moreEvents}>
              <a target="_blank" href="/sites/DrugDevelopment/LPD/pages/AllEvents.aspx">
                More Events ...
            </a>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}



// <div className="ms-Grid">
      //   <div className="ms-Grid-row">
      //     <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
      //       <span className="ms-font-su ms-fontColor-themePrimary">MS Grid</span>
      //     </div>
      //     <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
      //       <span className="ms-font-su ms-fontColor-themePrimary">MS Grid</span>
      //     </div>
      //   </div>
      // </div>
      // <div className={ styles.calendarEvents }>           
      //   <div className={ styles.container }>
      //     <div className={ styles.row }>
      //       <div className={ styles.column }>            
      //         {
      //           this.state.items.map(item =>
      //             <div className={ styles.column }>
      //             <div className="ms-Grid" dir="ltr">
      //               <div className="ms-Grid-row">
      //                 <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">A</div>
      //                 <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">B</div>
      //               </div>
      //             </div>
      //               <p className="fa-stack fa-2x">
      //                   <i className="fa fa-calendar-o fa-stack-2x"></i>
      //                     <i className={`${styles.month} fa-stack-1x calendar-text`}>
      //                     <Moment format="MMMM">{item.EventDate}</Moment>                      
      //                     </i>                        
      //                     <i className={`${styles.day} fa-stack-1x calendar-text `}>
      //                     <Moment format="DD">{item.EventDate}</Moment>
      //                     </i>
      //               </p>
      //               <span> {item.Title}
      //               </span>                    
      //               <span> {item.Title}</span>                    
      //           </div>
      //           )
      //         }            
      //       </div>            
      //     </div>
      //   </div>
      // </div>