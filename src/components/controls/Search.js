import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFolded: true,
      searchText: "",
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.updateSearchQuery = this.updateSearchQuery.bind(this);
  }

  onButtonClick() {
    this.setState((prevState) => {
      return { isFolded: !prevState.isFolded };
    });
  }

  updateSearchQuery() {
    this.props.actions.updateSearchQuery(this.state.searchText);
    this.props.actions.updateSelected([]);
  }

  render() {
    return (
      <div
        className={
          "search-outer-container" +
          (this.props.narrative ? " narrative-mode " : "")
        }
      >
        <div id="search-bar-icon-container" onClick={this.onButtonClick}>
          <i className="material-icons">search</i>
        </div>
        <div
          className={
            "search-bar-overlay" + (this.state.isFolded ? " folded" : "")
          }
        >
          <div className="search-bar-header">
            <h3 className="search-bar-title">Find incidents</h3>
            <i
              id="close-search-overlay"
              className="material-icons"
              onClick={this.onButtonClick}
            >
              close
            </i>
          </div>
          <div className="search-bar-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                this.updateSearchQuery();
              }}
            >
              <input
                className="search-bar-input"
                onChange={(e) => {
                  this.setState(
                    {
                      searchText: e.target.value,
                    },
                    () => {
                      if (!this.state.searchText) {
                        this.updateSearchQuery();
                      }
                    }
                  );
                }}
                value={this.state.searchText}
                type="text"
                placeholder="Search location & description..."
              />
              <button type="submit" className="search-bar-button">
                Find
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect((state) => state, mapDispatchToProps)(Search);
