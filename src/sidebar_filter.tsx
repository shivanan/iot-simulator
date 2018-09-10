/*
import * as classNames from 'classnames';
import * as React from 'react';
import { SideBar } from './sidebar';


interface ISideBarFilterProps {
    createClass:string | number ;  
}

interface ISideBarFilterState {
    // not required in state - let it belong to the master iot device state
    // since we need to use it in 2 places - sidebar annd staging 
    //collapse: boolean;
}

export class SideBarFilter extends React.Component<ISideBarFilterProps,ISideBarFilterState> {
    

       var FilteredList = React.createClass({
        filterList: function(event:any){
          var updatedList = this.state.initialItems;
          updatedList = updatedList.filter(function(item:any){
            return item.toLowerCase().search(
              event.target.value.toLowerCase()) !== -1;
          });
          this.setState({items: updatedList});
        },
        getInitialState: function(){
           return {
             initialItems: [
               "T1.BLDG01.FL23",
               "T1.BLDG01.FL23",
               "T2.BLDG01.FL23",
               "T2.BLDG01.FL23",
               "T3.BLDG01.FL23"              
             ],
             items:'any[]'
           }
        },
        componentWillMount: function(){
          this.setState({items: this.state.initialItems})
        },
        render: function(){
          return (
            <div className="filter-list">
              <form>
              <fieldset className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
              </fieldset>
              </form>
            <List items={this.state.items}/>
            </div>
          );
        }
      });
      
      var List = React.createClass({
        render: function(){
          return (
            <ul className="list-group">
            {
              this.props.items.map(function(item:any) {
                return <li className="list-group-item" data-category={item} key={item}>{item}</li>
              })
             }
            </ul>
          )  
        }
      });


 */