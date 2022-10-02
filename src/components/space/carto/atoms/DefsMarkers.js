import dayjs from "dayjs";
import React, { Fragment } from "react";
import { connect } from "react-redux";

const MapDefsMarkers = ({ markers, projectPoint, narrative, app }) => {
  if (markers === undefined) return null;

  const { selected } = app;

  let seletedEventDate;

  if (selected?.[0]?.date && selected?.[0]?.time) {
    seletedEventDate = dayjs(`${selected[0].date} ${selected[0].time}`);
  }

  return (
    <>
      {markers.map((marker) => {
        const { x, y } = projectPoint([marker.latitude, marker.longitude]);

        const styles = {};
        if (
          seletedEventDate &&
          seletedEventDate.isAfter(dayjs(marker.enddate, "MM/DD/YYYY"))
        ) {
          styles.stroke = "yellow";
          styles["strokeWidth"] = 2;
          styles["strokeDasharray"] = "2,2";
          styles["strokeLinejoin"] = "round";
        } else {
          styles.fill = "yellow";
          styles["fill-opacity"] = "0.8";
        }

        return (
          <Fragment key={marker.id}>
            <svg>
              <g
                className={`location-event ${narrative ? "no-hover" : ""}`}
                transform={`translate(${x}, ${y})`}
              >
                {/* <circle cx="0" cy="0" r="10" stroke="black" stroke-width="2"  */}
                {/* fill= {marker.enddate>=today?"yellow":"none"} stroke-opacity="0.8" fill-opacity="0.8"/> */}
                <rect width="8" height="8" {...styles} />
                <text fill="yellow" x={12} y={8}>
                  {marker.title}
                </text>
              </g>
            </svg>
          </Fragment>
        );
      })}
    </>
  );
};

function mapStateToProps(state) {
  return {
    app: {
      selected: state.app.selected,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDefsMarkers);
