import dayjs from "dayjs";
import React from "react";
import { Portal } from "react-portal";
import { connect } from "react-redux";
import hash from "object-hash";

function MapDefsMarkers({ markers, projectPoint, narrative, app, svg }) {
  if (markers === undefined) return null;

  const { selected } = app;

  let seletedEventDate;

  if (selected?.[0]?.date && selected?.[0]?.time) {
    seletedEventDate = dayjs(`${selected[0].date} ${selected[0].time}`);
  }

  function renderMarker(marker) {
    if (!marker.latitude || !marker.longitude) return null;

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
      <svg key={hash(marker)}>
        <g
          className={`location-event ${narrative ? "no-hover" : ""}`}
          transform={`translate(${x}, ${y})`}
        >
          <rect width="8" height="8" {...styles} />
          <text fill="yellow" x={12} y={8}>
            {marker.title}
          </text>
        </g>
      </svg>
    );
  }

  return (
    <Portal node={svg}>
      <svg>
        <g className="event-locations">{markers.map(renderMarker)}</g>
      </svg>
    </Portal>
  );
}

export default MapDefsMarkers;
