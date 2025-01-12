import React from "react";

import SitesIcon from "../atoms/SitesIcon";
import CoverIcon from "../atoms/CoverIcon";
import InfoIcon from "../atoms/InfoIcon";

function BottomActions(props) {
  function renderToggles() {
    return (
      <>
        <div className="bottom-action-block">
          {props.features.USE_SITES ? (
            <SitesIcon
              isActive={props.sites.enabled}
              onClickHandler={props.sites.toggle}
            />
          ) : null}
        </div>

        <div className="botttom-action-block">
          <InfoIcon
            isActive={props.info.enabled}
            onClickHandler={props.info.toggle}
          />
        </div>

        <div className="botttom-action-block">
          {props.features.USE_COVER ? (
            <CoverIcon onClickHandler={props.cover.toggle} />
          ) : null}
        </div>
      </>
    );
  }

  return <div className="bottom-actions">{renderToggles()}</div>;
}

export default BottomActions;
